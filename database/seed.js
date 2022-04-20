const fs = require("fs");

fs.promises.writeFile(
  "database/clicks.txt",
  JSON.stringify({
    0: { clicks: 0 },
    1: { clicks: 0 },
    2: { clicks: 0 },
  })
);
