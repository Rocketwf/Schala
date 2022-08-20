import { CitationsByYear } from '../../../models/profile/CitationsByYear';
const citationsByYear:CitationsByYear = new CitationsByYear(2022,3,5,8);

describe('Citations by Year test', () =>
    it('Set citations by year attributes', () => 
    {
        const tempCitationsByYear:CitationsByYear = citationsByYear;
        tempCitationsByYear.indirectSelfCitationsCount=0;
        tempCitationsByYear.selfCitationsCount=0;
        tempCitationsByYear.totalCitationCount=0;
        tempCitationsByYear.year=0;
        expect(tempCitationsByYear.indirectSelfCitationsCount == 0 && tempCitationsByYear.selfCitationsCount == 0 
            && tempCitationsByYear.totalCitationCount == 0 && tempCitationsByYear.year == 0).toBe(true);
    }
    )
);