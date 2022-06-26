import { Profile } from '../models/profile';

export interface Factory {
    build(query: string): Profile[];
}
