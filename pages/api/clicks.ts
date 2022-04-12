import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";

const clicks = async (req: NextApiRequest, res: NextApiResponse) => {
  fs.readFile("database/clicks.txt", (err, data) => {
    if (err) {
      const status = Number(err.code || 500);
      res.status(status).json(err);
      return;
    }
    res.status(200).json(data);
  });
};

export default clicks;
