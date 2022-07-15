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
    HeatmapChartModel,
} from '../models';
import { Expertise, ExpertiseModel } from '../models/simplecardmodel/ExpertiseModel';
import { ArticlesFilterButton, RangeButton, ShowingButton } from '../models/inputs/PopupEditButton';
import { Filter } from '../filters';
import { FromFilter, ShowingFilter, ToFilter } from '../filters/objectserieschartfilters/ObjectSeriesFilter';
import {
    ArticlesPaginationFilter,
    CoauthorsFilter,
    ExpertiseFilter,
    JournalFilter,
    KeywordsFilter,
    NumberOfCitationsFilter,
    SortByFilter,
    WordsInArticleTitleFilter,
} from '../filters/articlesfilters/ArticlesFilter';
import { Pagination } from '../models/viewmodels/Pagination';
import { SelectOptions } from '../models/inputs/Inputs';

/**
 * Represents page width constant with a value of 12
 */
const PAGE_WIDTH: number = 12;

/**
 * Type defining the following data for each card:
 * title
 * row number
 * number of columns
 * default number of entries
 */
type cardData = {
    TITLE: string;
    ROW: number;
    COLS: number;
    DEFAULT_NUM_OF_ENTRIES?: number;
};

/**
 * Possible types of cards using type cardData:
 * publications by year, publications by venue, citations by year, most cited scholars,
 * citations, most frequent co-authors, co-authors with highest h-index, expertise, articles
 */
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

/**
 * Cards constant defining each type of card and their card data which includes their title, row number, number of columns and default number of entries
 */
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

/**
 * Builds the data structure that will be given to ProfilePage.
 */
export class ProfileRepresentation 
{
    private _fullProfile: FullProfile;
    private _rowModels: Array<RowModel>;
    constructor(_fullProfile: FullProfile) 
    {
        this._fullProfile = _fullProfile;
        this._rowModels = new Array<RowModel>();
    }

    /**
     * Updates the RowModel list according to the given FullProfile.
     */
    renderProfile(): void 
    {
        this._rowModels = [];
        this.createFirstRow();
        this.createSecondRow();
        this.createThirdRow();
        this.createFourthRow();
        this.createFifthRow();
    }

    /**
     * Getter method of the FullProfile.
     */
    public get fullProfile(): FullProfile 
    {
        return this._fullProfile;
    }

    /**
     * Setter method of the FullProfile.
     */
    public set fullProfile(fullProfile: FullProfile) 
    {
        this._fullProfile = fullProfile;
    }

    /**
     * Getter method of the list of RowModel.
     */
    public get rowModels(): RowModel[] 
    {
        return this._rowModels;
    }

    /**
     * Creates publications by year card with from, to and range filters.
     * @returns publications by year card as DistributedColumnsChartModel
     */
    private createPublicationsByYearCard(): DistributedColumnsChartModel 
    {
        const series: Array<Series> = new Array<Series>();
        for (const pby of this._fullProfile.publicationsByYear) 
        {
            series.push(new Series(pby.year + '', [pby.publicationsCount]));
        }
        const years: string[] = new Array<string>();
        for (const pby of this._fullProfile.publicationsByYear) 
        {
            years.push(pby.year + '');
        }
        const pby: DistributedColumnsChartModel = new DistributedColumnsChartModel(
            CARDS.PUBLICATIONS_BY_YEAR.CARD_DATA.TITLE,
            '',
            ViewName.DistributedColumnsChartCard,
            CARDS.PUBLICATIONS_BY_YEAR.CARD_DATA.COLS,
            series,
            'Years',
            'Number of publications',
            years,
        );

        pby.showExpandButton();

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

    /**
     * Creates publications by venue card with a showing filter.
     * @returns publications by venue card as DistributedColumnsChartModel
     */
    private createPublicationsByVenueCard(): DistributedColumnsChartModel 
    {
        const series: Array<Series> = new Array<Series>();
        for (const pbv of this._fullProfile.publicationsByVenue) 
        {
            series.push(new Series(pbv.venue, [pbv.publicationCount]));
        }

        const venues: string[] = new Array<string>();
        for (const venue of this._fullProfile.publicationsByVenue) 
        {
            venues.push(venue.venue);
        }
        const pbv: DistributedColumnsChartModel = new DistributedColumnsChartModel(
            CARDS.PUBLICATIONS_BY_VENUE.CARD_DATA.TITLE,
            '',
            ViewName.DistributedColumnsChartCard,
            CARDS.PUBLICATIONS_BY_VENUE.CARD_DATA.COLS,
            series,
            'Venues',
            'Number of publications',
            venues,
        );
        pbv.showExpandButton();

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
        pbv.applyAllFilters();

        return pbv;
    }

    /**
     * Creates most cited scholars card with a showing filter.
     * @returns most cited scholars card as BasicBarsChartModel
     */
    private createMostCitedScholarsCard(): BasicBarsChartModel 
    {
        const series: Array<Series> = new Array<Series>();
        for (const cs of this._fullProfile.citedScholars) 
        {
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
        mcs.showExpandButton();

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
        mcs.applyAllFilters();

        return mcs;
    }

    /**
     * Creates most frequent co-authors card with a showing filter.
     * @returns most frequent co-authors card as BasicBarsChartModel
     */
    private createMostFrequentCoAuthorsCard(): BasicBarsChartModel 
    {
        let series: Array<Series> = new Array<Series>();
        for (const author of this._fullProfile.authors) 
        {
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

        mfa.showExpandButton();
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
        mfa.applyAllFilters();

        return mfa;
    }

    /**
     * Creates citation by year card with from, to and range filters.
     * @returns citation by year card as StackedColumnsChartModel
     */
    private createCitationsByYearCard(): StackedColumnsChartModel 
    {
        let series: Array<Series> = new Array<Series>();
        for (const cby of this._fullProfile.citationsByYear) 
        {
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

        cby.showExpandButton();
        const lastValue: number = +cby.series[cby.series.length - 1]?.name;
        const fromFilter: Filter<number, StackedColumnsChartModel> = new FromFilter(
            lastValue - CARDS.CITATIONS_BY_YEAR.CARD_DATA.DEFAULT_NUM_OF_ENTRIES,
        );
        const fromNumberField: Field<number, StackedColumnsChartModel> = new Field<number, StackedColumnsChartModel>(
            'from',
            lastValue - CARDS.CITATIONS_BY_YEAR.CARD_DATA.DEFAULT_NUM_OF_ENTRIES,
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

    /**
     * Creates expertise card to be used in .
     * @returns expertise card as ExpertiseModel
     */
    private createExpertiseCard(): ExpertiseModel 
    {
        const expertise: Expertise = new Expertise(this._fullProfile.basicProfile.name, this._fullProfile.expertise);
        return new ExpertiseModel(
            [expertise],
            CARDS.EXPERTISE.CARD_DATA.TITLE,
            '',
            ViewName.ExpertiseCard,
            CARDS.EXPERTISE.CARD_DATA.COLS,
        );
    }

    /**
     * Creates articles card with co-authors, keywords, words in title, minimum number of citations, sort by and pagiantion filters.
     * @returns articles card as ArticlesModel
     */
    private createArticlesCard(): ArticlesModel 
    {
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

        const journalFilter: Filter<string, ArticlesModel> = new JournalFilter('');
        const journalTextField: Field<string, ArticlesModel> = new Field<string, ArticlesModel>(
            'Journal name',
            '',
            journalFilter,
            [articlesModel],
        );

        const expertiseFilter: Filter<string, ArticlesModel> = new ExpertiseFilter('');
        const expertiseTextField: Field<string, ArticlesModel> = new Field<string, ArticlesModel>(
            'Fields of study seperated by ,',
            '',
            expertiseFilter,
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
            journalTextField,
            expertiseTextField,
            minCitationsField,
        ]);
        articlesModel.popupButtons = [articlesFilterPopup];

        const articlePaginationFilter: ArticlesPaginationFilter = new ArticlesPaginationFilter(1);
        const articlePagination: Pagination<ArticlesModel> = new Pagination(articlePaginationFilter, articlesModel);
        articlesModel.pagination = articlePagination;

        articlesModel.paginationFilter = articlePaginationFilter;

        const articlesSortByFilter: SortByFilter = new SortByFilter('year');
        const sortBySelectOptions: SelectOptions<string, ArticlesModel> = new SelectOptions<string, ArticlesModel>(
            'Sort by',
            'year',
            ['year', 'citations', 'self-citations'],
            articlesSortByFilter,
            [articlesModel],
        );

        articlesModel.selectOptions = [sortBySelectOptions];

        articlesModel.filters = [
            coAuthorsFilter,
            keywordsFilter,
            wordsInTitleFilter,
            journalFilter,
            expertiseFilter,
            minCitationsFilter,
            articlesSortByFilter,
        ];
        articlesModel.applyAllFilters();

        return articlesModel;
    }

    /**
     * Creates citations card.
     * @returns citatons card as PieChartModel
     */
    private createCitationsCard(): PieChartModel 
    {
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

    /**
     * Creates co-authors with highest h-index card with a showing filter.
     * @returns co-authors with highest h-index card as LineColumnsMixedChartModel
     */
    private createCoAuthorsWithHighestHIndexCard(): LineColumnsMixedChartModel 
    {
        const series: Array<Series> = new Array<Series>();

        for (const author of this._fullProfile.authors) 
        {
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

        awhhi.showExpandButton();
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
        awhhi.applyAllFilters();

        return awhhi;
    }

    private createPublicationsByQuarterCard(): HeatmapChartModel 
    {
        let series: Array<Series> = new Array<Series>();
        const tempSeries: Array<Series> = new Array<Series>();

        for (const article of this._fullProfile.articles) 
        {
            if (article.publicationDate) 
            {
                const date: string[] = article.publicationDate.split('-');
                const newSerie: Series = new Series(date[0], [+date[1]]);
                tempSeries.push(newSerie);
            }
            else 
            {
                if (article.publicationYear) 
                {
                    const newSerie: Series = new Series(article.publicationYear + '', [0]);
                    tempSeries.push(newSerie);
                }
            }
        }

        for (const tempSerie of tempSeries) 
        {
            const yearSeries: Array<Series> = tempSeries.filter((serie: Series) => serie.name === tempSerie.name);
            if (series.filter((serie: Series) => serie.name === tempSerie.name).length > 0) 
            {
                continue;
            }
            else 
            {
                const newSerie: Series = new Series(tempSerie.name, new Array(5).fill(0));
                for (const yearSerie of yearSeries) 
                {
                    newSerie.data[this.getQuarter(yearSerie.data[0])]++;
                }
                series.push(newSerie);
            }
        }

        series = series.sort(this.sortSeriesByName);

        const heatmapChartModel: HeatmapChartModel = new HeatmapChartModel(
            'Publications by Quarter',
            '',
            ViewName.HeatmapChartCard,
            12,
            series,
        );

        return heatmapChartModel;
    }

    private getQuarter(month: number): number 
    {
        if (1 <= month && month <= 3) 
        {
            return 0;
        }
        else if (4 <= month && month <= 6) 
        {
            return 1;
        }
        else if (7 <= month && month <= 9) 
        {
            return 2;
        }
        else if (10 <= month && month <= 12) 
        {
            return 3;
        }
        else 
        {
            return 4;
        }
    }

    //Creates the first row which renders the following:
    //Publications by year
    //Publications by venue
    //Citations by year
    private createFirstRow(): void 
    {
        const rowModel: RowModel = new RowModel(PAGE_WIDTH);
        const pbvCard: DistributedColumnsChartModel = this.createPublicationsByYearCard();
        const pbyCard: DistributedColumnsChartModel = this.createPublicationsByVenueCard();
        const cbyCard: StackedColumnsChartModel = this.createCitationsByYearCard();

        if (this.validateWidth(pbvCard.colWidth + pbvCard.colWidth + cbyCard.colWidth)) 
        {
            rowModel.simpleCardModels.push(pbvCard);
            rowModel.simpleCardModels.push(pbyCard);
            rowModel.simpleCardModels.push(cbyCard);
        }
        this.rowModels.push(rowModel);
    }
    private createSecondRow(): void 
    {
        const rowModel: RowModel = new RowModel(PAGE_WIDTH);
        const heatmapCard: HeatmapChartModel = this.createPublicationsByQuarterCard();
        if (this.validateWidth(heatmapCard.colWidth)) 
        {
            rowModel.simpleCardModels.push(heatmapCard);
        }
        this._rowModels.push(rowModel);
    }
    //Creates the second row which renders the following:
    //Most cited scholars
    //Citation breakdown
    //Most frequent co-authors
    private createThirdRow(): void 
    {
        const rowModel: RowModel = new RowModel(PAGE_WIDTH);
        const mcsCard: BasicBarsChartModel = this.createMostCitedScholarsCard();
        const citationsCard: PieChartModel = this.createCitationsCard();
        const mfcaCard: BasicBarsChartModel = this.createMostFrequentCoAuthorsCard();

        if (this.validateWidth(mcsCard.colWidth + citationsCard.colWidth + mfcaCard.colWidth)) 
        {
            rowModel.simpleCardModels.push(mcsCard);
            rowModel.simpleCardModels.push(citationsCard);
            rowModel.simpleCardModels.push(mfcaCard);
        }
        this.rowModels.push(rowModel);
    }

    //Creates the third row which renders the following:
    //Co-Authors with highest h-index
    //Expertise
    private createFourthRow(): void 
    {
        const rowModel: RowModel = new RowModel(PAGE_WIDTH);
        const awhhCard: LineColumnsMixedChartModel = this.createCoAuthorsWithHighestHIndexCard();
        const expertiseCard: ExpertiseModel = this.createExpertiseCard();

        if (this.validateWidth(expertiseCard.colWidth + awhhCard.colWidth)) 
        {
            rowModel.simpleCardModels.push(awhhCard);
            rowModel.simpleCardModels.push(expertiseCard);
        }
        this._rowModels.push(rowModel);
    }

    //Creates the fourth row which renders the articles
    private createFifthRow(): void 
    {
        const rowModel: RowModel = new RowModel(PAGE_WIDTH);
        const articlesCard: ArticlesModel = this.createArticlesCard();
        if (this.validateWidth(articlesCard.colWidth)) 
        {
            rowModel.simpleCardModels.push(articlesCard);
        }
        this._rowModels.push(rowModel);
    }

    /**
     * Sorts the given series according to their names in ascending order.
     * @param a - the first series to be sorted
     * @param b - the second series to be sorted
     * @returns the sorted series
     */
    private sortSeriesByName(a: Series, b: Series): number 
    {
        if (+a.name < +b.name) 
        {
            return -1;
        }
        if (+a.name > +b.name) 
        {
            return 1;
        }
        return 0;
    }

    /**
     * Sorts the given series' data in ascending order and checks if the page width is valid.
     * @param a - the first series whose data is to be sorted
     * @param b - the second series whose data is to be sorted
     * @returns the sorted series data
     */
    private sortSeriesByData(a: Series, b: Series): number 
    {
        if (+a.data[0] > +b.data[0]) 
        {
            return -1;
        }
        if (+a.data[0] < +b.data[0]) 
        {
            return 1;
        }
        return 0;
    }

    validateWidth(value: number): boolean 
    {
        return value <= PAGE_WIDTH;
    }
}
