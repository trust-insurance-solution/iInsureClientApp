export interface DestinationId {
    FkDestinationId: number;
}

export interface ListTravelEntry {
    ID: number;
    FullName: string;
    DateOfBirth: string;
    Nationality: number;
    CountryOfResidence: number;
    PictureOfPassport: string;
    PassportExpireDate: string;
    PassportNumber: string;
}

export interface Data {
    DestinationIds: DestinationId[];
    StartDateJourney: string;
    EndDateJourney: string;
    DestinationTitle: string;
    FkCreatedByUserId: number;
    listTravelEntry: ListTravelEntry[];
    FkTransactionId: number;
}

export interface TravelEntryRequest {
    Data: Data;
    Token: string;
    Language: string;
    LoggedInUserID: number;
    UserName: string;
}
