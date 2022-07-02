import { HIndex } from './../models/profile/Profile';
import { CoAuthor } from './../models/articles/Article';
import { LineColumnsMixedChartModel } from './../models/objectserieschartmodel/LineColumnsMixedChartModel';
import { FullProfile } from '../models/profile';
import { RowModel } from '../models/viewmodels';
import { Article, ArticlesModel, PieChartModel } from '../models';
import { ViewName } from '../models/simplecardmodel/SimpleCardModel';
import { Series } from '../models/objectserieschartmodel/ObjectSeriesChartModel';
import { SemanticScholarSource } from '../datasources';

type CoAuthorHIndices = {
    coAuthorId: string;
    hIndex: number;
};

export class ProfileRepresentation {
    private _fullProfile: FullProfile;
    private _rowModels: Array<RowModel>;
    constructor(_fullProfile: FullProfile) {
        this._fullProfile = _fullProfile;
        this._rowModels = new Array<RowModel>();
    }
    renderProfile(): void {
        this._rowModels = new Array<RowModel>();
        this.rowModels.push(new RowModel(8));
        const pby: PieChartModel = this.createCitationsCard();

        this.rowModels[0].simpleCardModels.push(pby);

        this.rowModels.push(new RowModel(8));
        const lcmc: LineColumnsMixedChartModel = this.createLineColumnsMixedChartCard();
        this.rowModels[1].simpleCardModels.push(lcmc);

        this.rowModels.push(new RowModel(10));
        const art: ArticlesModel = this.createArticlesCard();
        this.rowModels[2].simpleCardModels.push(art);
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
    private createCitationsCard(): PieChartModel {
        const series: Array<Series> = new Array<Series>();
        series.push(
            new Series('citations by others', [
                this._fullProfile.basicProfile.totalCitations - this._fullProfile.selfCitations,
            ]),
        );
        series.push(new Series('self-citations', [this._fullProfile.selfCitations]));
        series.push(new Series('indirect self-citations', [this._fullProfile.indirectSelfCitations]));

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
        const coAuthorNames: string[] = ['Author1', 'Author2', 'Author3', 'Author4', 'Author5'];
        series.push(new Series('Publications', this.calculateCoAuthorPublications(this._fullProfile), 'column'));
        series.push(new Series('h-index', hIndices, 'line'));
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
        const topFive: CoAuthorHIndices[] = sorted.slice(0, 5);
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
}
