import { searchAccomodation } from '@/lib/action';
import cors from '@/lib/cors';
import { NextApiRequest, NextApiResponse } from 'next';

async function runCors(req: NextApiRequest, res: NextApiResponse) {
  return new Promise((resolve, reject) => {
    cors(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // First run the CORS middleware
  await runCors(req, res);

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
