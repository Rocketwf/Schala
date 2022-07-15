//import { Article, ArticlesModel, ViewName } from '../../../models';


import { SemanticScholarSource } from '../../../datasources';
import { ArticlesPaginationFilter, CoauthorsFilter, KeywordsFilter, NumberOfCitationsFilter, SortByFilter, WordsInArticleTitleFilter } from '../../../filters/articlesfilters/ArticlesFilter';
import { Article, ArticleCoAuthor, ArticlesModel, BasicProfile, FullProfile, ViewName } from '../../../models';
import { Author, CitationByYear, CitedScholar, ProfileExpertise, PublicationByVenue, PublicationByYear } from '../../../models/profile/Profile';

let fullProfile: FullProfile;
let articleModel: ArticlesModel;
beforeEach(() => 
{
    const bp: BasicProfile = new BasicProfile(
        '1679754',
        'Walter Tichy',
        ['Karlsruhe Institute of Technology'],
        7693,
        270,
        'https://scholar.googleusercontent.com/citations?view_op=view_photo&user=23RPQBQAAAAJ&citpid=2',  
    );
    const pbyArray:Array<PublicationByYear> = new Array<PublicationByYear>();
    const cbyArray:Array<CitationByYear> = new Array<CitationByYear>();
    for(let i: number = 1975 ; i <= 2022; i++)
    {
        const pby:PublicationByYear = new PublicationByYear(i,5);
        pbyArray.push(pby);
        const cby:CitationByYear = new CitationByYear(i,100,50,200);
        cbyArray.push(cby);
    }
    const pbvArray:Array<PublicationByVenue> = new Array<PublicationByVenue>();
    const pbv:PublicationByVenue = new PublicationByVenue('KIT',9400);
    pbvArray.push(pbv);
    const citedScholars:Array<CitedScholar> = new Array<CitedScholar>();
    citedScholars.push(new CitedScholar('Yigit Oguz',42));
    const authors: Array<Author> = new Array<Author>();
    authors.push(new Author('Om Prakash',100,11));
    const articles:Array<Article> = new Array<Article>();
    const coAuthors: Array<ArticleCoAuthor> = new Array<ArticleCoAuthor>();
    coAuthors.push(new ArticleCoAuthor('4242422','Georgios Zervakis'));
    const expertises: ProfileExpertise[] = [];
    expertises.push(new ProfileExpertise('Computer Science',100));
    expertises.push(new ProfileExpertise('Mathematics',30));
    expertises.push(new ProfileExpertise('Engineering',20));
    articles.push(new Article('Turing machine simulator','KIT',1977,15,11,'',coAuthors,'Alan Turing is genius','','','KIT Journal',['Engineering']));
    articles.push(new Article('Turing machine simulator2','MIT',1978,14,10,'',coAuthors,'Alan Turing is genius','','','KIT Journal',['Physics']));
    articles.push(new Article('Turing machine simulator3','KIT',1979,13,9,'',coAuthors,'Alan Turing is genius','','','KIT Journal',['Computer Science']));
    articles.push(new Article('Turing machine simulator4','MIT',1980,12,8,'',coAuthors,'Alan Turing is genius','','','KIT Journal',['Engineering']));
    articles.push(new Article('Turing machine simulator5','KIT',1981,11,7,'',coAuthors,'Alan Turing is genius','','','KIT Journal',['Physics']));
    articles.push(new Article('Turing machine simulator6','MIT',1982,10,6,'',coAuthors,'Alan Turing is genius','','','KIT Journal',['Computer Science']));
    articles.push(new Article('Turing machine simulator7','KIT',1983,9,5,'',coAuthors,'Alan Turing is genius','','','KIT Journal',['Engineering']));
    articles.push(new Article('Turing machine simulator8','MIT',1984,8,4,'',coAuthors,'Alan Turing is genius','','','KIT Journal',['Physics']));
    articles.push(new Article('Turing machine simulator9','KIT',1985,7,3,'',coAuthors,'Alan Turing is genius','','','KIT Journal',['Engineering']));
    articles.push(new Article('Turing machine simulator10','MIT',1986,6,2,'',coAuthors,'Alan Turing is genius','','','KIT Journal',['Mathematics']));
    articles.push(new Article('Turing machine simulator11','KIT',1987,5,1,'',coAuthors,'Alan Turing is genius','','','KIT Journal',['Engineering']));
    const fp: FullProfile = new FullProfile(
        expertises,
        31,
        22,
        118,
        60,
        3031,
        1340,
        9400,
        'https://ps.ipd.kit.edu/',
        bp,
        pbyArray,
        pbvArray,
        cbyArray,
        citedScholars,
        authors,
        articles,
    );
    fullProfile=fp;
    articleModel = new ArticlesModel(fullProfile.articles, 'Articles', 'SUB', ViewName.ArticlesCard, 10);
});

describe('articles filter test', () => 
{

    it('fetches author articles', async () => 
    {
        expect(fullProfile.articles.length > 0).toBe(true);
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
        const number: NumberOfCitationsFilter = new NumberOfCitationsFilter('2');
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
    /*it('paginates articles', () => 
    {
        const page: ArticlesPaginationFilter = new ArticlesPaginationFilter(10);
        console.log(articleModel.articles.length);
        page.apply(articleModel);
        expect(articleModel.articles.length).toBe(10);
    }, 30000);*/
});