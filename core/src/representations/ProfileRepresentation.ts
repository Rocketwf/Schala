import { FullProfile, Citations } from '../models/profile';
import { RowModel } from '../models/viewmodels';
import { ArticlesModel, PieChartModel, Series, ObjectSeriesChartModel, StackedColumnsChartModel, LineColumnsMixedChartModel } from '../models';
import { ViewName } from '../models/simplecardmodel/SimpleCardModel';
import { ExpertiseModel } from '../models/simplecardmodel/ExpertiseModel';

export class ProfileRepresentation {
    private _fullProfile: FullProfile;
    private _rowModels: Array<RowModel>;
    constructor(_fullProfile: FullProfile) {
        this._fullProfile = _fullProfile;
        this._rowModels = new Array<RowModel>();
    }
    renderProfile(): void {
        this.createFirstRow();
        this.createSecondRow();
        this.createThirdRow();
        this.createFourthRow();
    }

    public get fullProfile(): FullProfile {
        return this._fullProfile;
    }
    public set fullProfile(fullProfile: FullProfile) {
        this._fullProfile = fullProfile;
    }
    public get rowModels(): RowModel[] {
        return this._rowModels;
    }

    private createPublicationsByYearCard(): ObjectSeriesChartModel {
        return null;
    }

    private createPublicationsByVenueCard(): ObjectSeriesChartModel {
        return null;
    }

    private createMostCitedScholarsCard(): ObjectSeriesChartModel {
        return null;
    }

    private createMostFrequentCoAuthorsCard(): ObjectSeriesChartModel {
        return null;
    }

    private createCoAuthorsWithHighestHIndexCard(): ObjectSeriesChartModel {
        return null;
    }

    private createExpertiseCard(): ExpertiseModel {
        return null;
    }

    private createCitationsCard(): PieChartModel {
        const series: Array<Series> = new Array<Series>();
        series.push(
            new Series('citations by others', [
                this._fullProfile.basicProfile.totalCitations -
                    this._fullProfile.getSelfCitationsCount() -
                    this._fullProfile.getIndirectSelfCitationsCount(),
            ]),
        );
        series.push(new Series('self-citations', [this._fullProfile.getSelfCitationsCount()]));
        series.push(new Series('indirect self-citations', [this._fullProfile.getIndirectSelfCitationsCount()]));

        return new PieChartModel('Citations', '', ViewName.PieChartCard, 2, series);
    }

    private createArticlesCard(): ArticlesModel {
        const articlesModel: ArticlesModel = new ArticlesModel(
            this.fullProfile.articles,
            'All Articles',
            '',
            ViewName.ArticlesCard,
            10,
        );
        return articlesModel;
    }

    /**
     * Creates line columns mixed chart card.
     * @returns - LineColumnsMixedChartModel
     */
    private createLineColumnsMixedChartCard(): LineColumnsMixedChartModel {
        const series: Array<Series> = new Array<Series>();
        const coAuthorHIndices: { coAuthorId: string; hIndex: number }[] = this.calculateCoAuthorHIndex(
            this._fullProfile,
        );
        const coAuthorIds: string[] = coAuthorHIndices.map((coAuthorHindex: { coAuthorId: string; hIndex: number }) => {
            return coAuthorHindex.coAuthorId;
        });
        const hIndices: number[] = coAuthorHIndices.map((coAuthorHindex: { coAuthorId: string; hIndex: number }) => {
            return coAuthorHindex.hIndex;
        });
        const publications: number[] = this.calculateCoAuthorPublications(this._fullProfile);
        const coAuthorNames: string[] = ['Author1', 'Author2', 'Author3', 'Author4', 'Author5'];
        for (let i: number = 0; i < coAuthorNames.length; i++) {
            series.push(new Series(coAuthorNames[i], [hIndices[i]], 'line'));
            series.push(new Series(coAuthorNames[i], [publications[i]], 'column'));
        }
        //const labels: Array<string> = [];
        return new LineColumnsMixedChartModel(
            'Co-authors with highest h-index',
            '',
            ViewName.LineColumnsMixedChartCard,
            5,
            series,
            'publications1',
            'h-index1',
            coAuthorNames,
        );
    }

    /**
     * Calculates number of publications of the co-authors with highest h-index.
     * @returns - number[] containing number of publications of the co-authors with highest h-index.
     */
    private calculateCoAuthorPublications(fullProfile: FullProfile): number[] {
        return [3, 2, 1, 5, 4];
    }

    /**
     * Calculates h-indices of the co-authors.
     * @returns - CoAuthorHIndices[] containing co-authors ids with their h-index.
     */
    private calculateCoAuthorHIndex(fullProfile: FullProfile): CoAuthorHIndices[] {
        const coAuthors: Array<Array<CoAuthor>> = fullProfile.articles.map((article: Article) => {
            return article.coAuthors;
        });
        const merged: Array<CoAuthor> = coAuthors.reduce((prev: CoAuthor[], cur: CoAuthor[]) => {
            return prev.concat(cur);
        }, []);
        const coAuthorIds: Array<string> = merged.map((coAuthor: CoAuthor) => {
            return coAuthor.id;
        });
        const filtered: Array<string> = this.removeDuplicateIds(coAuthorIds);
        // const promises: Promise<CoAuthorHIndices[]> = Promise.all(
        //     filtered.map(async (coAuthorId: string) => {
        //         return {
        //             coAuthorId: coAuthorId,
        //             hIndex: await SemanticScholarSource.getInstance().fetchHIndex(coAuthorId),
        //         };
        //     }),
        // );
        // let coAuthorHIndices: { coAuthorId: string; hIndex: number }[];
        // promises.then((data: { coAuthorId: string; hIndex: number }[]) => (coAuthorHIndices = data));
        // const sorted: { coAuthorId: string; hIndex: number }[] = coAuthorHIndices.sort(
        //     (n1: { coAuthorId: string; hIndex: number }, n2: { coAuthorId: string; hIndex: number }) => {
        //         if (n1.hIndex > n2.hIndex) {
        //             return 1;
        //         }

        //         if (n1.hIndex < n2.hIndex) {
        //             return -1;
        //         }

        //         return 0;
        //     },
        // );
        //const topFive: CoAuthorHIndices[] = sorted.slice(0, 5);
        // return topFive;
        return [
            { coAuthorId: '1111111', hIndex: 5 },
            { coAuthorId: '2222222', hIndex: 3 },
            { coAuthorId: '3333333', hIndex: 15 },
            { coAuthorId: '4444444', hIndex: 2 },
            { coAuthorId: '5555555', hIndex: 20 },
        ];
    }

    /**
     * Removes duplicates from the given array
     * @param coAuthorIds string[] containing co-author ids
     * @returns string[] containing co-author ids without duplicates
     */
    private removeDuplicateIds(coAuthorIds: Array<string>) {
        const lookup: { [coAuthorId: string]: boolean } = {};
        const filtered: string[] = [];
        for (let i: number = 0; i < coAuthorIds.length; i++) {
            const v: string = coAuthorIds[i];
            if (!lookup[v]) {
                filtered.push(v);
                lookup[v] = true;
            }
        }
        return filtered;
    }
    //This method creates the first row which renders the following:
    //Publications by year
    //Publications by venue
    //Citations by year
    private createFirstRow(): void {
        this.rowModels.push(new RowModel(10));
        const pby: PieChartModel = this.createCitationsCard();
        const cby: ObjectSeriesChartModel = this.createCitationByYearCard();

        this.rowModels[0].simpleCardModels.push(cby);
        this.rowModels[0].simpleCardModels.push(pby);
    }
    //This method creates the second row which renders the following:
    //Most cited scholars
    //Citation breakdown
    //Most frquent co-authors
    private createSecondRow(): void {
        return;
    }
    //This method creates the third row which renders the following:
    //Co-Authors with highest h-index
    //Expertise
    private createThirdRow(): void {
        return;
    }
    //This method creates the fourth row which renders the articles
    private createFourthRow(): void {
        this.rowModels.push(new RowModel(10));
        const art: ArticlesModel = this.createArticlesCard();
        this.rowModels[1].simpleCardModels.push(art);
    }
    private createCitationByYearCard(): ObjectSeriesChartModel {
        const series: Series[] = new Array<Series>();
        this._fullProfile.citations.forEach((citations: Citations, year: number) => {
            series.push(
                new Series(year + '', [
                    citations.indirectSelfCitationsCount,
                    citations.selfCitationsCount,
                    citations.totalCitationsCount - citations.selfCitationsCount - citations.indirectSelfCitationsCount,
                ]),
            );
        });
        const objectSeriesChartModel: ObjectSeriesChartModel = new StackedColumnsChartModel(
            'Citation by year',
            '',
            ViewName.StackedColumnsChartCard,
            4,
            series,
            'Years',
            'Number of citations',
            ['indirect self-citation', 'self-citations', 'cited by others'],
        );

        return objectSeriesChartModel;
    }
}
