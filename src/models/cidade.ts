import { ObjectId } from "mongodb";

export default class Cidade{

    constructor(
       
        public provincia: string,
        public capital: string,
        public area: number,
        public population: number,
        public allergyName: string,
        public situacao: string,
        public casos_confirmados: number,
        public mortes_confirmadas: number,
        public recuperados: number

    ){}
}