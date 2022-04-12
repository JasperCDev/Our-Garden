import { NextApiRequest, NextApiResponse } from "next";
import { readFile } from "../../util/fs";

const clicks = async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "GET":
      const fileRes = await readFile("database/clicks.txt");
      if (!fileRes.ok) {
        res.status(500).json(fileRes.error);
        return;
      }
      res.status(200).json(fileRes.data);
      return;
    default:
      res.status(404).json("404");
  }
};

export default clicks;
