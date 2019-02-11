export interface Data {
    ID: number;
    FullName: string;
    IsDriverMoreThan18Years: boolean;
    FkTypeofvehicle: number;
    FkSubtypeofvehicle: number;
    YearMadeOfVehicle: string;
    MarketValueOfVehicle: number;
    VehicleLicensePlateNumber: string;
    VinnumberChassisnumber: string;
    EngineNumber: string;
    FkCreatedByUserId: number;
    FkTransactionId: number;
}

export interface MotorEntryRequest {
    Data: Data;
    Token: string;
    Language: string;
    LoggedInUserID: number;
    UserName: string;
}



