import { NextApiRequest, NextApiResponse } from "next";
import redisClient from "util/redis";

const redis = async (req: NextApiRequest, res: NextApiResponse) => {
  await redisClient.set("ping", "pong");
  const test = await redisClient.get("ping");
  res.status(200).json(test);
};

export default redis;
