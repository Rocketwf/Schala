import { PublicationByVenue } from '../../models/profile/PublicationByVenue';

const publicationByVenue: PublicationByVenue = new PublicationByVenue('', 1);

describe('PublicationByVenue test', () =>
    it('check publication by  venue attributes', () => 
    {
        expect(publicationByVenue.venue == '').toBe(true);
        expect(publicationByVenue.publicationCount == 1 ).toBe(true);
    }
    )
);

describe('PublicationByVenue test', () =>
    it('set publication by venue attributes', () => 
    {
        const tempPublicationByVenue: PublicationByVenue = publicationByVenue;
        tempPublicationByVenue.venue = 'venue';
        tempPublicationByVenue.publicationCount= 0;
        expect(tempPublicationByVenue.venue == 'venue').toBe(true);
        expect(publicationByVenue.publicationCount == 0 ).toBe(true);
    }
    )
);