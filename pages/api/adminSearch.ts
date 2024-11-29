
import { searchAccommodationByType } from "@/lib/action";
import { cors } from "@/lib/cors"; // CORS middleware
import { NextApiRequest, NextApiResponse } from "next";

async function runCors(req: NextApiRequest, res: NextApiResponse) {
  return new Promise((resolve, reject) => {
    cors(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      resolve(result); 
    });
  });
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await runCors(req, res);

  if (req.method === "GET") {
    try {
      const {  type } = req.query;

      if ( !type) {
        return res.status(400).json({
          message: " type is required parameters.",
        });
      }

      if (type !== "hotel" && type !== "apartment") {
        return res.status(400).json({
          message: 'Type must be either "hotel" or "apartment".',
        });
      }

      const accommodations = await searchAccommodationByType(
        type as "hotel" | "apartment"
      );

      // If no accommodations are found
      if (accommodations.length === 0) {
        return res.status(404).json({
          message: `No accommodations found for type "${type}" ".`,
        });
      }

      // Return the found accommodations
      return res.status(200).json(accommodations);
    } catch (error) {
      // Log the error and return a server error response
      console.error("Error searching accommodations:", error);
      return res
        .status(500)
        .json({ message: "Failed to fetch accommodations", error: error.message });
    }
  } else {
    // Handle unsupported HTTP methods
    return res.status(405).json({ message: "Method Not Allowed" });
  }
}

// CORS configuration (if needed in your environment)
export const config = {
  api: {
    bodyParser: true, // Enable body parser for JSON requests
  },
};
