import { Profile } from '../models/profile/Profile';

export interface Observer {
    update(authorId: string): void;
}

/**
 * Abstract class responsible for building the Profiles for a given search query.
 */
export abstract class ProfileService implements Observer
{
    /**
     * Abstract method for making the implementing classes be able to build a profile
     * for a given search query
     * @param query - The string to query
     * @returns - The built profiles of the queried scholars
     */
    abstract build(query: string): Promise<Profile[]>;

    abstract update(authorId: string): void;
}
