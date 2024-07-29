import { Router } from 'express';

import {
    addCountry,
    countryWithDishes,
    deleteCountry,
    getCountries,
    getCountryById,
    searchCountry,
    updateCountry,
} from '../controllers/countriesController';

import { upload } from '../utils/imageStorege';

const countryRoutes = Router();

countryRoutes.get('/', getCountries);

countryRoutes.get('/countryWithDishes', countryWithDishes);

countryRoutes.get('/search', searchCountry);

countryRoutes.get('/:id', getCountryById);

countryRoutes.post('/', upload.single('images'), addCountry);

countryRoutes.patch('/:id', updateCountry);

countryRoutes.delete('/:id', deleteCountry);

export { countryRoutes };
