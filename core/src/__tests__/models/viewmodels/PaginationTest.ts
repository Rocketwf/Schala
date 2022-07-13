import { ArticlesPaginationFilter } from '../../../filters/articlesfilters/ArticlesFilter';
import { Article, ArticleCoAuthor, ArticlesModel, Pagination, ViewName } from '../../../models';

describe('pagination filter', () => 
{
    it('filter', () => 
    {
        const articlePaginationFilter: ArticlesPaginationFilter = new ArticlesPaginationFilter(15);
        const coAuthors:ArticleCoAuthor = new ArticleCoAuthor('','');
        const article:Article = new Article(
            '',
            '',
            2000,
            12,
            '',
            [coAuthors],
            ''
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
        const articlePagination: Pagination<ArticlesModel> = new Pagination(articlePaginationFilter, articlesModel);
        articlePagination.maxPage;
        articlePagination.currentPage;
        articlePagination.paginationFilter;
        articlePagination.model;
    });
});
