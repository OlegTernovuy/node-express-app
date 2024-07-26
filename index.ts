import express, { Request, Response, Application } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import multer from 'multer';

import { router } from './src/routes/countries';
import { Image } from './src/models/imageModel';

dotenv.config();

const app: Application = express();
const port = process.env.PORT || 4200;

mongoose
    .connect(
        'mongodb+srv://ternovuyo079:Xq4vxURbLycgb05X@country.sggw5pp.mongodb.net/'
    )
    .then(() => console.log('MongoDB conected successfully'))
    .catch((err) => console.log('MongoDB conected failed', err));

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/images');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    },
});

const upload = multer({ storage: storage });

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
    res.sendStatus(200);
});

app.post('/upload', upload.single('image'), async (req, res) => {
    if (!req.file) {
        return res.status(400).send('No image file uploaded');
    }

    const image = new Image({
        filename: req.file.originalname,
        path: req.file.path,
    });

    try {
        await image.save();
        res.status(200).send('Image uploaded and saved successfully');
    } catch (error) {
        res.status(500).send('Error saving image to the database');
    }
});

app.get('/api/images/:id', async (req, res) => {
    const image = await Image.findById(req.params.id);

    if (!image) return res.status(404).send('Image not found');

    res.sendFile(image.path, { root: './' });
});

app.use('/countries', router);

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
