import { NextApiRequest, NextApiResponse } from "next";
import redisClient from "util/redis";

const redis = async (req: NextApiRequest, res: NextApiResponse) => {
  let clickMap = await redisClient.hmget("clickMap", "0", "1", "2");
  if (!clickMap) {
    await redisClient.hmset("clickMap", ["0", "0", "1", "0", "2", "0"]);
    clickMap = await redisClient.hmget("clickMap", "0", "1", "2");
  }
  if (req.method === "PUT") {
    redisClient.hmset("clickMap", req.body.clickMap);
    res.status(200).json(null);
  }
  res.status(200).json(clickMap);
};

export default redis;
