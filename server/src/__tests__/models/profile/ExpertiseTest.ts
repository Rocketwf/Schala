import { Expertise } from '../../../models/profile/Expertise';
 
const expertise: Expertise = new Expertise('exampleExpertise', 2);

describe('Expertise test', () => 
    it('test expertise attributes', () =>
    {
        expect(expertise.name == 'exampleExpertise').toBe(true);
        expect(expertise.count == 2).toBe(true);
    }
    )
);

describe('Set expertise', () =>
    it('test setting expertise attributes', () => 
    {
        const tempExpertise: Expertise = expertise;
        tempExpertise.name = '';
        tempExpertise.count = 0;
        expect(tempExpertise.name == '').toBe(true);
        expect(tempExpertise.count == 0).toBe(true);
    }
    )
);