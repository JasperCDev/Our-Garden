import { NextApiRequest, NextApiResponse } from "next";
import redisClient from "database/redis";
import { ClickMap } from "../../util/types";

const clicks = async (req: NextApiRequest, res: NextApiResponse) => {
  let clickMap = await redisClient.hgetall("clickMap");
  if (JSON.stringify(clickMap) === "{}") {
    await redisClient.hmset("clickMap", [0, 0, 1, 0, 2, 0]);
    clickMap = await redisClient.hgetall("clickMap");
  }
  if (req.method === "PUT") {
    const reqClickMap: ClickMap = JSON.parse(req.body.clickMap);

    let newClickMap: ClickMap = {};
    Object.keys(reqClickMap).forEach((key) => {
      newClickMap[key] = Number(reqClickMap[key]) + Number(clickMap[key]);
    });

    await redisClient.hmset("clickMap", Object.entries(newClickMap).flat());

    res.status(200).json(null);
    return;
  }
  res.status(200).send(clickMap);
};

export default clicks;
