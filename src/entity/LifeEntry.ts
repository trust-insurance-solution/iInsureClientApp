
export interface Data {
    ID: number;
    FullName: string;
    FkTotalamountofinsured: number;
    DateOfBirth: string;
    AnyChronicCasesOrPerExistingCases: string;
    FkPeriodofcover: number;
    FkCreatedByUserId: number;
    FkTransactionId: number;
    NumberOfUnit: number;
}

export interface LifeEntryRequest {
    Data: Data;
    Token: string;
    Language: string;
    LoggedInUserID: number;
    UserName: string;
}


