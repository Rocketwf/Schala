import { SemanticScholarSource } from '../../../datasources/SemanticScholarSource';
import {
    CoauthorsFilter,
    KeywordsFilter,
    NumberOfCitationsFilter,
    SortByFilter,
    WordsInTitleFilter,
} from '../../../filters/articlesfilters/ArticlesFilter';
import { ArticlesModel, ViewName } from '../../../models';
import { Article } from '../../../models/articles/Article';

describe('articles filter test', () => {
    it('sorts articles by year', async () => {
        const articles: Article[] = await SemanticScholarSource.getInstance().fetchArticles('1679754');

        const articleModel: ArticlesModel = new ArticlesModel(articles, 'Articles', 'SUB', ViewName.ArticlesCard, 10);
        const sortBy: SortByFilter = new SortByFilter('year');
        sortBy.apply(articleModel);
        expect(articleModel.articles[0].year).toBe(2021);
    });
    it('sorts articles by citations', async () => {
        const articles: Article[] = await SemanticScholarSource.getInstance().fetchArticles('1679754');

        const articleModel: ArticlesModel = new ArticlesModel(articles, 'Articles', 'SUB', ViewName.ArticlesCard, 10);
        const sortBy: SortByFilter = new SortByFilter('citations');
        sortBy.apply(articleModel);
        expect(articleModel.articles[0].citation).toBe(269);
    });
    it('sorts articles by citations', async () => {
        const articles: Article[] = await SemanticScholarSource.getInstance().fetchArticles('1679754');

        const articleModel: ArticlesModel = new ArticlesModel(articles, 'Articles', 'SUB', ViewName.ArticlesCard, 10);
        const sortBy: SortByFilter = new SortByFilter('self-citations');
        sortBy.apply(articleModel);
        expect(articleModel.articles[0].selfCitation).toBe(20);
    });
    it('filters articles by coauthors', async () => {
        const articles: Article[] = await SemanticScholarSource.getInstance().fetchArticles('1679754');

        const articleModel: ArticlesModel = new ArticlesModel(articles, 'Articles', 'SUB', ViewName.ArticlesCard, 10);
        const strings: string[] = [];
        strings.push('D. Garlan');
        const coAuthor: CoauthorsFilter = new CoauthorsFilter(strings);
        coAuthor.apply(articleModel);
        expect(articleModel.articles[0].title).toBe('Software Architectures (Dagstuhl Seminar 9508)');
    });
    it('filters articles by words in the title', async () => {
        const articles: Article[] = await SemanticScholarSource.getInstance().fetchArticles('1679754');

        const articleModel: ArticlesModel = new ArticlesModel(articles, 'Articles', 'SUB', ViewName.ArticlesCard, 10);
        const strings: string[] = [];
        strings.push('COVID');
        const words: WordsInTitleFilter = new WordsInTitleFilter(strings);
        words.apply(articleModel);
        expect(articleModel.articles[0].title).toBe('How Does a COVID mRNA vaccine really work?');
    });
    it('filters articles by number of citations', async () => {
        const articles: Article[] = await SemanticScholarSource.getInstance().fetchArticles('1679754');

        const articleModel: ArticlesModel = new ArticlesModel(articles, 'Articles', 'SUB', ViewName.ArticlesCard, 10);
        const number: NumberOfCitationsFilter = new NumberOfCitationsFilter(20);
        number.apply(articleModel);
        expect(articleModel.articles[0].title).toBe(
            'Analysis of Acceleration Structure Parameters and Hybrid Autotuning for Raytracing.',
        );
    });
    it('filters articles by keywords', async () => {
        const articles: Article[] = await SemanticScholarSource.getInstance().fetchArticles('1679754');

        const articleModel: ArticlesModel = new ArticlesModel(articles, 'Articles', 'SUB', ViewName.ArticlesCard, 10);
        const strings: string[] = ['Understanding', 'cont'];
        const keywords: KeywordsFilter = new KeywordsFilter(strings);
        keywords.apply(articleModel);
        expect(articleModel.articles[0].title).toBe(
            'Knowledge-based Sense Disambiguation of Multiword Expressions in Requirements Documents',
        );
    });
});
