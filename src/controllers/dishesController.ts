import { NextFunction, Request, Response } from 'express';

import { Dishes } from '../models/dishModel';

const getDishes = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const dishes = await Dishes.find().populate('country');
        res.status(200).json(dishes);
    } catch (error) {
        next(error);
    }
};

const getDishesByCountryId = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { countryId } = req.params;
        const dishes = await Dishes.find({ country: countryId }).populate(
            'country'
        );
        res.status(200).json(dishes);
    } catch (error) {
        next(error);
    }
};

const addDishes = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { name, country, desc } = req.body;
        const newDish = new Dishes({ name, country, desc });
        await newDish.save();
        res.status(201).json(newDish);
    } catch (error: any) {
        next(error);
    }
};

const updateDishes = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { id } = req.params;
        const { name, desc, country } = req.body;
        const updatedDishes = await Dishes.findByIdAndUpdate(
            id,
            {
                name,
                desc,
                country,
            },
            { new: true }
        );
        if (updatedDishes) {
            res.status(200).json(updatedDishes);
        } else {
            res.status(404).json({ message: 'Dishes not found' });
        }
    } catch (error) {
        next(error);
    }
};

const deleteDishes = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { id } = req.params;
        const deletedDishes = await Dishes.findByIdAndDelete(id);
        if (deletedDishes) {
            res.status(200).json(deletedDishes);
        } else {
            res.status(404).json({ message: 'Dishes not found' });
        }
    } catch (error) {
        next(error);
    }
};

export {
    getDishes,
    getDishesByCountryId,
    addDishes,
    updateDishes,
    deleteDishes,
};
