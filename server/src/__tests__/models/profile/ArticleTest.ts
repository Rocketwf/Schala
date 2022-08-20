import { Article } from '../../../models/profile/Article';
import { ArticleCoAuthor } from '../../../models/profile/ArticleCoAuthor';
const article: Article = new Article('P != NP ?','IEEE',2022,42,11,'www.ieee.org',
    'Some abstract',[new ArticleCoAuthor('123456','G.Zervakis')],'01.01.2022','Cool bibtex','IEEE 2022',['Computer Science']);

describe('Article test', () =>
    it('test article attributes', () => 
    {
        expect(article.title == 'P != NP ?' && article.venue == 'IEEE' && article.publicationYear == 2022 && article.citationCount == 42 &&
        article.selfCitationsCount == 11 && article.url == 'www.ieee.org' && article.abstract == 'Some abstract' && article.articlesCoAuthors[0].id == '123456'
     && article.articlesCoAuthors[0].name == 'G.Zervakis' && article.publicationDate == '01.01.2022' && article.bibtex == 'Cool bibtex'
     && article.journalName == 'IEEE 2022' && article.fieldsOfExpertise[0] == 'Computer Science').toBe(true);
    }
    )
);

describe('Set article', () =>
    it('test setting article attributes', () => 
    {
        const tempArticle: Article = article;
        tempArticle.abstract = '';
        tempArticle.articlesCoAuthors =[];
        tempArticle.bibtex = '';
        tempArticle.citationCount = 0;
        tempArticle.fieldsOfExpertise = [];
        tempArticle.journalName = '';
        tempArticle.publicationDate = '';
        tempArticle.publicationYear = 0;
        tempArticle.selfCitationsCount = 0;
        tempArticle.title = '';
        tempArticle.url = '';
        tempArticle.venue = '';
        expect(tempArticle.title == '' && tempArticle.venue == '' && tempArticle.publicationYear == 0 && tempArticle.citationCount == 0 &&
        tempArticle.selfCitationsCount == 0 && tempArticle.url == '' && tempArticle.abstract == '' 
     && tempArticle.publicationDate == '' && tempArticle.bibtex == ''
     && tempArticle.journalName == '').toBe(true);
    }
    )
);