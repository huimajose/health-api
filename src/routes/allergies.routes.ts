// External Dependencies
import express, { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { collections } from "../services/database.service";
import City from "../models/city";
import * as datalake from '../services/datalake'
// Global Config

export const allergiesRouter = express.Router();

allergiesRouter.use(express.json());

// GET all allergies in datalake
allergiesRouter.get("/",  async (_req: Request, res: Response) => {

    var getAllergyList = datalake.getAllergyList();

    getAllergyList.then(function(allergies){
        res.send({allergies: allergies});
    }).catch(function(err){
        res.sendStatus(500);
    })
});