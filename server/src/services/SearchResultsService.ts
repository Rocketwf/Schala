import { BasicProfile } from '../models/profile/BasicProfile';
import { ProfileService } from './ProfileService';

export class SearchResultsService extends ProfileService {
    build(query: string): BasicProfile[] {
        query;
        return [{} as BasicProfile];
    }
}
