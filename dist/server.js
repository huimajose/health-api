"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const database_service_1 = require("./src/services/database.service");
//import { analyticsRouter } from "./src/routes/analytics.routes"
const allergies_routes_1 = require("./src/routes/allergies.routes");
const cities_routes_1 = require("./src/routes/cities.routes");
const population_routes_1 = require("./src/routes/population.routes");
const sanitario_routes_1 = require("./src/routes/sanitario.routes");
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const path_1 = __importDefault(require("path"));
/*
var logger = require('morgan');
var swaggerUi = require('swagger-ui-express');
var YAML = require('yamljs');
var swaggerDocument = YAML.load('swagger.yaml');
swaggerDocument.host = process.env.HOST_IP || "localhost:3000";
var scheme = process.env.SCHEME || "http";
swaggerDocument.schemes = [scheme];

*/
const app = (0, express_1.default)();
app.set('view engine', 'ejs');
// Set the views directory
app.set("views", path_1.default.join(__dirname, "views"));
app.use(body_parser_1.default.json());
var api = "/api/v1";
(0, database_service_1.connectToDatabase)()
    .then(() => {
    app.use((0, cors_1.default)());
    // app.use(api + "/analytics", analyticsRouter);
    app.use(api + "/sanitario", sanitario_routes_1.sanitarioRouter);
    app.use(api + "/allergies", allergies_routes_1.allergiesRouter);
    app.use(api + "/cities", cities_routes_1.citiesRouter);
    app.use(api + "/population", population_routes_1.populationRouter);
    //app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
    app.listen("4000", () => {
        console.log(`Server started at http://localhost:4000`);
    });
})
    .catch((error) => {
    console.error("Database connection failed", error);
    process.exit();
});
//# sourceMappingURL=server.js.map