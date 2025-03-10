const fs = require("fs");
const { OsuDBParser } = require("osu-db-parser");

const osuFolderPath = "C:/Users/rogat/AppData/Local/osu!";

let collectionBuffer = Buffer.from(fs.readFileSync("C:/Users/rogat/AppData/Local/osu!/collection.db"));
const collectionDB = new OsuDBParser(null, collectionBuffer);
let osuCollectionData = collectionDB.getCollectionData()


// const searchedCollection = "Triangles"
const searchedCollection = "Not enough stamina"

const foundCollection = osuCollectionData["collection"].find(collection => collection.name === searchedCollection) // Finds required collection
// console.log(foundCollection)
const beatmapHashes = foundCollection["beatmapsMd5"] // Gets the list with the beatmap hashes in the searched collection
// console.log(beatmapsHash)

// We need folder_name property and we can get it from here
let osuDBbuffer = Buffer.from(fs.readFileSync("C:/Users/rogat/AppData/Local/osu!/osu!.db"));
const osuDB = new OsuDBParser(osuDBbuffer);
let osuDBData = osuDB.getOsuDBData();

let foundBeatmapDiffs = [];

for (let i = 0; i < beatmapHashes.length; i++){
    let testHash = beatmapHashes[i]; // get i hash
    foundBeatmapDiffs.push(osuDBData["beatmaps"].find(beatmap => beatmap.md5 === testHash));
}

// at this point we have actual beatmap diffs instead of random hashes

// put every folder_name in a separate list, then remove duplicates
let folderNamesWithDups = [];
for (let i = 0; i < foundBeatmapDiffs.length; i++){
    folderNamesWithDups.push(foundBeatmapDiffs[i]["folder_name"])
}

const folderNames = [new Set(folderNamesWithDups)];