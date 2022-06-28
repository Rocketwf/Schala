import { BasicProfile, SearchResultsModel, Article } from '../../models';
import { Filter } from '../Filter';

export abstract class SearchResultsFilter<S> extends Filter<S, SearchResultsModel> {
    abstract apply(model: SearchResultsModel): void;
}

export class AffiliationFilter extends SearchResultsFilter<string> {
    apply(model: SearchResultsModel): void {
        const filtered: Array<BasicProfile> = model.basicProfiles.filter((profile: BasicProfile) => {
            return this.affiliationContainsSubstring(profile.affiliation, this.value).length !== 0;
        });
        model.basicProfiles = filtered;
    }

    private affiliationContainsSubstring(affiliations: Array<string>, substring: string): Array<string> {
        return affiliations.filter((element: string) => {
            if (element.indexOf(substring) !== -1) {
                return true;
            }
        });
    }
}

//temporary return to test if filtering works correctly
export class WordsInTitleFilter extends SearchResultsFilter<string> {
    apply(model: SearchResultsModel): void {
        const filtered: Array<BasicProfile> = model.basicProfiles.filter((profile: BasicProfile) => {
            // return this.titleContainsWord(profile.articles, this.value).length !== 0;
            return profile.name.charAt(0) === 'W';
        });
        model.basicProfiles = filtered;
    }

    // private titleContainsWord(articles: Array<Article>, word: string): Array<string> {
    //     const articleTitles: Array<string> = articles.map((article: Article) => article.title);
    //     return articleTitles.filter((element: string) => element.includes(word));
    // }
}
