import { Loading } from 'quasar';
import { useStorage } from '@vueuse/core';
import {
    SemanticScholarSource,
    SearchResultsPaginationFilter,
    WordsInTitleFilter,
    StudyFieldsFilter,
} from 'schala-core';
import { BasicProfile, SearchResultsModel, SearchFieldsOfStudy } from 'schala-core';
import { defineStore } from 'pinia';

export const searchResultsStore = defineStore({
    id: 'searchResultsPage',
    state: () => ({
        searchString: useStorage('searchString', ''),
        maxPage: 0,
        searchResultsModel: new SearchResultsModel(
            new Array<BasicProfile>(),
            new SearchResultsPaginationFilter(1, 15),
            new StudyFieldsFilter([]),
            [new WordsInTitleFilter('')],
        ),
    }),
    getters: {
        getSearchResultsShowingModel: (state) => state.searchResultsModel as SearchResultsModel,
    },
    actions: {
        updateFieldsOfStudy(): void 
        {
            const filterValue: string[] = [];
            for (const rfos of this.searchResultsModel.relatedFieldsOfStudy) 
            {
                if (rfos.isActive) filterValue.push(rfos.fieldOfStudy);
            }
            this.searchResultsModel.studyFieldsFilter.value = filterValue;
            this.searchResultsModel.paginationFilter.value = 1;

            this.searchResultsModel.applyAllFilters();
        },
        setWordsInTitleFilter(wordsInTitleFilter: string): void 
        {
            this.searchResultsModel.filters[0].value = wordsInTitleFilter;
            this.searchResultsModel.paginationFilter.value = 1;

            this.searchResultsModel.applyAllFilters();
        },
        async setSearchString(passedSearchString: string) 
        {
            Loading.show();
            this.searchResultsModel.filters[0].value = '';
            this.searchString = passedSearchString;
            let basicProfiles: BasicProfile[] = [];
            try 
            {
                basicProfiles = await SemanticScholarSource.getInstance().fetchSearchResults(passedSearchString);
                const relatedFieldsOfStudy: SearchFieldsOfStudy[] = new Array<SearchFieldsOfStudy>();
                for (const bp of basicProfiles) 
                {
                    if (bp.expertise.length === 0) continue;
                    if (
                        !relatedFieldsOfStudy.find(
                            (sfos: SearchFieldsOfStudy) => bp.expertise[0].name === sfos.fieldOfStudy,
                        )
                    ) 
                    {
                        relatedFieldsOfStudy.push(new SearchFieldsOfStudy(bp.expertise[0].name));
                    }
                }
                this.searchResultsModel.relatedFieldsOfStudy = relatedFieldsOfStudy;
                this.searchResultsModel.studyFieldsFilter.value = relatedFieldsOfStudy.map(
                    (rfos: SearchFieldsOfStudy) => rfos.fieldOfStudy,
                );
            }
            catch (error) 
            {
                Loading.hide();
                return;
            }

            this.searchResultsModel.basicProfiles = basicProfiles;
            this.searchResultsModel.query = passedSearchString;

            this.searchResultsModel.paginationFilter.value = 1;

            this.searchResultsModel.applyAllFilters();
            Loading.hide();
        },
        setSearchResultsShowingModel(model: SearchResultsModel) 
        {
            this.searchResultsModel = model;
        },
    },
});
