import { Request, Response } from 'express';

import { Country } from '../models/countryModel';

const getCountries = async (req: Request, res: Response): Promise<void> => {
    try {
        const countries = await Country.find();
        res.status(200).json(countries);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching countries', error });
    }
};

const getCountryById = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const country = await Country.findById(id);
        if (country) {
            res.status(200).json(country);
        } else {
            res.status(404).json({ message: 'Country not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error fetching country', error });
    }
};

const addCountry = async (req: Request, res: Response): Promise<void> => {
    try {
        const { country, capital } = req.body;
        const imageUrl = req.file ? `/public/${req.file.fieldname}` : '';
        const newCountry = new Country({ country, capital, imageUrl });
        await newCountry.save();
        res.status(201).json(newCountry);
    } catch (error) {
        res.status(500).json({ message: 'Error adding country', error });
    }
};

const updateCountry = async (req: Request, res: Response): Promise<void> => {
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
        res.status(500).json({ message: 'Error updating country', error });
    }
};

const deleteCountry = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const deletedCountry = await Country.findByIdAndDelete(id);
        if (deletedCountry) {
            res.json(deletedCountry);
        } else {
            res.status(404).json({ message: 'Country not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error deleting country', error });
    }
};

export {
    getCountries,
    addCountry,
    getCountryById,
    updateCountry,
    deleteCountry,
};
