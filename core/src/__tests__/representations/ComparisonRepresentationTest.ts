import { Article, ArticleCoAuthor, FullProfile } from '../../models';
import { Author, BasicProfile, CitationByYear, CitedScholar, ProfileExpertise, PublicationByVenue, PublicationByYear } from '../../models/profile/Profile';
import { ComparisonRepresentation } from '../../representations';

let rep: ComparisonRepresentation;
let fullProfile: FullProfile;
beforeAll(() => 
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
    articles.push(new Article('Turing machine simulator','KIT',1977,15,1,'',coAuthors,'Alan Turing is genius','','','KIT Journal',['Engineering']));
    const fp: FullProfile = new FullProfile(
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
    rep = new ComparisonRepresentation([fp]);
    fullProfile=fp;
});

describe('ComparisonRepresentation tests', () => 
{
    it('checks fullProfiles', () => 
    {
        expect(rep.fullProfiles).toEqual([fullProfile]);
    });
    it('checks if renderComparison works', () => 
    {
        rep.renderComparison();
        expect(rep.rowModels.length > 0).toEqual(true);
    });
    it('checks rowModel setter and getter', () => 
    {
        rep.renderComparison();
        rep.rowModels[0].id = 'first';
        rep.rowModels[0].width = 5;
        expect(rep.rowModels[0].id).toBe('first');
        expect(rep.rowModels[0].width).toBe(5);
    });
});
