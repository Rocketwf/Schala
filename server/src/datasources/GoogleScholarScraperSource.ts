import { DataSource } from './DataSource';
import { APIPaper, APIAuthor, APIBasicAuthor } from '../models/API';
import cheerio from 'cheerio';
import axios from 'axios';
import { AxiosResponse } from 'axios';
type TagElement = cheerio.TagElement;
export class GoogleScholarScraperSource implements DataSource {
    private static instance: GoogleScholarScraperSource;
    private _cache: Map<string, APIBasicAuthor[]> = new Map<string, APIBasicAuthor[]>();

    constructor() {
        this._cache = new Map<string, APIBasicAuthor[]>();
    }

    public async fetchSearchResults(query: string): Promise<APIBasicAuthor[]> {
        if (this._cache.has(query)) return this._cache.get(query);
        if (!this._cache.has(query)) this._cache.set(query, new Array<APIBasicAuthor>());

        const searchAuthors: AxiosResponse<string> = await axios.get<string>(
            'https://scholar.google.com/citations?view_op=search_authors&mauthors=' + query,
        );
        const $: cheerio.Root = cheerio.load(searchAuthors.data);
        $('.gs_ai.gs_scl.gs_ai_chpr').each((index: number, element: TagElement) => {
            const imgChild: TagElement = (element.children as TagElement[]).find(
                (child: TagElement) => child.attribs['class'] === 'gs_ai_pho',
            );
            const imgSpan: TagElement = imgChild.firstChild as TagElement;
            const name: string = (imgSpan.firstChild as TagElement).attribs['alt'];
            let imgSrc: string = (imgSpan.firstChild as TagElement).attribs['src'];
            if (imgSrc.startsWith('http')) {
                const fixedSizeImage: string = imgSrc.replace('small_photo', 'view_photo');
                imgSrc = fixedSizeImage;
            } else {
                const googlePrefix: string = 'https://scholar.google.com';
                imgSrc = googlePrefix + imgSrc.replace('56', '128');
            }

            const infoChild: TagElement = (element.children as TagElement[]).find(
                (child: TagElement) => child.attribs['class'] === 'gs_ai_t',
            );
            const affiliation: string = $(infoChild).find('.gs_ai_aff').text();
            if (!imgSrc) imgSrc = '';
            const googleAuthorId: string = imgSrc.split('&user=')[1]?.split('&citpi')[0];

            this._cache.get(query).push({
                name: name,
                affiliations: [affiliation],
                aliases: [''],
                authorId: googleAuthorId,
                citationCount: '',
                paperCount: '',
                profilePicture: imgSrc,
            });
        });
        return this._cache.get(query);
    }
    public async fetchAuthor(authorName: string): Promise<APIAuthor> {
        const matchList: APIBasicAuthor[] = await this.fetchSearchResults(authorName);
        const bestDistName: { name: string; dist: number } = { name: '', dist: Number.MAX_SAFE_INTEGER };
        for (const apiBp of Array.from(matchList.values())) {
            const currentDist: number = this.levenshteinHelper(authorName, apiBp.name);
            if (currentDist < bestDistName.dist) {
                bestDistName.name = apiBp.name;
                bestDistName.dist = currentDist;
            }
        }
        const bestDistAPIBasicAuthor: APIBasicAuthor = this._cache
            .get(authorName)
            .find((apiBp: APIBasicAuthor) => apiBp.name === bestDistName.name);
        let apiAuthor: APIAuthor;
        if (bestDistAPIBasicAuthor) {
            apiAuthor = {
                affiliations: bestDistAPIBasicAuthor.affiliations,
                aliases: bestDistAPIBasicAuthor.aliases,
                authorId: bestDistAPIBasicAuthor.authorId,
                citationCount: +bestDistAPIBasicAuthor.citationCount,
                hIndex: null,
                homepage: null,
                name: bestDistAPIBasicAuthor.name,
                paperCount: +bestDistAPIBasicAuthor.paperCount,
                papers: null,
                url: null,
                profilePicture: bestDistAPIBasicAuthor.profilePicture,
            };
        } else {
            apiAuthor = {
                affiliations: null,
                aliases: null,
                authorId: null,
                citationCount: null,
                hIndex: null,
                homepage: null,
                name: null,
                paperCount: null,
                papers: null,
                url: null,
                profilePicture: null,
            };
        }
        return apiAuthor;
    }
    public async fetchPapers(paperIds: string[]): Promise<APIPaper[]> {
        paperIds;
        return;
    }
    private levenshteinHelper(a: string, b: string): number {
        if (a.length === 0) return b.length;
        if (b.length === 0) return a.length;

        const matrix: number[][] = [];

        // increment along the first column of each row
        let i: number;
        for (i = 0; i <= b.length; i++) {
            matrix[i] = [i];
        }

        // increment each column in the first row
        let j: number;
        for (j = 0; j <= a.length; j++) {
            matrix[0][j] = j;
        }

        // Fill in the rest of the matrix
        for (i = 1; i <= b.length; i++) {
            for (j = 1; j <= a.length; j++) {
                if (b.charAt(i - 1) == a.charAt(j - 1)) {
                    matrix[i][j] = matrix[i - 1][j - 1];
                } else {
                    matrix[i][j] = Math.min(
                        matrix[i - 1][j - 1] + 1, // substitution
                        Math.min(
                            matrix[i][j - 1] + 1, // insertion
                            matrix[i - 1][j] + 1,
                        ),
                    ); // deletion
                }
            }
        }

        return matrix[b.length][a.length];
    }
}
