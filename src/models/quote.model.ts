export interface QuoteItemModel {
    id?: number;
    name: string;
    description: string;
    costPerPerson?: string;
    numberOfPersonnel?: number;
    totalCost?: number;
    duration?: number;
}

export interface QuoteModel {
    id?: string;
    _id?: string;
    invoiceNumber: string;
    date: string;
    designation: string;
    client: {
        name: string;
        email?: string;
        phoneNumber?: string;
        company?: string;
    }
    totalCosts: number;
    items: QuoteItemModel[],
    createAt: string;
    updatedAt: string;
}
