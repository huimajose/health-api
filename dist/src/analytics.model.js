"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const allergySchema = new mongoose_1.Schema({
    allergy: String,
    type: String,
    developed: [Number],
    outgrown: [Number],
});
const citySchema = new mongoose_1.Schema({
    city: String,
    population: Number,
    allergies: [allergySchema],
});
const City = (0, mongoose_1.model)('City', citySchema);
exports.default = City;
//# sourceMappingURL=analytics.model.js.map