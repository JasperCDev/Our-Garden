import { NextApiRequest, NextApiResponse } from "next";
import { DATABASE_PATH } from "../../util/constants";
import { readFile, writeFile } from "./_fs";
import { ClickMap } from "../../util/types";

/* "robot" for testing */

// const fakeReq = {
//   body: {
//     clickMap: JSON.stringify({
//       0: { clicks: 1 },
//       1: { clicks: 1 },
//       2: { clicks: 1 },
//       3: { clicks: 1 },
//       4: { clicks: 1 },
//       5: { clicks: 1 },
//       6: { clicks: 1 },
//       7: { clicks: 1 },
//       8: { clicks: 1 },
//       9: { clicks: 1 },
//       10: { clicks: 1 },
//       11: { clicks: 1 },
//       12: { clicks: 1 },
//       13: { clicks: 1 },
//       14: { clicks: 1 },
//       15: { clicks: 1 },
//     }),
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
