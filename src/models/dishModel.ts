import mongoose, { Document, model, Schema } from 'mongoose';

interface IDishes extends Document {
    name: string;
    desc: string;
    country: mongoose.Types.ObjectId;
}

const dishesSchema: Schema = new Schema({
    name: { type: String, required: true },
    desc: { type: String, required: true },
    country: { type: mongoose.Types.ObjectId, ref: 'Country', required: true },
});

const Dishes = model<IDishes>('Dish', dishesSchema);

export { Dishes };
