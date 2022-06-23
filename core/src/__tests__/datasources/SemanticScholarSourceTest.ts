import { SemanticScholarSource } from '../../datasources'

describe('findOrCreate method', () => {
        beforeAll(async () => {
        })

        it('HIndex of tichy should be 3', async () => {
          await SemanticScholarSource.getInstance().fetchHIndex('1679754').then(data => {
            expect(data).toBe(3)
          })
        })
    })
