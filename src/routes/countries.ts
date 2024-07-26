import { Router } from 'express';
import multer from 'multer';

import {
    addCountry,
    deleteCountry,
    getCountries,
    getCountryById,
    updateCountry,
} from '../controllers/countries';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/images');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    },
});

const upload = multer({ storage: storage });

const router = Router();

router.get('/', getCountries);

router.get('/:id', getCountryById);

router.post('/', upload.single('image'), addCountry);

router.patch('/:id', updateCountry);

router.delete('/:id', deleteCountry);

export { router };
