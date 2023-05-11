//External Dependencies
import express, {Request,Response } from "express";
import { ObjectId } from "mongodb";
import { collections } from "../services/database.service";
import Cidade from "../models/cidade";
import * as datalake from '../services/datalake'


//Globar config
export const sanitarioRouter = express.Router();

sanitarioRouter.use(express.json());



// Get all data from database
sanitarioRouter.get("/", async (_req: Request, res: Response)=> {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    var getPopulationStats = datalake.getPopulationStats();

    getPopulationStats.then(function (populationStat) {
        res.send(populationStat[0])
    }).catch(function(err) {
        console.log(err);
        res.sendStatus(500);  
    })
})

//Get home page
sanitarioRouter.get("/home", async (_req: Request, res: Response) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  
    try {
      const populationStats = await datalake.getAllData();
  
      const mappedPopulationStats = populationStats.map((city) => {
        return {
          //type: "Feature",
          properties: city.features,
          //geometry: { type: "Point", coordinates: [city.longitude, city.latitude] },
        };
      });
  
      res.render("./sanitario/home", {cidades: mappedPopulationStats});
      //res.send(mappedPopulationStats);
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  });
  



/*

sanitarioRouter.post("/", async (req: Request, res: Response) => {
    try {
      const { provincia, capital, area, population, allergyName, situacao, casos_confirmados, mortes_confirmadas, recuperados } = req.body;
  
      // Create a new instance of the Cidade model
      const cidade = new Cidade(provincia, capital, area, population, allergyName, situacao, casos_confirmados, mortes_confirmadas, recuperados);
  
      // Save the new instance to the database
      await cidade.save();
  
      // Send a response with the saved instance
      res.status(201).json(cidade);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal server error");
    }
  });
  */