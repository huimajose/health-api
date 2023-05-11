// External Dependencies
import express, { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { collections } from "../services/database.service";
import City from "../models/city";
import * as datalake from '../services/datalake'
// Global Config

export const populationRouter = express.Router();

populationRouter.use(express.json());

// GET all population in datalake
populationRouter.get("/", async (_req: Request, res: Response) => {

    var getTotalPopulation = datalake.getPopulation();

    getTotalPopulation.then(function(population){
        res.send({population:population})
    }).catch(function(err){
        console.log(err);
        res.sendStatus(500);
    })
})
