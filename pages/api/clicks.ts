import { NextApiRequest, NextApiResponse } from "next";
import { readFile, writeFile } from "../../util/fs";

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
    case "PUT":
      const readRes = await readFile("database/clicks.txt");

      if (!readRes.ok) {
        res.status(500).json(readRes.error);
        return;
      }

      const writeRes = await writeFile("database/clicks.txt", req.body.clicks);

      if (!writeRes.ok) {
        res.status(500).json(writeRes.error);
        return;
      }

      res.status(200).json(writeRes.data);
      return;
    default:
      res.status(404).json("404");
      return;
  }
};

export default clicks;
