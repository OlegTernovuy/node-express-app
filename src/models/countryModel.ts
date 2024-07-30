import { Schema, model, Document } from 'mongoose';

interface ICountry extends Document {
    country: string;
    capital: string;
    imageUrl: string;
}

const countrySchema = new Schema<ICountry>({
    country: { type: String, required: true },
    capital: { type: String, required: true },
    imageUrl: { type: String, required: false },
});

const Country = model<ICountry>('Country', countrySchema);

export { Country };
