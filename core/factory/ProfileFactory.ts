import { HIndex } from '../models/profile/HIndex'
import { I10Index } from '../models/profile/I10Index'
import { FullProfile, BasicProfile } from '../models/profile/Profile'

export class ProfileFactory {

    build(authorId: string):  FullProfile[] {
        let array: FullProfile[] = []
        array.push(new FullProfile(new BasicProfile(), new HIndex(0, 0), new I10Index(0, 0)))
        return array
    }
}