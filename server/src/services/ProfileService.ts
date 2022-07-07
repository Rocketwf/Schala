import { Profile } from '../models/profile/Profile';

export abstract class ProfileService {
    abstract build(query: string): Promise<Profile[]>;
}
