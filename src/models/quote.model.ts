import {model, Schema, Types, Document} from "mongoose";

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
    title?: string;
    invoiceNumber: string;
    date: string;
    designation?: string;
    currency?: string;
    client?: {
        name: string;
        email?: string;
        phoneNumber?: string;
        company?: string;
    }
    totalCosts?: number;
    items?: QuoteItemModel[],
    createAt?: string;
    updatedAt?: string;
}

const quoteSchema = new Schema<QuoteModel>({
    id: String,
    title: String,
    invoiceNumber: String,
    date: String,
    designation: String,
    client: {
        name: String,
        email: String,
        phoneNumber: String,
        company: String,
    },
    currency: String,
    totalCosts: Number,
    items: Array,
    createAt: String,
    updatedAt: String,
}, {
    timestamps: true
});

const Quote = model('quotes', quoteSchema);

export type QuoteDocument = Document<Types.ObjectId> & QuoteModel

export default Quote;