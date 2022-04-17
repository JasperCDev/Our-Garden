import { NextApiRequest, NextApiResponse } from "next";
import { DATABASE_PATH } from "../../util/constants";
import { readFile, writeFile } from "../../util/fs";
import { ClickMap } from "../../util/types";

async function getClicks(req: NextApiRequest, res: NextApiResponse) {
  const response = await readFile(DATABASE_PATH);
  if (!response.ok) {
    res.status(500).json(response.error);
    return;
  }

  const arr = JSON.parse(response.data);
  res.status(200).json(arr);
}

async function updateClicks(req: NextApiRequest, res: NextApiResponse) {
  const readRes = await readFile(DATABASE_PATH);

  if (!readRes.ok) {
    res.status(500).json(readRes.error);
    return;
  }

  const reqClickMap: ClickMap = JSON.parse(req.body.clickMap);
  const clickMap: ClickMap = JSON.parse(readRes.data);

  for (let indx of Object.keys(reqClickMap)) {
    const dbClicks = clickMap[indx].clicks;
    const reqClicks = reqClickMap[indx].clicks;

    clickMap[indx] = {
      clicks: dbClicks + reqClicks,
    };
  }

  const writeRes = await writeFile(
    "database/clicks.txt",
    JSON.stringify(clickMap)
  );

  if (!writeRes.ok) {
    res.status(500).json(writeRes.error);
    return;
  }

  res.status(200).json(writeRes.data);
}

const clicks = async (req: NextApiRequest, res: NextApiResponse) => {
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

export default clicks;
