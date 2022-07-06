import { DataSource } from '../datasources';
import { SemanticScholarSource } from '../datasources/SemanticScholarSource';
import { APIBasicAuthor } from '../models/API';
import { BasicProfile } from '../models/profile/BasicProfile';
import { ProfileService } from './ProfileService';



export class SearchResultsService extends ProfileService {
    private dataSource: DataSource = SemanticScholarSource.getInstance();
    private apiBasicAuthors: APIBasicAuthor[];
    private basicProfiles: BasicProfile[] = new Array<BasicProfile>;
    private pictureURL: string;
    async build(query: string): BasicProfile[] {
        this.apiBasicAuthors = await this.dataSource.fetchSearchResults(query);
        
        for(const basicAuthors of this.apiBasicAuthors){
            this.pictureURL = await this.dataSource.fetchPictureURL(basicAuthors.authorId);
            this.basicProfiles.push(new BasicProfile(basicAuthors.authorId, basicAuthors.name, basicAuthors.affiliations, +basicAuthors.citationCount, this.pictureURL));
        }
        return this.basicProfiles;
    }
}
