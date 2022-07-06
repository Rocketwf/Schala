import { FullProfile } from '../models/profile';
import { RowModel } from '../models/viewmodels';
import { ObjectSeriesChartModel } from '../models';
import { ExpertiseModel } from '../models/simplecardmodel/ExpertiseModel';
export class ProfileRepresentation {
    private _fullProfile: FullProfile;
    private _rowModels: Array<RowModel>;
    constructor(_fullProfile: FullProfile) {
        this._fullProfile = _fullProfile;
        this._rowModels = new Array<RowModel>();
    }
    renderProfile(): void {
        this.createFirstRow();
        this.createSecondRow();
        this.createThirdRow();
        this.createFourthRow();
    }

    public get fullProfile(): FullProfile {
        return this._fullProfile;
    }
    public set fullProfile(fullProfile: FullProfile) {
        this._fullProfile = fullProfile;
    }
    public get rowModels(): RowModel[] {
        return this._rowModels;
    }

    private createPublicationsByYearCard(): ObjectSeriesChartModel {
        return null;
    }

    private createPublicationsByVenueCard(): ObjectSeriesChartModel {
        return null;
    }

    private createMostCitedScholarsCard(): ObjectSeriesChartModel {
        return null;
    }

    private createMostFrequentCoAuthorsCard(): ObjectSeriesChartModel {
        return null;
    }

    private createExpertiseCard(): ExpertiseModel {
        return null;
    }

    //This method creates the first row which renders the following:
    //Publications by year
    //Publications by venue
    //Citations by year
    private createFirstRow(): void {
        return;
    }
    //This method creates the second row which renders the following:
    //Most cited scholars
    //Citation breakdown
    //Most frquent co-authors
    private createSecondRow(): void {
        return;
    }
    //This method creates the third row which renders the following:
    //Co-Authors with highest h-index
    //Expertise
    private createThirdRow(): void {
        return;
    }
    //This method creates the fourth row which renders the articles
    private createFourthRow(): void {
        return;
    }
}
