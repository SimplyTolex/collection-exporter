const fs = require("fs");
const { OsuDBParser } = require("osu-db-parser");

let collectionBuffer = Buffer.from(fs.readFileSync("C:/Users/rogat/AppData/Local/osu!/collection.db"));
const collectionDB = new OsuDBParser(null, collectionBuffer); // Yeah, that's okay

let osuCollectionData = collectionDB.getCollectionData() // This is collection.db data you can make with this all that you want.
// console.log(osuCollectionData); // list of all collections

const foundCollection = osuCollectionData["collection"].find(collection => collection.name === "Not enough stamina")
console.log(foundCollection)

// let test = osuCollectionData["collection"][25]
// let test = osuCollectionData["collection"][1]
// console.log(test)