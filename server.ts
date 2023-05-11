import express from "express";
import { connectToDatabase } from "./src/services/database.service"
//import { analyticsRouter } from "./src/routes/analytics.routes"
import {allergiesRouter} from './src/routes/allergies.routes'
import {citiesRouter} from './src/routes/cities.routes'
import {populationRouter} from './src/routes/population.routes'
import { sanitarioRouter } from "./src/routes/sanitario.routes";
import cors from "cors";
import bodyParser from "body-parser";
import ejs from 'ejs';
import path from 'path'
/*
var logger = require('morgan');
var swaggerUi = require('swagger-ui-express');
var YAML = require('yamljs');
var swaggerDocument = YAML.load('swagger.yaml');
swaggerDocument.host = process.env.HOST_IP || "localhost:3000";
var scheme = process.env.SCHEME || "http";
swaggerDocument.schemes = [scheme];

*/
const app = express();


app.set('view engine', 'ejs');
// Set the views directory
app.set("views", path.join(__dirname, "views"));
app.use(bodyParser.json());




var api = "/api/v1";
connectToDatabase()
    .then(() => {
       
        app.use(cors())
       // app.use(api + "/analytics", analyticsRouter);
        app.use(api + "/sanitario", sanitarioRouter);
        app.use(api + "/allergies", allergiesRouter);
        app.use(api + "/cities", citiesRouter);
        app.use(api + "/population", populationRouter);
        //app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
        app.listen("4000", () => {
            console.log(`Server started at http://localhost:4000`);
        });
    })
    .catch((error: Error) => {
        console.error("Database connection failed", error);
        process.exit();
    });