import { NextApiRequest, NextApiResponse } from "next";
import redisClient from "database/redis";

const redis = async (req: NextApiRequest, res: NextApiResponse) => {
  await redisClient.del("clickMap");
  // let clickMap = await redisClient.hgetall("clickMap");
  // if (!clickMap) {
  // await redisClient.hmset("clickMap", [0, 0, 1, 0, 2, 0]);
  // let clickMap = await redisClient.hgetall("clickMap");
  // // }
  // if (req.method === "PUT") {
  //   redisClient.hmset("clickMap", req.body.clickMap);
  //   res.status(200).json(null);
  // }
  res.status(200).send("clickMap");
};

export default redis;
