"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sanitarioRouter = void 0;
//External Dependencies
const express_1 = __importDefault(require("express"));
const datalake = __importStar(require("../services/datalake"));
//Globar config
exports.sanitarioRouter = express_1.default.Router();
exports.sanitarioRouter.use(express_1.default.json());
// Get all data from database
exports.sanitarioRouter.get("/", (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    var getPopulationStats = datalake.getPopulationStats();
    getPopulationStats.then(function (populationStat) {
        res.send(populationStat[0]);
    }).catch(function (err) {
        console.log(err);
        res.sendStatus(500);
    });
}));
//Get home page
exports.sanitarioRouter.get("/home", (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    try {
        const populationStats = yield datalake.getAllData();
        const mappedPopulationStats = populationStats.map((city) => {
            return {
                //type: "Feature",
                properties: city.features,
                //geometry: { type: "Point", coordinates: [city.longitude, city.latitude] },
            };
        });
        res.render("./sanitario/home", { cidades: mappedPopulationStats });
        //res.send(mappedPopulationStats);
    }
    catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}));
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
//# sourceMappingURL=sanitario.routes.js.map