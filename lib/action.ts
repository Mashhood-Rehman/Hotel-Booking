"use server"
import { PrismaClient } from '@prisma/client';
import {  BookingStatus } from '@prisma/client/wasm';

const prisma = new PrismaClient()

export async function createAccomodation(data : {type :  'hotel' | 'apartment' , name: string , city: string , price : string  , status?:BookingStatus}) {
    try {
        const accomodation = await prisma[data.type].create({
            data : {
                name : data.name,
                city : data.city,
                price: data.price,
                status : data.status,
            }
        })
        return accomodation
    } catch (error) {
        console.error('Error creating accommodation:', error);
    throw new Error('Failed to create accommodation');
        
    }
}


export async function searchAccomodation (city : string  , type: 'hotel' | 'apartment') {
    try {
        const accommodation = await prisma[type].findMany({
            where : ({
                city: city
            })
        })
        if (accommodation.length === 0) {
            return { message: `No ${type}s found in ${city}.` };
          }
      
        return accommodation
    } catch (error) {
        console.error('Error fetching accommodations:', error);
        throw new Error('Failed to fetch accommodations');       
    }
}
export default prisma;
