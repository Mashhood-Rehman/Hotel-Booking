import Cors from "cors";

export const cors = Cors({
  methods: ["GET", "POST", "OPTIONS"],
  origin: "*",
});
