import { Schema, model, Document } from 'mongoose';

interface IImage extends Document {
    filename: string;
    path: string;
    createdAt: Date;
}

const imageSchema = new Schema<IImage>({
    filename: String,
    path: String,
    createdAt: { type: Date, default: Date.now() },
});

const Image = model<IImage>('Image', imageSchema);

export { Image };
