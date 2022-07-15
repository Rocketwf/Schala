//import { Article, ArticlesModel, ViewName } from '../../../models';


import { SemanticScholarSource } from '../../../datasources';
import { ArticlesPaginationFilter, CoauthorsFilter, KeywordsFilter, NumberOfCitationsFilter, SortByFilter, WordsInArticleTitleFilter } from '../../../filters/articlesfilters/ArticlesFilter';
import { ArticlesModel, FullProfile, ViewName } from '../../../models';

describe('articles filter test', () => 
{
    let profile: FullProfile;
    let articleModel: ArticlesModel;
    beforeEach(async () => 
    {
        profile = await SemanticScholarSource.getInstance().fetchFullProfile('1679754');
        articleModel = new ArticlesModel(profile.articles, 'Articles', 'SUB', ViewName.ArticlesCard, 10);
    }, 30000);

    it('fetches author articles', async () => 
    {
        expect(profile.articles.length > 0).toBe(true);
    }, 30000);

    it('sorts articles by year', () => 
    {
        const sortBy: SortByFilter = new SortByFilter('year');
        sortBy.apply(articleModel);
        expect(articleModel.articles[0].publicationYear > articleModel.articles[10].publicationYear).toBe(true);
    }, 30000);

    it('sorts articles by year', () => 
    {
        const sortBy: SortByFilter = new SortByFilter('citations');
        sortBy.apply(articleModel);

        expect(articleModel.articles[0].citationCount > articleModel.articles[1].citationCount).toBe(true);
    }, 30000);

    it('sorts articles by citations', () => 
    {
        const sortBy: SortByFilter = new SortByFilter('self-citations');
        sortBy.apply(articleModel);
        expect(articleModel.articles[0].selfCitationsCount > articleModel.articles[1].selfCitationsCount).toBe(true);
    }, 30000);

    it('filters articles by coauthors', () => 
    {
        const coAuthor: CoauthorsFilter = new CoauthorsFilter('D. Garlan');
        coAuthor.apply(articleModel);
        
        for(const article of articleModel.articles)
        {
            const names: string[] = [];
            for(const coAuthor of article.coAuthors)
            {
                names.push(coAuthor.name);
            }
            expect(names.includes('D. Garlan')).toBe(true);
        }

       
    }, 30000);

    it('filters articles by words in the title', () => 
    {
        const words: WordsInArticleTitleFilter = new WordsInArticleTitleFilter('COVID');
        words.apply(articleModel);
        for(const article of articleModel.articles)
        {
            expect(article.title.indexOf('COVID') > -1).toBe(true);
        }
    }, 30000);

    it('filters articles by number of citations', () => 
    {
        const number: NumberOfCitationsFilter = new NumberOfCitationsFilter('20');
        number.apply(articleModel);
        expect(articleModel.articles[0].citationCount > articleModel.articles[1].citationCount ).toBe(true);
    }, 30000);

    it('filters articles by keywords', () => 
    {

        const keywords: KeywordsFilter = new KeywordsFilter('understanding');
        keywords.apply(articleModel);
        for(const article of articleModel.articles)
        {
            expect(article.abstract.indexOf('understanding') > -1 || article.abstract.indexOf('Understanding') > -1).toBe(true);
        }
    //);
    }, 30000);
    it('paginates articles', () => 
    {
        const page: ArticlesPaginationFilter = new ArticlesPaginationFilter(15);
        page.apply(articleModel);
        expect(articleModel.articles.length == 10 ).toBe(true);
    }, 30000);
});