import { CitedScholar } from '../../models/profile/CitedScholar';
import { PublicationByVenue } from '../../models/profile/PublicationByVenue';
import { FullProfile } from '../../models/profile/FullProfile';
import { BasicProfile } from '../../models/profile/BasicProfile';
import { Expertise } from '../../models/profile/Expertise';
import { Article } from '../../models/profile/Article';
import { Author } from '../../models/profile/Author';
import { PublicationByYear } from '../../models/profile/PublicationByYear';
import { CitationsByYear } from '../../models/profile/CitationsByYear';
 
const basicProfile: BasicProfile = new BasicProfile('', '', [], 1, 1, '');
const fullProfile: FullProfile = new FullProfile([],1,1,1,1,1,1,1,'', basicProfile,[],[],[],[],[],[]);

describe('Full profile test', () => 
    it('test full profile correct attributes', () =>
    {
        expect(fullProfile.basicProfile).toEqual(basicProfile);
        expect(fullProfile.expertise).toEqual([]);
        expect(fullProfile.articles).toEqual([]);
        expect(fullProfile.authors).toEqual([]);
        expect(fullProfile.publicationsByVenue).toEqual([]);
        expect(fullProfile.publicationsByYear).toEqual([]);
        expect(fullProfile.citedScholars).toEqual([]);
        expect(fullProfile.citationsByYear).toEqual([]);
        expect(fullProfile.hIndex).toEqual(1);
        expect(fullProfile.hIndexWithoutSelfCitations).toEqual(1);
        expect(fullProfile.i10Index).toEqual(1);
        expect(fullProfile.i10IndexWithoutSelfCitations).toEqual(1);
        expect(fullProfile.indirectSelfCitationsCount).toEqual(1);
        expect(fullProfile.totalCitationsCount).toEqual(1);
        expect(fullProfile.selfCitationsCount).toEqual(1);
        expect(fullProfile.url == '').toBe(true);
        expect(fullProfile.basicProfile).toEqual(basicProfile);

    }
    )
);

describe('FullProfile test', () =>
    it('set full profile attributes', () => 
    {
        const tempFullProfile: FullProfile = fullProfile;
        const tempBasicProfile: BasicProfile = new BasicProfile('', '', [], 22, 300, '');
        const tempArticle: Article = new Article('','',0,0,0,'','',[],'','','',[]);
        const tempAuthor: Author = new Author ('','', 0,0);
        const tempPublicationByVenue: PublicationByVenue = new PublicationByVenue('', 0);
        const tempPublicationByYear: PublicationByYear = new PublicationByYear(0,0);
        const tempCitedScholar: CitedScholar = new CitedScholar('', 0);
        const tempCitationsByYear: CitationsByYear = new CitationsByYear(0,0,0,0);
        const tempExpertise: Expertise = new Expertise('expertise', 22);
        tempFullProfile.expertise = [tempExpertise];
        tempFullProfile.basicProfile = tempBasicProfile;
        tempFullProfile.articles = [tempArticle];
        tempFullProfile.authors = [tempAuthor];
        tempFullProfile.publicationsByVenue = [tempPublicationByVenue]; 
        tempFullProfile.publicationsByYear = [tempPublicationByYear];
        tempFullProfile.citedScholars = [tempCitedScholar];
        tempFullProfile.citationsByYear = [tempCitationsByYear];
        tempFullProfile.hIndex = 2;
        tempFullProfile.hIndexWithoutSelfCitations = 2;
        tempFullProfile.i10Index = 2;
        tempFullProfile.i10IndexWithoutSelfCitations = 2;
        tempFullProfile.totalCitationsCount = 2;
        tempFullProfile.selfCitationsCount = 2;
        tempFullProfile.indirectSelfCitationsCount = 2;
        tempFullProfile.url = 'url';
        expect(tempFullProfile.basicProfile).toEqual(tempBasicProfile);
        expect(tempFullProfile.articles).toEqual([tempArticle]);
        expect(tempFullProfile.authors).toEqual([tempAuthor]);
        expect(tempFullProfile.publicationsByVenue).toEqual([tempPublicationByVenue]);
        expect(tempFullProfile.publicationsByYear).toEqual([tempPublicationByYear]);
        expect(tempFullProfile.citedScholars).toEqual([tempCitedScholar]);
        expect(tempFullProfile.citationsByYear).toEqual([tempCitationsByYear]);
        expect(tempFullProfile.hIndex).toEqual(2);
        expect(tempFullProfile.hIndexWithoutSelfCitations).toEqual(2);
        expect(tempFullProfile.i10Index).toEqual(2);
        expect(tempFullProfile.i10IndexWithoutSelfCitations).toEqual(2);
        expect(tempFullProfile.indirectSelfCitationsCount).toEqual(2);
        expect(tempFullProfile.totalCitationsCount).toEqual(2);
        expect(tempFullProfile.selfCitationsCount).toEqual(2);
        expect(tempFullProfile.url == 'url').toBe(true);

    }
    )
);