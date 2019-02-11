export interface Image {
    ImageData: string;
}

export interface Data {
    ID: number;
    FullName: string;
    NationalID: number;
    Fk_SomeInsured: number;
    IsApartment: boolean;
    SizeOfApartmentOrVilla: number;
    DetailedLocation: string;
    NumberOfFloorsIfVilla: number;
    WhichFloorIfApartment: number;
    HowManyFloors: number;
    DateCreatedApartmentOrVilla: string;
    FkCreatedByUserId: number;
    NumberOFRooms: number;
    IsRented: boolean;
    IsOccuied: boolean;
    Email: string;
    Telephone: string;
    FkTransactionId: number;
    Images: Image[];
}

export interface HomeEntryRequest {
    Data: Data;
    Token: string;
    Language: string;
    LoggedInUserID: number;
    UserName: string;
}