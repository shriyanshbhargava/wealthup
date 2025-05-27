export interface IMeFunds {
    id: number
    folios: IMeFolio[]
}

export interface IMeFolio {
    folio_number: string
    schemes: IMeScheme[]
}

export interface IMeScheme {
    isin: string
    name: string
    type: string
    holdings: Holdings
    market_value: MarketValue
    invested_value: InvestedValue
    payout: Payout
    nav: Nav
}

export interface Holdings {
    as_on: string
    units: number
    redeemable_units: number
}

export interface MarketValue {
    as_on: string
    amount: number
    redeemable_amount: number
}

export interface InvestedValue {
    as_on: string
    amount: number
}

export interface Payout {
    as_on: string
    amount: number
}

export interface Nav {
    as_on: string
    value: number
}

export interface IInvestComponentProps {
    options: any; // Consider replacing `any` with a specific type
    redemption: string;
    setRedemption: any;
    withdrawAmount: any;
    setWithdrawAmount: (value: any) => void;
    activeSection: string;
    setShowButtons: (value: boolean) => void;
    setActiveRightPart: any;
    setAmount: (value: any) => void;
    amount: any;
    timePeriod: string;
    setTimePeriod: any;
    investmentType: string;
    setInvestmentType: any;
    activeRightPart: string;
    setSelectedFund: (value: any) => void; // Replace `any` with a specific fund type
    selectedFund: any; // Replace `any` with a specific fund type
    date?: string;
    setDate: any;
    access_token: string;
    installments?: string;
    setInstallments?: any;
    setStartMonth?: any;
    startMonth?: string;
    noOfInstallment?: string;
    setNoOfInstallment?: any;
    switchInTo: string;
    setSwitchInTo: any;
    switchFrom: string;
    setSwitchFrom: any;
    frequency?: string;
    setFrequency: any;
    setOpenMandateModal: (value: boolean) => void;
    isAuthSucess: boolean;
    approvedMandatesList?: any[]; // Replace `any` with a more specific type if possible
    setInstallmentDate: any;
    installmentDate?: string;
}

export interface IFundListProps {
    selectedFund?: any;
    setSelectedFund: (fund: any) => void;
    addingAmount?: any;
    setAddingAmount: (amount: any) => void;
    fundsData: any[];
    isEditable?: boolean;
    setIsEditable?: (editable: boolean) => void;
    onAmountChange?: (value: string, index: number) => void;
    onDelete?: (id: number) => void;
    totalAmount?: number;
    setFundsData: (funds: any) => void;
    investmentType?: string;
    frequency?: string;
    amount?: number;
    timePeriod?: string;
    installments?: number;
    activeSection?: string;
    folioNumber?: Record<string, string>;
    setFolioNumber?: any;
    myFunds?: any[];
    setMyFunds?: (funds: any[]) => void;
    access_token: string;
    withdrawAmount?: string;
    otpModal?: boolean;
    setOtpModal: (open: boolean) => void;
    openPaymentModal?: boolean;
    setOpenPaymentModal: (open: boolean) => void;
    orderOldId?: string;
    setOrderOldId: (id: string) => void;
    orderId?: any;
    setOrderId: (id: any) => void;
    mandatesList?: any;
    setMandatesList?: any;
    mandateIds?: any;
    setMandateIds?: any;
    setOpenMandateModal?: (open: boolean) => void;
    openMandateModal?: boolean;
    callAuth?: boolean;
    noOfInstallment?: number;
    startMonth?: string;
    installmentDate?: string;
}

