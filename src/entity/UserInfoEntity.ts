export interface UserInfoEntity{
    UserId: number;
    FullName: string;
    EmailAddress: string;
    PhoneNumber: string;
    Password: string;
    RoleId: number;
    fkStatusId: number;
    CountryId: number;
    GovernorateId: number;
    CountryName: string;
    CountryCodePrefix: string;
    CountryCodePrefixShort: string;
    CreateDate: string;
    fkCompanyId: number;
    UserProfileImage: "",
    DeviceToken: string;
    FkMachineType: number;
    Gender: number;
    DateOfBirth: string;
    AccessToken: string;
    PolicyExpiryDays: number;
    LineOfBusiness: number;

}