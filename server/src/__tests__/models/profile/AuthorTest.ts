import { Author } from '../../../models/profile/Author';

const author: Author = new Author('123123', 'Georgios', 12, 23);
describe('Author test', () =>
    it('test author ', () => 
    {
        expect(author.id == '123123' && author.jointPublicationCount == 12 && author.hIndex == 23 && author.name == 'Georgios').toBe(true);
    }
    )
);

describe('Author test', () =>
    it('set author attributes', () => 
    {
        const tempCoAuthor: Author = author;
        tempCoAuthor.hIndex=0;
        tempCoAuthor.id='';
        tempCoAuthor.jointPublicationCount=0;
        tempCoAuthor.name='';
        expect(tempCoAuthor.id == '' && tempCoAuthor.jointPublicationCount == 0 && tempCoAuthor.hIndex == 0 && tempCoAuthor.name == '').toBe(true);
    }
    )
);