

import { NextApiRequest, NextApiResponse } from "next";
import upload from "@/lib/multer"; 
import prisma from "@/lib/action"; 

const multerMiddleware = upload.single("picture"); 
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
  if (req.method === "POST") {
    try {
      await runMiddleware(req, res, multerMiddleware);

      const { type, name, city, link } = req.body;
      const picture = req.file; 

      if (!type || !name || !city || !link || !picture) {
        return res.status(400).json({ message: "Missing required fields or file" });
      }

      const pictureUrl = `/uploads/${picture.filename}`;

      let accommodation;

      if (type === "hotel") {
        accommodation = await prisma.hotel.create({
          data: {
            name,
            city,
            picture: pictureUrl, 
            link,
          },
        });
      } else if (type === "apartment") {
        accommodation = await prisma.apartment.create({
          data: {
            name,
            city,
            picture: pictureUrl, 
            link,
          },
        });
      } else {
        return res.status(400).json({ message: 'Invalid type. Must be "hotel" or "apartment".' });
      }

      return res.status(201).json({
        message: "Successfully uploaded picture and created entry",
        accommodation,
      });
    } catch (error) {
      console.error("Error uploading picture:", error);
      return res.status(500).json({ message: "Failed to upload picture", error: error.message });
    }
  } else {
    return res.status(405).json({ message: "Method Not Allowed" });
  }
}

export const config = {
  api: {
    bodyParser: false, 
  },
};
