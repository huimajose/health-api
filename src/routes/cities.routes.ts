// External Dependencies
import express, { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { collections } from "../services/database.service";
import City from "../models/city";
import * as datalake from '../services/datalake'
// Global Config

export const citiesRouter = express.Router();

citiesRouter.use(express.json());

// GET all cities in datalake
citiesRouter.get("/",  async (_req: Request, res: Response) => {

    var getCityList = datalake.getCityList();

    getCityList.then(function(cities){
        res.send({cities: cities});
    }).catch(function(err){
        res.sendStatus(500);
    })
});

