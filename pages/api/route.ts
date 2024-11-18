"use server"
import { createAccomodation } from '@/lib/action';
import { BookingStatus } from '@prisma/client/wasm';
import { NextApiRequest, NextApiResponse } from 'next';

type CreateAccommodationRequest = {
  type: 'hotel' | 'apartment';
  name: string;
  city: string;
  price: string;
  status?: BookingStatus;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { type, name, city, price, status }: CreateAccommodationRequest = req.body;

      // Validate incoming data
      if (!type || !name || !city || !price) {
        return res.status(400).json({ message: 'Missing required fields' });
      }

      // Call the createAccommodation function
      const accommodation = await createAccomodation({ type, name, city, price, status });

      // Return the created accommodation data
      return res.status(201).json({message : "successfull", accommodation: accommodation} );
    } catch (error) {
      console.error('Error creating accommodation:', error);
      return res.status(500).json({ message: 'Failed to create accommodation' });
    }
  } else {
    // If not a POST request
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
}
