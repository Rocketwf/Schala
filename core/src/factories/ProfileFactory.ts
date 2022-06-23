import { FullProfile } from '../models/profile/Profile'
import { HIndex } from '../models/profile/Profile'
import { I10Index } from '../models/profile/Profile'
export class ProfileFactory {

    build(authorId: string):  FullProfile[] {
        return {} as FullProfile[]
    }

    calculateHIndex(): HIndex {
        return null
    }

    calculateI10Index(): I10Index {
        return null
    }

    calculateSelfCitations(): number {
        return 0
    }

    calculateIndirectSelfCitations(): number {
        return 0
    }
}
