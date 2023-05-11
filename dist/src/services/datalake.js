"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllData = exports.getPopulationStats = exports.getAllergyList = exports.getCityList = exports.getPopulation = void 0;
const database_service_1 = require("../services/database.service");
// Global Config
function getPopulation() {
    return __awaiter(this, void 0, void 0, function* () {
        const cidade = yield database_service_1.collections.City.find({}).toArray();
        const populations = [];
        cidade.forEach((city) => {
            populations.push(city.population);
        });
        return populations;
    });
}
exports.getPopulation = getPopulation;
function getCityList() {
    return __awaiter(this, void 0, void 0, function* () {
        const cidade = yield database_service_1.collections.City.find({}).toArray();
        const cityList = [];
        cidade.forEach((city) => {
            cityList.push(city.cities);
        });
        return cityList;
    });
}
exports.getCityList = getCityList;
function getAllergyList() {
    return __awaiter(this, void 0, void 0, function* () {
        const cidade = yield database_service_1.collections.City.find({}).toArray();
        const allergyList = [];
        cidade.forEach((city) => {
            allergyList.push(city.allergies);
        });
        return allergyList;
    });
}
exports.getAllergyList = getAllergyList;
function getPopulationStats() {
    return __awaiter(this, void 0, void 0, function* () {
        const cidade = yield database_service_1.collections.Cidade.find({}, { projection: { _id: 0 } }).toArray();
        var populationStats = [];
        cidade.forEach((city) => {
            // process each city object
            populationStats.push(JSON.stringify(city));
        });
        return populationStats;
    });
}
exports.getPopulationStats = getPopulationStats;
function getAllData() {
    return __awaiter(this, void 0, void 0, function* () {
        const cidades = yield database_service_1.collections.Cidade.find().toArray();
        const cidadeList = [];
        cidades.forEach((cidade) => {
            if (cidade) { // check if the object is defined
                cidadeList.push(cidade);
            }
        });
        return cidadeList;
    });
}
exports.getAllData = getAllData;
//# sourceMappingURL=datalake.js.map