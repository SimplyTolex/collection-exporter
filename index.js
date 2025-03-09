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
const beatmapHashes = foundCollection["beatmapsMd5"] // Gets the list with the beatmap hashes in the searched collection
// console.log(beatmapsHash)

// We need folder_name property and we can get them from here
let osuDBbuffer = Buffer.from(fs.readFileSync("C:/Users/rogat/AppData/Local/osu!/osu!.db"));
const osuDB = new OsuDBParser(osuDBbuffer);
let osuDBData = osuDB.getOsuDBData();

let foundBeatmapDiffs = [];

for (let i = 0; i < beatmapHashes.length; i++){
    let testHash = beatmapHashes[i]; // get i hash
    foundBeatmapDiffs.push(osuDBData["beatmaps"].find(beatmap => beatmap.md5 === testHash));
}

// at this point we have actual beatmap diffs instead of random hashes
// console.log(foundBeatmapDiffs)

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

