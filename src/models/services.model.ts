import { Schema, Document, Types, model } from "mongoose";

interface ServiceModel {
    _id?: string;
    name?: string;
    description?: string;
    createdAt?: string;
    updatedAt?: string;
}

const serviceSchema = new Schema<ServiceModel>({
    name: {
        type: String,
        unique: true
    },
    description: String
}, { timestamps: true });

export type ServiceDocument = Document<Types.ObjectId> & ServiceModel;

export const Service = model('services', serviceSchema);