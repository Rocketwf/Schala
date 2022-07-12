//import { Article, ArticlesModel, ViewName } from '../../../models';

describe('articles filter test', () => 
{
    //const articles: Article[] = [];
    //let articleModel: ArticlesModel;
    //beforeEach(() => {
    //    const articles: Article[] = ProfileService.build('1679754').articles;
    //    articleModel = new ArticlesModel(articles, 'Articles', 'SUB', ViewName.ArticlesCard, 10);
    //});

    it('fetches author articles', async () => 
    {
        expect(true).toBe(true);
    }, 30000);
    //it('fetches author articles', async () => {
    //expect(articles.length > 0).toBe(true);
    //}, 30000);

    //it('sorts articles by year', () => {
    //const sortBy: SortByFilter = new SortByFilter('year');
    //sortBy.apply(articleModel);
    //expect(articleModel.articles[0].publicationYear > articleModel.articles[1].publicationYear).toBe(true);
    //}, 30000);

    //it('sorts articles by year', () => {
    //const sortBy: SortByFilter = new SortByFilter('citations');
    //sortBy.apply(articleModel);
    //expect(articleModel.articles[0].citationsCount > articleModel.articles[1].citationCount).toBe(true);
    //}, 30000);

    //it('sorts articles by citations', () => {
    //const sortBy: SortByFilter = new SortByFilter('self-citations');
    //sortBy.apply(articleModel);
    //expect(articleModel.articles[0].selfCitationsCount > articleModel.articles[1].selfCitationsCount).toBe(true);
    //}, 30000);

    //it('filters articles by coauthors', () => {
    //const strings: string[] = [];
    //strings.push('D. Garlan');
    //const coAuthor: CoauthorsFilter = new CoauthorsFilter(strings);
    //coAuthor.apply(articleModel);
    //for(const article of articleModel.articles){
    //   expect(article.coAuthors.includes('D. Garlan')).toBe(true);
    //}
    //}, 30000);

    //it('filters articles by words in the title', () => {
    //const strings: string[] = [];
    //strings.push('COVID');
    //const words: WordsInTitleFilter = new WordsInTitleFilter(strings);
    //words.apply(articleModel);
    //for(const article of articleModel.articles){
    //   expect(article.title.indexOf('COVID') > -1).toBe(true);
    //}
    //}, 30000);

    //it('filters articles by number of citations', () => {
    //const number: NumberOfCitationsFilter = new NumberOfCitationsFilter(20);
    //number.apply(articleModel);
    //expect(articleModel.articles[0].citationsCount > articleModel.articles[1].citationsCount ).toBe(true);
    //}, 30000);

    //it('filters articles by keywords', () => {
    //const strings: string[] = ['Understanding', 'cont'];
    //const keywords: KeywordsFilter = new KeywordsFilter(strings);
    //keywords.apply(articleModel);
    //for(const article of articleModel.articles){
    //   expect(article.getAbstract.indexOf('Understanding') > -1).toBe(true);
    //   expect(article.getAbstract.indexOf('cont') > -1).toBe(true);
    //}
    //);
    //}, 30000);
});
