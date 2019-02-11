export class OffersListResponse {
    public lstCompanyListResult: CompanyListResult[];
    public lstMedicalCoverageListResult: MedicalCoverageListResult[];
    public lstOtherCoverageListResult: OtherCoverageListResult[];
    public PolicyPrice: number;
    public PolicyURL: string;
    public PolicyURL_URL: string;
}
export class CompanyListResult {
    public PlanId: number;
    public CompanyId: number;
    public CompanyName: number;
    public PlanDetailId: number;
    public SignatureFilePath: string;
    public PlanName: string;
    public Rate: number;
    public LogoFilePath: string;
    public PDFFilePath: string;
    public RateWithCurrency: string;
}
export class MedicalCoverageListResult {
    public MedicalCoverage: string;
    public Limit: string;
    public Excess: string;
}
export class OtherCoverageListResult {
    public MedicalCoverage: string;
    public Limit: string;
    public Excess: string;
}
export class PlanToTransaction {
    public PlanDetailId: number;
    public TransactionId: number;
    public LineOfBusiness: number;
    public CompanyId: number;
}