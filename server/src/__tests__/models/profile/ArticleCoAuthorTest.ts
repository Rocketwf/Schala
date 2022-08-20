import { ArticleCoAuthor } from '../../../models/profile/ArticleCoAuthor';
const coAuthor: ArticleCoAuthor = new ArticleCoAuthor('123123', 'Walter Tichy');

describe('CoAuthor test', () =>
    it('check coAuthor attributes', () => 
    {
        expect(coAuthor.id == '123123' && coAuthor.name == 'Walter Tichy').toBe(true);
    }
    )
);

describe('CoAuthor test', () =>
    it('set coAuthor attributes', () => 
    {
        const tempCoAuthor: ArticleCoAuthor = coAuthor;
        tempCoAuthor.id = '';
        tempCoAuthor.name = '';
        expect(tempCoAuthor.id == '' && tempCoAuthor.name == '').toBe(true);
    }
    )
);