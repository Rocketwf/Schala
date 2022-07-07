import { GoogleScholarScraperSource } from '../datasources/GoogleScholarScraperSource';

describe('findOrCreate method', () => {
    it('fetches author affiliation', async () => {
        console.log(await new GoogleScholarScraperSource().fetchAuthor('f tichy'));
    }, 30000);
});
