import { ArticlesPaginationFilter, SortByFilter } from '../../../filters/articlesfilters/ArticlesFilter';
import { Article, ArticleCoAuthor, Pagination, ViewName } from '../../../models';
import { ArticlesModel } from '../../../models/articlesmodel/ArticlesModel';

let articlesModel: ArticlesModel;
beforeEach(() =>
{
    const coAuthor: ArticleCoAuthor = new ArticleCoAuthor(
        '31',
        'Tichy'
    );

    const article:Article = new Article(
        '',
        '',
        2000,
        30,
        2,
        '',
        [coAuthor],
        '',
        'Tichy is cool',
        '1985',
        'KIT Journal',
        ['Computer science','Mathematics','Physics']
    );
    
    const artmod: ArticlesModel = new ArticlesModel(
        [article],
        '',
        '',
        ViewName.ArticlesCard,
        4,
    );
    const filter: ArticlesPaginationFilter = new ArticlesPaginationFilter(15);
    const articlePagination: Pagination<ArticlesModel> = new Pagination(filter, articlesModel);
    const articleSort: SortByFilter = new SortByFilter('year');
    artmod.filters = [articleSort];
    artmod.pagination = articlePagination;
    artmod.paginationFilter = filter;
    artmod.applyPaginationFilter();
    articlesModel=artmod;
});

describe('check id inequality', () => 
{
    it('deep copy', () => 
    {
        expect(articlesModel.id).not.toEqual(articlesModel.deepCopy().id);   
    });
});

describe('filter ', () => 
{
    it('check max page', () => 
    {
        expect(articlesModel.pagination.maxPage).toEqual(1);   
    });
});

describe('pagination filter ', () => 
{
    it('value pagination filter', () => 
    { 
        expect(articlesModel.paginationFilter.value).toEqual(15);   
    });
    it('hits per page', () => 
    { 
        expect(articlesModel.paginationFilter.hitsPerPage).toEqual(10);   
    });
});

