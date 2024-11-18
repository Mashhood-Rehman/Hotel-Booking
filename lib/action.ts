"use server"
import { PrismaClient } from '@prisma/client';
import {  BookingStatus } from '@prisma/client/wasm';

const prisma = new PrismaClient()



enum AccommodationType {
    HOTEL = 'hotel',
    APARTMENT = 'apartment'
  }

export async function createAccomodation(data : {type :  'hotel' | 'apartment' , name: string , city: string , price : string  , status?:BookingStatus ,  startDate: string, endDate: string}) {
    try {
        const accomodation = await prisma[data.type].create({
            data : {
                name : data.name,
                city : data.city,
                price: data.price,
                status : data.status,
                startDate: new Date(data.startDate),  
                endDate: new Date(data.endDate),      // Ensure endDate is a Date object
            }
        })
        return accomodation
    } catch (error) {
        console.error('Error creating accommodation:', error);
    throw new Error('Failed to create accommodation');
        
    }
}


 export async function searchAccomodation(city: string, type: AccommodationType) {
  try {
    let accommodation;

    if (type === AccommodationType.HOTEL) {
      accommodation = await prisma.hotel.findMany({
        where: {
          city: city,
        },
      });
    } else if (type === AccommodationType.APARTMENT) {
      accommodation = await prisma.apartment.findMany({
        where: {
          city: city,
        },
      });
    }

    if (!accommodation || accommodation.length === 0) {
      return { message: `No ${type}s found in ${city}.` };
    }

    return accommodation;
  } catch (error) {
    console.error('Error fetching accommodations:', error);
    throw new Error('Failed to fetch accommodations');
  }
}
export default prisma;
