import { FullProfile, BasicProfile, Article, ArticleCoAuthor, RowModel, SimpleCardModel } from '../../models';
import { Author, CitationByYear, CitedScholar, PublicationByVenue, PublicationByYear } from '../../models/profile/Profile';
import { ProfileRepresentation } from '../../representations/ProfileRepresentation';

let profileRepresentation: ProfileRepresentation;
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
    articles.push(new Article('Turing machine simulator','KIT',1977,15,'',coAuthors,'Alan Turing is genius'));
    const fp: FullProfile = new FullProfile(
        ['Computer Science','Mathematics','Engineering'],
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
    profileRepresentation = new ProfileRepresentation(fp);
});

describe('check cards for width validity', () => 
{
    it('for loop for cards', () => 
    {
        let isInvalid: boolean = false;
        profileRepresentation.renderProfile();
        profileRepresentation.rowModels.forEach((rowModel: RowModel) => 
        {
            rowModel.simpleCardModels.forEach((simpleCardModel: SimpleCardModel) => 
            {
                if(simpleCardModel.colWidth <= 0)
                {
                    isInvalid = true;
                }
            });
        });
        expect(isInvalid).toBe(false);
    });

    it('check row id validity', () => 
    {
        let isInvalid: boolean = false;
        profileRepresentation.renderProfile();
        for(const rowModel of profileRepresentation.rowModels)
        {
            console.log(rowModel.id);
            if(rowModel.id == null)
            {
                isInvalid=true;
            }
        }
        expect(isInvalid).toBe(false);
    });
});
