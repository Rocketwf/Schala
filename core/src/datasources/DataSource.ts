import { BasicProfile, FullProfile } from '../models';

export interface DataSource {
    fetchSearchResults(query: string): Promise<BasicProfile[]>;
    fetchFullProfile(profileId: string): Promise<FullProfile>;
}
