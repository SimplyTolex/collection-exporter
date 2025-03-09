const fs = require("fs");
const { OsuDBParser } = require("osu-db-parser");

const osuFolderPath = "C:/Users/rogat/AppData/Local/osu!";

/*
strat
1. read collections
2. get md5 hash in a list
3. run through every beatmap and compare hash
4. if match then save it in a different list
5. zip archive it into .osz files
*/

let collectionBuffer = Buffer.from(fs.readFileSync("C:/Users/rogat/AppData/Local/osu!/collection.db"));
const collectionDB = new OsuDBParser(null, collectionBuffer); // Yeah, that's okay
let osuCollectionData = collectionDB.getCollectionData()


const searchedCollection = "Not enough stamina"

const foundCollection = osuCollectionData["collection"].find(collection => collection.name === searchedCollection) // Finds required collection
// console.log(foundCollection)
const beatmapsHash = foundCollection["beatmapsMd5"] // Gets the list with the beatmap hashes in the searched collection
// console.log(beatmapsHash)


// let osuDBbuffer = Buffer.from(fs.readFileSync("C:/Users/rogat/AppData/Local/osu!/osu!.db"));
// const osuDB = new OsuDBParser(osuDBbuffer);

// let osuDBData = osuDB.getOsuDBData(); // This is osu!.db data you can make with this all that you want.
// // let test2 = osuDBData["beatmaps"][0]["md5"]
// // console.log(test2)
// const beatmapCount = osuDBData["beatmaps_count"];

// let matches = [];

// function checkForHashMatch(hashList, mapHash) {
//     for (let i = 0; i < hashList.length; i++) {
//         if (mapHash == hashList[i]) {
//             return true;
//         }
//     }
//     return false;
// }

// // Scan every beatmap
// for (let i = 0; i < beatmapCount; i++) {
//     let beatmap = osuDBData["beatmaps"][i]["md5"];
//     if (checkForHashMatch(beatmapsHash, beatmap)) { // if there's match
//         // TODO: remove the hash from the list after matching
//     }
// }

