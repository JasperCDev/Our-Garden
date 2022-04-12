import { NextApiRequest, NextApiResponse } from "next";
import { readFile } from "../../util/fs";

const clicks = async (req: NextApiRequest, res: NextApiResponse) => {
  const fileRes = await readFile("database/clicks.txt");
  if (!fileRes.ok) {
    res.status(500).json(fileRes.error);
    return;
  }
  res.status(200).json(fileRes.data);
};

export default clicks;
