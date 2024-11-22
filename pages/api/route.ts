import prisma from '@/lib/action';
import { NextApiRequest, NextApiResponse } from 'next';
import upload from '@/lib/multer'; 
import { uploads } from '@/lib/cloudinary';  

const multerMiddleware = upload.single('picture');  // 'picture' must match the field name in the form

function runMiddleware(req: NextApiRequest, res: NextApiResponse, fn: Function) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }
      resolve(result);
    });
  });
}
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        try {
            await runMiddleware(req, res, multerMiddleware);
            console.log('Request body:', req.body);   // Log body data
            console.log('File object:', req.file);    // Log file data

            const { type, name, city, link } = req.body;
            const file = req.file;

            if (!type || !name || !city || !link || !file) {
                return res.status(400).json({ message: 'Missing required fields or file' });
            }

            const picture = `data:${file.mimetype};base64,${file.buffer.toString('base64')}`;

            let accommodation;

            if (type === 'hotel') {
                accommodation = await prisma.hotel.create({
                    data: {
                        name,
                        city,
                        picture,
                        link,
                    },
                });
            } else if (type === 'apartment') {
                accommodation = await prisma.apartment.create({
                    data: {
                        name,
                        city,
                        picture,
                        link,
                    },
                });
            } else {
                return res.status(400).json({ message: 'Invalid type. Must be "hotel" or "apartment".' });
            }

            return res.status(201).json({
                message: 'Successfully uploaded picture and created entry',
                accommodation,
            });
        } catch (error) {
            console.error('Error uploading picture:', error);
            return res.status(500).json({ message: 'Failed to upload picture', error: error.message });
        }
    } else {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }
}

  
  export const config = {
    api: {
      bodyParser: false,  
    },
  };