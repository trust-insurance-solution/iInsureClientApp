export interface Data {
    ID: number;
    FullName: string;
    EmailAddress: string;
    PhoneNumber: string;
    Description: string;
    FkUserid: number;
    FkStatusid: number;
    CreateDate: Date;
}
export interface ContactUsRequest {
    Data: Data;
    Token: string;
    Language: string;
    LoggedInUserID: number;
    UserName: string;
}

