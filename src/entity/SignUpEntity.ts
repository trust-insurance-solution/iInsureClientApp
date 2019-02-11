export interface Data {
     UserId: number;
     FullName: string;
     EmailAddress: string;
     PhoneNumber: string;
     Password: string;
     RoleId: number;
     fkStatusId: number;
     CountryId: number;
     CountryName: string;
     CountryCodePrefix: string;
     CountryCodePrefixShort: string;
     CreateDate: Date;
     fkCompanyId: number;
     UserProfileImage: string;
     DeviceToken: string;
     FkMachineType: number;
     Gender: number;
     AccessToken: string;
     PolicyExpiryDate: number;
 }

 export interface SignUpEntity {
     Data: Data;
     Token: string;
     Language: string;
     LoggedInUserID: number;
     UserName: string;
 }