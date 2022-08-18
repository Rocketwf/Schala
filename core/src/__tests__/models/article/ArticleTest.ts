import { Article, ArticleCoAuthor } from "../../../models";

describe('checks article', () => 
{
    let article: Article;
    beforeEach(() =>
    {
        const coAuthor: ArticleCoAuthor = new ArticleCoAuthor(
            '31',
            'Tichy'
        );
        article = new Article(
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
    });
    it('checks setter and getter of publicationYear', () => 
    {
        article.publicationYear = 2020;
        expect(article.publicationYear).toBe(2020);
    });
    it('checks setter and getter of citationCount', () => 
    {
        article.citationCount = 40;
        expect(article.citationCount).toBe(40);
    });
    it('checks setter and getter of title', () => 
    {
        article.title = 'Nice';
        expect(article.title).toBe('Nice');
    });
    it('checks setter and getter of venue', () => 
    {
        article.venue = 'Karlsruhe';
        expect(article.venue).toBe('Karlsruhe');
    });
    it('checks setter and getter of url', () => 
    {
        article.url = 'www';
        expect(article.url).toBe('www');
    });
    it('checks setter and getter of abstract', () => 
    {
        article.abstract = 'First';
        expect(article.abstract).toBe('First');
    });
    it('checks setter and getter of publicationDate', () => 
    {
        article.publicationDate = 'Second';
        expect(article.publicationDate).toBe('Second');
    });
    it('checks setter and getter of bibtex', () => 
    {
        article.bibtex = 'bib';
        expect(article.bibtex).toBe('bib');
    });
    it('checks setter and getter of selfCitationsCount', () => 
    {
        article.selfCitationsCount = 5;
        expect(article.selfCitationsCount).toBe(5);
    });
    it('checks setter and getter of selfCitationsCount', () => 
    {
        article.journalName = 'J';
        expect(article.journalName).toBe('J');
    });
    it('checks setter and getter of fieldsOfExpertise', () => 
    {
        article.fieldsOfExpertise = ['C'];
        expect(article.fieldsOfExpertise[0]).toBe('C');
    });
});