import { PublicationByYear } from '../../../models/profile/PublicationByYear';

const publicationByYear: PublicationByYear = new PublicationByYear(1, 1);

describe('PublicationByYear test', () =>
    it('check publication by year attributes', () => 
    {
        expect(publicationByYear.year == 1).toBe(true);
        expect(publicationByYear.publicationsCount == 1 ).toBe(true);
    }
    )
);

describe('PublicationByYear', () =>
    it('set publication by year attributes', () => 
    {
        const tempPublicationByYear: PublicationByYear = publicationByYear;
        tempPublicationByYear.year = 1;
        tempPublicationByYear.publicationsCount= 1;
        expect(tempPublicationByYear.year == 1).toBe(true);
        expect(tempPublicationByYear.publicationsCount == 1).toBe(true);
    }
    )
);