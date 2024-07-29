import { Router } from 'express';

import {
    addDishes,
    deleteDishes,
    getDishes,
    getDishesByCountryId,
    updateDishes,
} from '../controllers/dishesController';

const dishesRoutes = Router();

dishesRoutes.get('/dishes', getDishes);

dishesRoutes.get('/dishes/country/:countryId', getDishesByCountryId);

dishesRoutes.post('/dishes', addDishes);

dishesRoutes.patch('/dishes/:id', updateDishes);

dishesRoutes.delete('/dishes/:id', deleteDishes);

export { dishesRoutes };
