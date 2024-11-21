import { createAccomodation } from "@/lib/action";
import { cors } from "@/lib/cors";
import { BookingStatus } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
async function runCors(req: NextApiRequest, res: NextApiResponse) {
  return new Promise((resolve, reject) => {
    cors(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      resolve(result); // Make sure to resolve or handle success properly
    });
  });
}

type CreateAccommodationRequest = {
  type: "hotel" | "apartment";
  name: string;
  city: string;
  price: string;
  startDate: string;
  endDate: string;
  status?: BookingStatus;
  rooms: number;
  people: number;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await runCors(req, res);

  if (req.method === "POST") {
    try {
      const {
        type,
        name,
        city,
        price,
        startDate,
        endDate,
        rooms,
        people,
        status = BookingStatus.PENDING,
      }: CreateAccommodationRequest = req.body;

      if (
        !type ||
        !name ||
        !city ||
        !price ||
        !startDate ||
        !endDate ||
        !rooms ||
        !people
      ) {
        return res.status(400).json({ message: "Missing required fields" });
      }

      const accommodation = await createAccomodation({
        type,
        name,
        city,
        price,
        startDate,
        endDate,
        status,
        rooms,
        people,
      });

      return res
        .status(201)
        .json({ message: "Successfully created accommodation", accommodation });
    } catch (error) {
      console.error("Error creating accommodation:", error);
      return res
        .status(500)
        .json({ message: "Failed to create accommodation" });
    }
  } else {
    return res.status(405).json({ message: "Method Not Allowed" });
  }
}
