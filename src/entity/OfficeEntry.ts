export interface Image {
    ImageData: string;
}

export interface Data {
    ID: number;
    FullName: string;
    NationalID: number;
    Fk_SomeInsured: number;
    SizeOfOfficeOrVilla: number;
    DetailedLocation: string;
    NumberOfFloorsIfVilla: number;
    WhichFloorIfApartment: number;
    HowManyFloors: number;
    DateApartmentOrVillaBuilt: string;
    FkCreatedByUserId: number;
    NumberOFRooms: number;
    IsRented: boolean;
    IsOccuied: boolean;
    Email: string;
    Telephone: string;
    CompanyRegistrationNumber: string;
    Occupancy: string;
    IsAvailability: boolean;
    NumberOfEmployees: number;
    FkTransactionId: number;
    Images: Image[];
}

export interface OfficeEntryRequest {
    Data: Data;
    Token: string;
    Language: string;
    LoggedInUserID: number;
    UserName: string;
}



