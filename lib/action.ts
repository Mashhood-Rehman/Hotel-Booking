


"use server"
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()

enum AccommodationType {
    HOTEL = 'hotel',
    APARTMENT = 'apartment'
}

export async function createAccommodation(data: {
    type: 'hotel' | 'apartment';
    name: string;
    city: string;
    link: string;
    picture: string;
}) {
    try {
        const accommodation = await prisma[data.type].create({
            data: {
                name: data.name,
                city: data.city,
                picture: data.picture,
                link: data.link,
            },
        });
        return accommodation;
    } catch (error) {
        console.error('Error creating accommodation:', error);
        throw new Error('Failed to create accommodation');
    }
}

export async function searchAccommodation(city: string, type: AccommodationType) {
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
