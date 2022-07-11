import { BasicProfile, FullProfile } from '../models';

/**
 * Interface defining the methods which will fetch search results and full profiles.
 */
export interface DataSource {
    /**
     * Method for fetching the search results according the given query.
     * @param query - query string
     */
    fetchSearchResults(query: string): Promise<BasicProfile[]>;

    /**
     * Method for fetching full profiles of scholars according the given profile id.
     * @param profileId - profile id of the scholars
     */
    fetchFullProfile(profileId: string): Promise<FullProfile>;
}
