import { ObjectId } from "mongodb";

export default class City{

    constructor(
        public city: string,
        public population: number

    ){}
}