import * as devData from "../data/development-data/index";
import db from "../index.js";
import seed from "./seed.js";

const runSeed = () => {
  return seed(devData).then(() => db.end());
};

runSeed();
