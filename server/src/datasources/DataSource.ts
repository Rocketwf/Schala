import { APIBasicAuthor, APIPaper, APIAuthor } from '../models/API';
/**
 * An interface whose users are responsible for implementing the fetching 
 * of scholar information from their corresponding databases or sources.
 */
export interface DataSource {
    /**
     * Method responsible for fetching the profiles for a given search query
     * @param query - The user profile query to search for
     * @returns search results - A promise of a list of APIBasicAuthor profiles
     */
    fetchSearchResults(query: string): Promise<APIBasicAuthor[]>;
    /**
     * Method responsible for fetching the profiles for a given author ID
     * @param authorId - The author with the ID being queried
     * @returns author - A promise of a APIAuthor profile
     */
    fetchAuthor(authorId: string): Promise<APIAuthor>;
    /**
     * Method responsible for fetching the article informations for given articles
     * @param paperIds - The papers being searched for
     * @returns papers - A promise of a list of APIPaper articles
     */
    fetchPapers(paperIds: string[]): Promise<APIPaper[]>;
}
