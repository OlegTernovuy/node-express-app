import { NextFunction, Request, Response } from 'express';

import { Country } from '../models/countryModel';

const getCountries = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const countries = await Country.find();
        res.status(200).json(countries);
    } catch (error) {
        next(error);
    }
};

const getCountryById = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { id } = req.params;
        const country = await Country.findById(id);
        if (country) {
            res.status(200).json(country);
        } else {
            res.status(404).json({ message: 'Country not found' });
        }
    } catch (error: any) {
        next(error);
    }
};

const searchCountry = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { search, sortBy } = req.query as {
            search?: string;
            sortBy?: 'asc' | 'desc';
        };
        const match = search
            ? {
                  $or: [
                      { country: { $regex: search, $options: 'i' } },
                      { capital: { $regex: search, $options: 'i' } },
                  ],
              }
            : {};
        const countries = await Country.aggregate([
            {
                $match: match,
            },
            {
                $sort: { country: sortBy === 'desc' ? -1 : 1 },
            },
        ]);
        res.status(200).json(countries);
    } catch (error) {
        next(error);
    }
};

const addCountry = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { country, capital } = req.body;
        const imageUrl = req.file
            ? `/public/images/${req.file.originalname}`
            : '';
        const newCountry = new Country({ country, capital, imageUrl });
        await newCountry.save();
        res.status(201).json(newCountry);
    } catch (error: any) {
        next(error);
    }
};

const updateCountry = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { id } = req.params;
        const { country, capital } = req.body;
        const updatedCountry = await Country.findByIdAndUpdate(
            id,
            {
                country,
                capital,
            },
            { new: true }
        );
        if (updatedCountry) {
            res.status(200).json(updatedCountry);
        } else {
            res.status(404).json({ message: 'Country not found' });
        }
    } catch (error) {
        next(error);
    }
};

const deleteCountry = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { id } = req.params;
        const deletedCountry = await Country.findByIdAndDelete(id);
        if (deletedCountry) {
            res.status(200).json(deletedCountry);
        } else {
            res.status(404).json({ message: 'Country not found' });
        }
    } catch (error) {
        next(error);
    }
};

const countryWithDishes = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const countries = await Country.aggregate([
            {
                $lookup: {
                    from: 'dishes',
                    localField: '_id',
                    foreignField: 'country',
                    as: 'dishes',
                },
            },
            { $match: { dishes: { $not: { $size: 0 } } } },
            { $project: { country: 1, capital: 1, imageUrl: 1, dishes: 1 } },
        ]);
        res.status(200).json(countries);
    } catch (error) {
        next(error);
    }
};

export {
    getCountries,
    addCountry,
    getCountryById,
    updateCountry,
    deleteCountry,
    searchCountry,
    countryWithDishes,
};
