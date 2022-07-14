import { SemanticScholarSource } from '../../datasources';
import { FullProfile } from '../../models';
import { ComparisonRepresentation } from '../../representations';

describe('ComparisonRepresentation tests', () => 
{
    let profile: FullProfile;
    let rep: ComparisonRepresentation;
    beforeEach(async () => 
    {
        profile = await SemanticScholarSource.getInstance().fetchFullProfile('1679754');
        rep = new ComparisonRepresentation([profile]);

    }, 30000);
    it('checks fullProfiles', () => 
    {
        expect(rep.fullProfiles).toEqual([profile]);
    });
    it('checks if renderComparison works', () => 
    {
        rep.renderComparison();
        expect(rep.rowModels.length > 0).toEqual(true);
    });
});
