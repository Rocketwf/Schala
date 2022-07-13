import { ArticlesFilter, ArticlesPaginationFilter } from '../../../filters/articlesfilters/ArticlesFilter';
import { Article, ArticleCoAuthor, ViewName } from '../../../models';
import { ArticlesModel } from '../../../models/articlesmodel/ArticlesModel';

let articlesModel: ArticlesModel;
beforeAll(() =>
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
        '',
        [coAuthor],
        ''
    );
    
    const artmod: ArticlesModel = new ArticlesModel(
        [article],
        '',
        '',
        ViewName.ArticlesCard,
        4,
    );
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
    
    it('apply pagination filter', () => 
    { 
        const filter: ArticlesPaginationFilter = new ArticlesPaginationFilter(15);
        articlesModel.paginationFilter = filter;
        //articlesModel.applyPaginationFilter();
        filter.apply(articlesModel);
        expect(articlesModel.paginationFilter.value).toEqual(15);   
    });
});
