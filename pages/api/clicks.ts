import { NextApiRequest, NextApiResponse } from "next";
import { DATABASE_PATH } from "../../util/constants";
import { readFile, writeFile } from "../../util/fs";

/* "robot" for testing */

// const fakeReq = {
//   body: {
//     clicks: (Math.floor(Math.random() * 10) + 20).toString(),
//   },
// } as unknown as NextApiRequest;

// const fakeRes = {
//   status: (status: number) => fakeRes,
//   json: (body: any) => {},
// } as unknown as NextApiResponse;

// setInterval(() => {
//   updateClicks(fakeReq, fakeRes);
// }, 1000);

/* -------------------- */

async function getClicks(res: NextApiResponse) {
  const readRes = await readFile(DATABASE_PATH);

  if (!readRes.ok) {
    res.status(500).json(readRes.error);
    return;
  }

  res.status(200).json(readRes.data);
  return;
}

async function updateClicks(req: NextApiRequest, res: NextApiResponse) {
  const readRes = await readFile(DATABASE_PATH);

  if (!readRes.ok) {
    res.status(500).json(readRes.error);
    return;
  }

  const clickCount = Number(readRes.data) + Number(req.body.clicks);

  const writeRes = await writeFile(DATABASE_PATH, clickCount.toString());

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
