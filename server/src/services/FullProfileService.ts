import { FullProfile } from '../models/profile/FullProfile';
import { ProfileService } from './ProfileService';

export class FullProfileService extends ProfileService {
    build(query: string): FullProfile[] {
        query;
        return [{} as FullProfile];
    }
}
