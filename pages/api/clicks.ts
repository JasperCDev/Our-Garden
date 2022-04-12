import { NextApiRequest, NextApiResponse } from "next";

const clicks = (req: NextApiRequest, res: NextApiResponse) => {
  res.status(200).json({ clicks: 1 });
};

export default clicks;
