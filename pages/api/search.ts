import { searchAccomodation } from '@/lib/action';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const { city, type } = req.query;

      if (!city || !type) {
        return res.status(400).json({ message: 'City and type are required parameters.' });
      }

      if (type !== 'hotel' && type !== 'apartment') {
        return res.status(400).json({ message: 'Type must be either "hotel" or "apartment".' });
      }

      const accommodations = await searchAccomodation(city as string, type as 'hotel' | 'apartment');

      return res.status(200).json(accommodations);
    } catch (error) {
      console.error('Error searching accommodations:', error);
      return res.status(500).json({ message: 'Failed to fetch accommodations' });
    }
  } else {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
}
