import { ArticlesModel } from './../models/articlesmodel/ArticlesModel';
import { FullProfile } from '../models/profile';
import { RowModel } from '../models/viewmodels';
import {
    BasicBarsChartModel,
    DistributedColumnsChartModel,
    LineColumnsMixedChartModel,
    PieChartModel,
    Series,
    StackedColumnsChartModel,
    Field,
    ViewName,
} from '../models';
import { Expertise, ExpertiseModel } from '../models/simplecardmodel/ExpertiseModel';
import { PublicationByVenue, PublicationByYear } from '../models/profile/Profile';
import { ArticlesFilterButton, RangeButton, ShowingButton } from '../models/inputs/PopupEditButton';
import { Filter } from '../filters';
import { FromFilter, ShowingFilter, ToFilter } from '../filters/objectserieschartfilters/ObjectSeriesFilter';
import {
    CoauthorsFilter,
    KeywordsFilter,
    NumberOfCitationsFilter,
    WordsInArticleTitleFilter,
} from '../filters/articlesfilters/ArticlesFilter';

const PAGE_WIDTH: number = 12;
type cardData = {
    TITLE: string;
    ROW: number;
    COLS: number;
    DEFAULT_NUM_OF_ENTRIES?: number;
};
type cards = {
    PUBLICATIONS_BY_YEAR: {
        CARD_DATA: cardData;
    };
    PUBLICATIONS_BY_VENUE: {
        CARD_DATA: cardData;
    };
    CITATIONS_BY_YEAR: {
        CARD_DATA: cardData;
    };
    MOST_CITED_SCHOLARS: {
        CARD_DATA: cardData;
    };
    CITATIONS: {
        CARD_DATA: cardData;
    };
    MOST_FREQUENT_CO_AUTHORS: {
        CARD_DATA: cardData;
    };
    CO_AUTHORS_WITH_HIGHEST_HINDEX: {
        CARD_DATA: cardData;
    };
    EXPERTISE: {
        CARD_DATA: cardData;
    };
    ARTICLES: {
        CARD_DATA: cardData;
    };
};
const CARDS: cards = {
    PUBLICATIONS_BY_YEAR: {
        CARD_DATA: {
            TITLE: 'Publications by year',
            ROW: 1,
            COLS: 4,
            DEFAULT_NUM_OF_ENTRIES: 10,
        },
    },
    PUBLICATIONS_BY_VENUE: {
        CARD_DATA: {
            TITLE: 'Publications by venue',
            ROW: 1,
            COLS: 4,
            DEFAULT_NUM_OF_ENTRIES: 3,
        },
    },
    CITATIONS_BY_YEAR: {
        CARD_DATA: {
            TITLE: 'Citations by year',
            ROW: 1,
            COLS: 4,
            DEFAULT_NUM_OF_ENTRIES: 10,
        },
    },
    MOST_CITED_SCHOLARS: {
        CARD_DATA: {
            TITLE: 'Most cited scholars',
            ROW: 2,
            COLS: 5,
            DEFAULT_NUM_OF_ENTRIES: 10,
        },
    },
    CITATIONS: {
        CARD_DATA: {
            TITLE: 'Citations',
            ROW: 2,
            COLS: 2,
        },
    },
    MOST_FREQUENT_CO_AUTHORS: {
        CARD_DATA: {
            TITLE: 'Most frequent co-authors',
            ROW: 2,
            COLS: 5,
            DEFAULT_NUM_OF_ENTRIES: 10,
        },
    },
    CO_AUTHORS_WITH_HIGHEST_HINDEX: {
        CARD_DATA: {
            TITLE: 'Co-authors with highest h-index',
            ROW: 3,
            COLS: 6,
            DEFAULT_NUM_OF_ENTRIES: 10,
        },
    },
    EXPERTISE: {
        CARD_DATA: {
            TITLE: 'Expertise',
            ROW: 3,
            COLS: 6,
            DEFAULT_NUM_OF_ENTRIES: 50,
        },
    },
    ARTICLES: {
        CARD_DATA: {
            TITLE: 'All Articles',
            ROW: 4,
            COLS: 12,
            DEFAULT_NUM_OF_ENTRIES: 15,
        },
    },
};

export class ProfileRepresentation {
    private _fullProfile: FullProfile;
    private _rowModels: Array<RowModel>;
    constructor(_fullProfile: FullProfile) {
        this._fullProfile = _fullProfile;
        this._rowModels = new Array<RowModel>();
    }
    renderProfile(): void {
        this._rowModels = [];
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

    private createPublicationsByYearCard(): DistributedColumnsChartModel {
        const series: Array<Series> = new Array<Series>();
        for (const pby of this._fullProfile.publicationsByYear) {
            series.push(new Series(pby.year + '', [pby.publicationsCount]));
        }
        const pby: DistributedColumnsChartModel = new DistributedColumnsChartModel(
            CARDS.PUBLICATIONS_BY_YEAR.CARD_DATA.TITLE,
            '',
            ViewName.DistributedColumnsChartCard,
            CARDS.PUBLICATIONS_BY_YEAR.CARD_DATA.COLS,
            series,
            'Years',
            'Number of publications',
            this._fullProfile.publicationsByYear.map((pby: PublicationByYear) => pby.year + ''),
        );

        const lastValue: number = +pby.series[pby.series.length - 1]?.name;
        const fromFilter: Filter<number, DistributedColumnsChartModel> = new FromFilter(
            lastValue - CARDS.CITATIONS_BY_YEAR.CARD_DATA.DEFAULT_NUM_OF_ENTRIES,
        );
        const fromNumberField: Field<number, DistributedColumnsChartModel> = new Field<
            number,
            DistributedColumnsChartModel
        >('from', lastValue - CARDS.PUBLICATIONS_BY_YEAR.CARD_DATA.DEFAULT_NUM_OF_ENTRIES, fromFilter, [pby]);

        const toFilter: Filter<number, DistributedColumnsChartModel> = new ToFilter(lastValue);
        const toNumberField: Field<number, DistributedColumnsChartModel> = new Field<
            number,
            DistributedColumnsChartModel
        >('to', lastValue, toFilter, [pby]);

        const rangePopupEdit: RangeButton = new RangeButton('range', [fromNumberField, toNumberField]);
        pby.popupButtons = [rangePopupEdit];
        pby.filters = [fromFilter, toFilter];
        pby.applyAllFilters();
        return pby;
    }

    private createPublicationsByVenueCard(): DistributedColumnsChartModel {
        const series: Array<Series> = new Array<Series>();
        for (const pbv of this._fullProfile.publicationsByVenue) {
            series.push(new Series(pbv.venue, [pbv.publicationCount]));
        }

        const pbv: DistributedColumnsChartModel = new DistributedColumnsChartModel(
            CARDS.PUBLICATIONS_BY_YEAR.CARD_DATA.TITLE,
            '',
            ViewName.DistributedColumnsChartCard,
            CARDS.PUBLICATIONS_BY_YEAR.CARD_DATA.COLS,
            series,
            'Venues',
            'Number of publications',
            this._fullProfile.publicationsByVenue.map((pbv: PublicationByVenue) => pbv.venue),
        );

        const showingFilter: Filter<number, DistributedColumnsChartModel> = new ShowingFilter(
            CARDS.PUBLICATIONS_BY_VENUE.CARD_DATA.DEFAULT_NUM_OF_ENTRIES,
        );
        const showingNumberField: Field<number, DistributedColumnsChartModel> = new Field<
            number,
            DistributedColumnsChartModel
        >('showing', CARDS.PUBLICATIONS_BY_VENUE.CARD_DATA.DEFAULT_NUM_OF_ENTRIES, showingFilter, [pbv]);

        const showingPopupEdit: ShowingButton = new ShowingButton('showing', [showingNumberField]);
        pbv.popupButtons = [showingPopupEdit];
        pbv.filters = [showingFilter];
        showingPopupEdit.handleAll();

        return pbv;
    }

    private createMostCitedScholarsCard(): BasicBarsChartModel {
        const series: Array<Series> = new Array<Series>();
        for (const cs of this._fullProfile.citedScholars) {
            series.push(new Series(cs.name, [cs.citationsCount]));
        }
        const mcs: BasicBarsChartModel = new BasicBarsChartModel(
            CARDS.MOST_CITED_SCHOLARS.CARD_DATA.TITLE,
            '',
            ViewName.BasicBarsChartCard,
            CARDS.MOST_CITED_SCHOLARS.CARD_DATA.COLS,
            series,
            'Number of citations',
            '',
            [],
        );

        const showingFilter: Filter<number, BasicBarsChartModel> = new ShowingFilter(
            CARDS.MOST_CITED_SCHOLARS.CARD_DATA.DEFAULT_NUM_OF_ENTRIES,
        );
        const showingNumberField: Field<number, BasicBarsChartModel> = new Field<number, BasicBarsChartModel>(
            'showing',
            CARDS.MOST_CITED_SCHOLARS.CARD_DATA.DEFAULT_NUM_OF_ENTRIES,
            showingFilter,
            [mcs],
        );

        const showingPopupEdit: ShowingButton = new ShowingButton('showing', [showingNumberField]);
        mcs.popupButtons = [showingPopupEdit];
        mcs.filters = [showingFilter];
        showingPopupEdit.handleAll();

        return mcs;
    }

    private createMostFrequentCoAuthorsCard(): BasicBarsChartModel {
        let series: Array<Series> = new Array<Series>();
        for (const author of this._fullProfile.authors) {
            series.push(new Series(author.name, [author.jointPublicationCount]));
        }
        series = series.sort(this.sortSeriesByData);
        const mfa: BasicBarsChartModel = new BasicBarsChartModel(
            CARDS.MOST_FREQUENT_CO_AUTHORS.CARD_DATA.TITLE,
            '',
            ViewName.BasicBarsChartCard,
            CARDS.MOST_FREQUENT_CO_AUTHORS.CARD_DATA.COLS,
            series,
            'Number of co-authored publication',
            '',
            [],
        );

        const showingFilter: Filter<number, BasicBarsChartModel> = new ShowingFilter(
            CARDS.MOST_FREQUENT_CO_AUTHORS.CARD_DATA.DEFAULT_NUM_OF_ENTRIES,
        );
        const showingNumberField: Field<number, BasicBarsChartModel> = new Field<number, BasicBarsChartModel>(
            'showing',
            CARDS.MOST_FREQUENT_CO_AUTHORS.CARD_DATA.DEFAULT_NUM_OF_ENTRIES,
            showingFilter,
            [mfa],
        );

        const showingPopupEdit: ShowingButton = new ShowingButton('showing', [showingNumberField]);
        mfa.popupButtons = [showingPopupEdit];
        mfa.filters = [showingFilter];
        showingPopupEdit.handleAll();

        return mfa;
    }

    private createCitationsByYearCard(): StackedColumnsChartModel {
        let series: Array<Series> = new Array<Series>();
        for (const cby of this._fullProfile.citationsByYear) {
            const isc: number = cby.indirectSelfCitationsCount;
            const sc: number = cby.selfCitationCount;
            const cbo: number = cby.totalCitationsCount - isc - sc;
            series.push(new Series(cby.year + '', [isc, sc, cbo]));
        }
        series = series.sort(this.sortSeriesByName);
        const cby: StackedColumnsChartModel = new StackedColumnsChartModel(
            CARDS.CITATIONS_BY_YEAR.CARD_DATA.TITLE,
            '',
            ViewName.StackedColumnsChartCard,
            CARDS.CITATIONS_BY_YEAR.CARD_DATA.COLS,
            series,
            'Years',
            'Number of citations',
            ['indirect self-citations', 'self-citations', 'cited by others'],
        );

        const lastValue: number = +cby.series[cby.series.length - 1]?.name;
        const fromFilter: Filter<number, StackedColumnsChartModel> = new FromFilter(
            lastValue - CARDS.CITATIONS_BY_YEAR.CARD_DATA.COLS,
        );
        const fromNumberField: Field<number, StackedColumnsChartModel> = new Field<number, StackedColumnsChartModel>(
            'from',
            lastValue - CARDS.CITATIONS_BY_YEAR.CARD_DATA.COLS,
            fromFilter,
            [cby],
        );

        const toFilter: Filter<number, StackedColumnsChartModel> = new ToFilter(lastValue);
        const toNumberField: Field<number, StackedColumnsChartModel> = new Field<number, StackedColumnsChartModel>(
            'to',
            lastValue,
            toFilter,
            [cby],
        );

        const rangePopupEdit: RangeButton = new RangeButton('range', [fromNumberField, toNumberField]);
        cby.popupButtons = [rangePopupEdit];
        cby.filters = [fromFilter, toFilter];
        cby.applyAllFilters();

        return cby;
    }

    private createExpertiseCard(): ExpertiseModel {
        const expertise: Expertise = new Expertise(this._fullProfile.basicProfile.name, this._fullProfile.expertise);
        return new ExpertiseModel(
            [expertise],
            CARDS.EXPERTISE.CARD_DATA.TITLE,
            '',
            ViewName.ExpertiseCard,
            CARDS.EXPERTISE.CARD_DATA.COLS,
        );
    }

    private createArticlesCard(): ArticlesModel {
        const articlesModel: ArticlesModel = new ArticlesModel(
            this.fullProfile.articles,
            CARDS.ARTICLES.CARD_DATA.TITLE,
            '',
            ViewName.ArticlesCard,
            CARDS.ARTICLES.CARD_DATA.COLS,
        );

        const coAuthorsFilter: Filter<string, ArticlesModel> = new CoauthorsFilter('');
        const coAuthorTextField: Field<string, ArticlesModel> = new Field<string, ArticlesModel>(
            'Co-authors seperated by ,',
            '',
            coAuthorsFilter,
            [articlesModel],
        );

        const keywordsFilter: Filter<string, ArticlesModel> = new KeywordsFilter('');
        const keywordsTextField: Field<string, ArticlesModel> = new Field<string, ArticlesModel>(
            'Keywords seperated by ,',
            '',
            keywordsFilter,
            [articlesModel],
        );

        const wordsInTitleFilter: Filter<string, ArticlesModel> = new WordsInArticleTitleFilter('');
        const wordsInTitleField: Field<string, ArticlesModel> = new Field<string, ArticlesModel>(
            'Words in the title',
            '',
            wordsInTitleFilter,
            [articlesModel],
        );

        const minCitationsFilter: Filter<string, ArticlesModel> = new NumberOfCitationsFilter('0');
        const minCitationsField: Field<string, ArticlesModel> = new Field<string, ArticlesModel>(
            'With a minimum number of citations',
            '0',
            minCitationsFilter,
            [articlesModel],
        );

        const articlesFilterPopup: ArticlesFilterButton = new ArticlesFilterButton('', [
            coAuthorTextField,
            keywordsTextField,
            wordsInTitleField,
            minCitationsField,
        ]);

        articlesModel.popupButtons = [articlesFilterPopup];
        articlesModel.filters = [coAuthorsFilter, keywordsFilter, wordsInTitleFilter, minCitationsFilter];

        return articlesModel;
    }

    private createCitationsCard(): PieChartModel {
        const series: Array<Series> = new Array<Series>();
        series.push(
            new Series('citations by others', [
                this._fullProfile.basicProfile.totalCitations -
                    this._fullProfile.selfCitationsCount -
                    this._fullProfile.indirectSelfCitationsCount,
            ]),
        );
        series.push(new Series('self-citations', [this._fullProfile.selfCitationsCount]));
        series.push(new Series('indirect self-citations', [this._fullProfile.indirectSelfCitationsCount]));

        return new PieChartModel('Citations', '', ViewName.PieChartCard, 2, series);
    }

    private createCoAuthorsWithHighestHIndexCard(): LineColumnsMixedChartModel {
        const series: Array<Series> = new Array<Series>();

        for (const author of this._fullProfile.authors) {
            series.push(new Series(author.name, [author.hIndex], 'line'));
            series.push(new Series(author.name, [author.jointPublicationCount], 'column'));
        }

        const awhhi: LineColumnsMixedChartModel = new LineColumnsMixedChartModel(
            CARDS.CO_AUTHORS_WITH_HIGHEST_HINDEX.CARD_DATA.TITLE,
            '',
            ViewName.LineColumnsMixedChartCard,
            CARDS.CO_AUTHORS_WITH_HIGHEST_HINDEX.CARD_DATA.COLS,
            series,
            'h-index',
            'Publications',
            ['Publications', 'h-index'],
        );

        const showingFilter: Filter<number, LineColumnsMixedChartModel> = new ShowingFilter(
            CARDS.CO_AUTHORS_WITH_HIGHEST_HINDEX.CARD_DATA.DEFAULT_NUM_OF_ENTRIES,
        );
        const showingNumberField: Field<number, LineColumnsMixedChartModel> = new Field<
            number,
            LineColumnsMixedChartModel
        >('showing', CARDS.CO_AUTHORS_WITH_HIGHEST_HINDEX.CARD_DATA.DEFAULT_NUM_OF_ENTRIES, showingFilter, [awhhi]);

        const showingPopupEdit: ShowingButton = new ShowingButton('showing', [showingNumberField]);
        awhhi.popupButtons = [showingPopupEdit];
        awhhi.filters = [showingFilter];
        showingPopupEdit.handleAll();

        return awhhi;
    }

    //This method creates the first row which renders the following:
    //Publications by year
    //Publications by venue
    //Citations by year
    private createFirstRow(): void {
        const rowModel: RowModel = new RowModel(10);
        rowModel.simpleCardModels.push(this.createPublicationsByYearCard());
        rowModel.simpleCardModels.push(this.createPublicationsByVenueCard());
        rowModel.simpleCardModels.push(this.createCitationsByYearCard());
        this.rowModels.push(rowModel);
    }
    //This method creates the second row which renders the following:
    //Most cited scholars
    //Citation breakdown
    //Most frequent co-authors
    private createSecondRow(): void {
        const rowModel: RowModel = new RowModel(10);
        rowModel.simpleCardModels.push(this.createMostCitedScholarsCard());
        rowModel.simpleCardModels.push(this.createCitationsCard());
        rowModel.simpleCardModels.push(this.createMostFrequentCoAuthorsCard());
        this.rowModels.push(rowModel);
    }

    //This method creates the third row which renders the following:
    //Co-Authors with highest h-index
    //Expertise
    private createThirdRow(): void {
        const rowModel: RowModel = new RowModel(10);
        rowModel.simpleCardModels.push(this.createCoAuthorsWithHighestHIndexCard());
        rowModel.simpleCardModels.push(this.createExpertiseCard());
        this._rowModels.push(rowModel);
    }

    //This method creates the fourth row which renders the articles
    private createFourthRow(): void {
        const rowModel: RowModel = new RowModel(10);
        rowModel.simpleCardModels.push(this.createArticlesCard());
        this._rowModels.push(rowModel);
    }

    private sortSeriesByName(a: Series, b: Series): number {
        if (+a.name < +b.name) return -1;
        if (+a.name > +b.name) return 1;
        return 0;
    }

    private sortSeriesByData(a: Series, b: Series): number {
        if (+a.data[0] > +b.data[0]) return -1;
        if (+a.data[0] < +b.data[0]) return 1;
        return 0;
    }
}
