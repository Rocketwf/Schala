import { FullProfile } from '../models/profile/Profile'
import SemanticScholarSource from "../datasources/SemanticScholarSource"

export class ProfileFactory {

    //TODO: Fix Promise
    build(authorId: string):  FullProfile[] {
        let semantic = SemanticScholarSource.getInstance()
        let authorIds: Promise<string[]> = semantic.fetchAuthorIds(authorId)

        return {} as FullProfile[]
    }
}
