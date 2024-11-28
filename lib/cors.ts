// import Cors from "cors";

// export const cors = Cors({
//   methods: ["GET", "POST", "OPTIONS"],
//   origin: "*",
// });

import Cors from "cors";
import { NextApiRequest, NextApiResponse } from "next";

// Initialize CORS middleware
export const cors = Cors({
  methods: ["GET", "POST", "OPTIONS"],
  origin: "*",  // You can restrict this to a specific domain during production
});

// Helper function to run the middleware
export const runMiddleware = (req: NextApiRequest, res: NextApiResponse, fn: Function) => {

  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
};
