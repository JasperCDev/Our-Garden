import { NextApiRequest, NextApiResponse } from "next";
import { readFile, writeFile } from "../../util/fs";

async function getClicks(res: NextApiResponse) {
  const readRes = await readFile("database/clicks.txt");

  if (!readRes.ok) {
    res.status(500).json(readRes.error);
    return;
  }

  res.status(200).json(readRes.data);
  return;
}

async function updateClicks(req: NextApiRequest, res: NextApiResponse) {
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
}

const clicks = async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "GET":
      return getClicks(res);
    case "PUT":
      return updateClicks(req, res);
    default:
      res.status(404).json("404");
      return;
  }
};

export default clicks;
