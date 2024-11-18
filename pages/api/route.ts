import { createAccomodation } from '@/lib/action';
import { BookingStatus } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

type CreateAccommodationRequest = {
  type: 'hotel' | 'apartment';
  name: string;
  city: string;
  price: string;
  startDate: string;  // Added startDate field
  endDate: string;    // Added endDate field
  status?: BookingStatus;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      // Log the request body to make sure the data is coming through
      console.log('Request body:', req.body);

      const { type, name, city, price, startDate, endDate, status = BookingStatus.PENDING }: CreateAccommodationRequest = req.body;

      // Check for missing fields
      if (!type || !name || !city || !price || !startDate || !endDate) {
        return res.status(400).json({ message: 'Missing required fields' });
      }

      // Call the create accommodation function
      const accommodation = await createAccomodation({ type, name, city, price, startDate, endDate, status });

      return res.status(201).json({ message: "Successfully created accommodation", accommodation });
    } catch (error) {
      console.error('Error creating accommodation:', error);
      return res.status(500).json({ message: 'Failed to create accommodation' });
    }
  } else {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
}
