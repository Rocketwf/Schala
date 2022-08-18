import { Expertise, ExpertiseModel, ProfileExpertise, ViewName } from "../../../models"

let expertiseModel: ExpertiseModel;
let expertise: Expertise;
beforeAll(() => {
    expertiseModel = new ExpertiseModel(null, '', '', ViewName.ExpertiseCard, 8);
    expertise = new Expertise('', []);
})

describe('ExpertiseModel tests', () => {
    it('sets and returns correct expertise', () => 
    {
        let testExpertise: Expertise[] = [new Expertise('Computer Science', [new ProfileExpertise('Computer Science', 5)])]
        expertiseModel.expertise = testExpertise;
        expect(expertiseModel.expertise).toMatchObject(testExpertise);
    });
    it('sets and returns correct column width', () => 
    {
        let testCol = 10;
        expertiseModel.colWidth = testCol;
        expect(expertiseModel.colWidth).toBe(10);
    });
    it('sets and returns correct title', () => 
    {
        let testTitle = 'Test Title';
        expertiseModel.title = testTitle;
        expect(expertiseModel.title).toBe('Test Title');
    });
    it('sets and returns correct id', () => 
    {
        let testID = 'ABC123';
        expertiseModel.id = testID;
        expect(expertiseModel.id).toBe('ABC123');
    });
    it('sets and returns correct sub', () => 
    {
        let testSub = 'Test Sub';
        expertiseModel.sub = testSub;
        expect(expertiseModel.sub).toBe('Test Sub');
    });
    it('sets and returns correct view name', () => 
    {
        let testView = ViewName.ExpertiseCard;
        expertiseModel.viewName = testView;
        expect(expertiseModel.viewName).toBe(ViewName.ExpertiseCard);
    });
    it('sets and returns correct entries', () => 
    {
        let testExpertise: Expertise[] = [new Expertise('Computer Science', [new ProfileExpertise('Computer Science', 5)])]
        expertiseModel.expertise = testExpertise;
        expect(expertiseModel.entries).toBe(1);
    });
})

describe('Expertise tests', () => {
    it('sets and returns correct name', () => 
    {
        let testName: string = 'Test Name';
        expertise.name = testName;
        expect(expertise.name).toBe('Test Name');
    });
    it('sets and returns correct id', () => 
    {
        let testID: string = 'ABC123';
        expertise.id = testID;
        expect(expertise.id).toBe('ABC123')
    });
    it('sets and returns correct expertise', () => 
    {
        let testProfileExpertise: ProfileExpertise[] = [new ProfileExpertise('Computer Science', 10)];
        expertise.expertise = testProfileExpertise;
        expect(expertise.expertise).toMatchObject(testProfileExpertise);
    });
})