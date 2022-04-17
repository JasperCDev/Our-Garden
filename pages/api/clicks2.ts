import { NextApiRequest, NextApiResponse } from "next";
import { readFile, writeFile } from "../../util/fs";

async function getClicks(req: NextApiRequest, res: NextApiResponse) {
  const response = await readFile("database/clicks2.txt");
  if (!response.ok) {
    res.status(500).json(response.error);
    return;
  }

  const arr = JSON.parse(response.data);
  res.status(200).json(arr);
}

async function updateClicks(req: NextApiRequest, res: NextApiResponse) {
  const readRes = await readFile("database/clicks2.txt");

  if (!readRes.ok) {
    res.status(500).json(readRes.error);
    return;
  }

  const arr = JSON.parse(readRes.data);

  for (let i = 0; i < arr.length; i++) {
    arr[i].clicks = Math.floor(Math.random() * 100);
  }

  const writeRes = await writeFile("database/clicks2.txt", JSON.stringify(arr));

  if (!writeRes.ok) {
    res.status(500).json(writeRes.error);
    return;
  }

  res.status(200).json(writeRes.data);
}

const clicks2 = async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "GET":
      return getClicks(req, res);
    case "PUT":
      return updateClicks(req, res);
    default:
      res.status(404).json("404");
      return;
  }
};

export default clicks2;
