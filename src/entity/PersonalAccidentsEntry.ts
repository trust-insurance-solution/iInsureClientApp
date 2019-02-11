export interface Data {
    ID: number;
    FullName: string;
    FkTotalamountofinsuredmaximum: number;
    DateOfBirth: string;
    AnyChronicCasesOrPerExistingCases: string;
    FkPeriodofcover: number;
    FkCountryresidence: number;
    FkNationality: number;
    FkCreatedByUserId: number;
    FkTransactionId: number;
    NumberOfUnit: number;
}

export interface PersonalAccidentsEntryRequest {
    Data: Data;
    Token: string;
    Language: string;
    LoggedInUserID: number;
    UserName: string;
}