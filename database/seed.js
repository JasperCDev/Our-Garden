const fs = require("fs");

fs.promises.writeFile(
  "database/clicks.txt",
  JSON.stringify({
    0: { clicks: 0 },
    1: { clicks: 0 },
    2: { clicks: 0 },
    3: { clicks: 0 },
    4: { clicks: 0 },
    5: { clicks: 0 },
    6: { clicks: 0 },
    7: { clicks: 0 },
    8: { clicks: 0 },
    9: { clicks: 0 },
    10: { clicks: 0 },
    11: { clicks: 0 },
    12: { clicks: 0 },
    13: { clicks: 0 },
    14: { clicks: 0 },
    15: { clicks: 0 },
  })
);
