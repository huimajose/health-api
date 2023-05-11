// External Dependencies
import express, { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { collections } from "../services/database.service";
import City from "../models/city";
import Cidade from "../models/cidade";
// Global Config



export async function getPopulation(): Promise<number[]> {
    const cidade = await collections.City.find({}).toArray();
    const populations: number[] = [];
  
    cidade.forEach((city) => {
      populations.push(city.population);
    });
  
    return populations;
  }

  export async function getCityList():  Promise<string[]>{
    const cidade = await collections.City.find({}).toArray();
    const cityList: string[] = [];

    cidade.forEach((city)=> {
        cityList.push(city.cities)
    });

    return cityList;
  }

  export async function getAllergyList(): Promise<string[]>{
    const cidade = await collections.City.find({}).toArray();
    const allergyList: string[] = [];

    cidade.forEach((city)=>{
        allergyList.push(city.allergies);
    });
    return allergyList;
  }

  export async function getPopulationStats(): Promise<string[]> {
    const cidade = await collections.Cidade.find({}, { projection: { _id: 0 } }).toArray();
    var populationStats: string[] = [];
  
    cidade.forEach((city) => {
      // process each city object
      populationStats.push(JSON.stringify(city));
    });
  
    return populationStats;
  }
  

  export async function getAllData(): Promise<any[]> {
    const cidades = await collections.Cidade.find().toArray();
  
    const cidadeList: any[] = [];
  
    cidades.forEach((cidade) => {
      if (cidade) { // check if the object is defined
        cidadeList.push(cidade);
      }
    });
  
    return cidadeList;
  }
  
  
  