import {  ArticlesPaginationFilter, SortByFilter } from '../../../filters/articlesfilters/ArticlesFilter';
import { Article, ArticleCoAuthor, ArticlesModel, Pagination, ViewName } from '../../../models';

let articlePagination: Pagination<ArticlesModel>;
let artModel: ArticlesModel;
beforeAll( () => 
{
    const articlePaginationFilter: ArticlesPaginationFilter = new ArticlesPaginationFilter(15);
    const coAuthors:ArticleCoAuthor = new ArticleCoAuthor('4242424','Georgios Zervakis');
    const article:Article = new Article(
        'NP=P ?',
        'Karlsruhe Institute of Technology',
        2022,
        12,
        2,
        '',
        [coAuthors],
        'My proof is perfect',
        '2022',
        '',
        'MIT Journal',
        ['Theoretical Computer Science'],
    );
    const articles:Article[] = new Array<Article>();
    articles.push(article);
    const articlesModel: ArticlesModel = new ArticlesModel(
        articles,
        'Articles',
        '',
        ViewName.ArticlesCard,
        12,
    );
    articlesModel.paginationFilter = articlePaginationFilter;
    const articlesFilter:SortByFilter = new SortByFilter('year');
    articlesModel.filters = [articlesFilter];
    articlesModel.pagination = new Pagination(articlePaginationFilter,articlesModel);
    const ap: Pagination<ArticlesModel> = new Pagination(articlePaginationFilter, articlesModel);
    ap.paginationFilter = articlePaginationFilter;
    articlePagination=ap;
    artModel=articlesModel;
});

describe('Set model', () =>
{
    it('Check if model of articlePagination is set correctly', () => 
    {
        expect(articlePagination.model).toEqual(artModel);
    });
});

describe('Hits per page', () =>
{
    it('Default hits per page', () => 
    {
        expect(artModel.paginationFilter.hitsPerPage).toBe(10);
    });
    
    it('Change hits per page', () => 
    {
        artModel.updateHitsPerPage(20);
        expect(artModel.paginationFilter.hitsPerPage).toBe(20);
    });
});

describe('Handle switch', () =>
{
    it('Change max page', () => 
    {
        artModel.pagination.handleSwitch();
        expect(artModel.pagination.maxPage).toBe(1);
    });
});

describe('Current page', () =>
{
    it('Model current page', () =>
    {
        expect(artModel.pagination.currentPage).toBe(1);
    });
});
