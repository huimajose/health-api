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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.analyticsRouter = void 0;
// External Dependencies
const express_1 = __importDefault(require("express"));
const mongodb_1 = require("mongodb");
const database_service_1 = require("../services/database.service");
// Global Config
exports.analyticsRouter = express_1.default.Router();
exports.analyticsRouter.use(express_1.default.json());
//GET ALL DOCUMENTS
exports.analyticsRouter.get("/", (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cidade = (yield database_service_1.collections.City.find({}).toArray());
        res.status(200).send(cidade);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
}));
exports.analyticsRouter.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const id = (_a = req === null || req === void 0 ? void 0 : req.params) === null || _a === void 0 ? void 0 : _a.id;
    try {
        const query = { _id: new mongodb_1.ObjectId(id) };
        const cidade = (yield database_service_1.collections.City.findOne(query));
        if (cidade) {
            res.status(200).send(cidade);
        }
    }
    catch (error) {
        res.status(404).send(`Unable to find matching document with id: ${req.params.id}`);
    }
}));
// POST
exports.analyticsRouter.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newGame = req.body;
        const result = yield database_service_1.collections.City.insertOne(newGame);
        result
            ? res.status(201).send(`Successfully created a new game with id ${result.insertedId}`)
            : res.status(500).send("Failed to create a new game.");
    }
    catch (error) {
        console.error(error);
        res.status(400).send(error.message);
    }
}));
// PUT
exports.analyticsRouter.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const id = (_b = req === null || req === void 0 ? void 0 : req.params) === null || _b === void 0 ? void 0 : _b.id;
    try {
        const updatedGame = req.body;
        const query = { _id: new mongodb_1.ObjectId(id) };
        const result = yield database_service_1.collections.City.updateOne(query, { $set: updatedGame });
        result
            ? res.status(200).send(`Successfully updated game with id ${id}`)
            : res.status(304).send(`Game with id: ${id} not updated`);
    }
    catch (error) {
        console.error(error.message);
        res.status(400).send(error.message);
    }
}));
// DELETE
exports.analyticsRouter.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    const id = (_c = req === null || req === void 0 ? void 0 : req.params) === null || _c === void 0 ? void 0 : _c.id;
    try {
        const query = { _id: new mongodb_1.ObjectId(id) };
        const result = yield database_service_1.collections.City.deleteOne(query);
        if (result && result.deletedCount) {
            res.status(202).send(`Successfully removed game with id ${id}`);
        }
        else if (!result) {
            res.status(400).send(`Failed to remove game with id ${id}`);
        }
        else if (!result.deletedCount) {
            res.status(404).send(`Game with id ${id} does not exist`);
        }
    }
    catch (error) {
        console.error(error.message);
        res.status(400).send(error.message);
    }
}));
//# sourceMappingURL=analytics.routes.js.map