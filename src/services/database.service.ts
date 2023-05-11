// External Dependencies
import * as mongoDB from 'mongodb';
import * as dotenv from 'dotenv';
import City from '../models/city';
import Cidade from '../models/cidade';

// Global Variables
export const collections: { City?: mongoDB.Collection, Cidade?: mongoDB.Collection } = {}

// Initialize Connection
export async function connectToDatabase () {
    dotenv.config();
 
    const client: mongoDB.MongoClient = new mongoDB.MongoClient(process.env.DB_CONN_STRING);
            
    await client.connect();
        
    const db: mongoDB.Db = client.db(process.env.DB_NAME);
   
    const gamesCollection: mongoDB.Collection = db.collection(process.env.COLLECTION);
    const cidadeCollection: mongoDB.Collection = db.collection(process.env.CIDADE_COLLECTION);
 
  collections.City = gamesCollection;
  collections.Cidade = cidadeCollection;
       
         console.log(`Successfully connected to database: ${db.databaseName} and collection: ${gamesCollection.collectionName} and collection: ${cidadeCollection}`);
 }