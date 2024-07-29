import { Router } from 'express';

import {
    addCountry,
    deleteCountry,
    getCountries,
    getCountryById,
    updateCountry,
} from '../controllers/countries';

import { upload } from '../utils/imageStorege';

const router = Router();

router.get('/', getCountries);

router.get('/:id', getCountryById);

router.post('/', upload.single('images'), addCountry);

router.patch('/:id', updateCountry);

router.delete('/:id', deleteCountry);

export { router };
