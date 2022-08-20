import { CitedScholar } from '../../models/profile/CitedScholar';

const citedScholar:CitedScholar = new CitedScholar('tichy', 200);

describe('Cited scholar test', () =>
    it('Set cited scholar attributes', () => 
    {
        const tempCitedScholar: CitedScholar = citedScholar;
        tempCitedScholar.name = 'georgios';
        tempCitedScholar.citationCount = 201;
        expect(tempCitedScholar.name == 'georgios').toBe(true);
        expect(tempCitedScholar.citationCount == 201).toBe(true);
    }
    )
);