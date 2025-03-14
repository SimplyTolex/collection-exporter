import fs from "fs";
import path from "path";
import { OsuDBParser } from "osu-db-parser";
import JSZip from "jszip";


const osuFolderPath = "C:/Users/rogat/AppData/Local/osu!";

let collectionBuffer = Buffer.from(fs.readFileSync("C:/Users/rogat/AppData/Local/osu!/collection.db"));
const collectionDB = new OsuDBParser(null, collectionBuffer);
let osuCollectionData = collectionDB.getCollectionData()


// Todo give better error if collection doesn't exist
// const searchedCollection = "Triangles"
// const searchedCollection = "Not enough stamina"
const searchedCollection = "AAA-should add"
// const searchedCollection = "Favorite ones"

const foundCollection = osuCollectionData["collection"].find(collection => collection.name === searchedCollection) // Finds required collection
// console.log(foundCollection)
const beatmapHashes = foundCollection["beatmapsMd5"] // Gets the list with the beatmap hashes in the searched collection
// console.log(beatmapsHash)

// We need folder_name property and we can get it from here
let osuDBbuffer = Buffer.from(fs.readFileSync("C:/Users/rogat/AppData/Local/osu!/osu!.db"));
const osuDB = new OsuDBParser(osuDBbuffer);
let osuDBData = osuDB.getOsuDBData();

let foundBeatmapDiffs = [];
for (let i = 0; i < beatmapHashes.length; i++) {
    let testHash = beatmapHashes[i]; // get i hash
    // if (testHash == null){ continue };
    const result = osuDBData["beatmaps"].find(beatmap => beatmap.md5 === testHash);
    if (result != null) { foundBeatmapDiffs.push(result); }
}

// at this point we have actual beatmap diffs instead of random hashes

// put every folder_name in a separate list, then remove duplicates
let folderNamesWithDups = [];
for (let i = 0; i < foundBeatmapDiffs.length; i++) {
    folderNamesWithDups.push(foundBeatmapDiffs[i]["folder_name"])
}

// removes duplicates, then gets what remains into array. I've spent almost 2 hours on this
let folderNames = [...new Set(folderNamesWithDups)];

// function from https://dev.to/zirkelc/read-all-files-of-directory-and-subdirectories-with-recursive-generators-in-javascript-2pbd
export function* readAllFiles(dir) {
    const files = fs.readdirSync(dir, { withFileTypes: true });

    for (const file of files) {
        if (file.isDirectory()) {
            yield* readAllFiles(path.join(dir, file.name));
        } else {
            yield path.join(dir, file.name);
        }
    }
}

// manage which folders to process

console.log("Folders found: " + folderNames.length);

// startElement = 0; endElement = folderNames.length + 1
const startElement = 0;
const endElement = folderNames.length + 1; // slice doesn't include the last element

const foldersToProcess = folderNames.slice(startElement, endElement);

// make output dir
const outputDir = "./CEoutput"

if (!fs.existsSync(outputDir)){
    fs.mkdirSync(outputDir);
}

// finds every required file
for (let i = 0; i < foldersToProcess.length; i++) {
    let zip = new JSZip();

    for (const file of readAllFiles(osuFolderPath + "/Songs/" + foldersToProcess[i])) {

        let fileStream = fs.createReadStream(file);

        const fileSplit = file.split("\\"); // potential bug with path separators on Linux?
        const fileName = fileSplit[fileSplit.length - 1];
        zip.file(fileName, fileStream);
    }
    
    // print folder name
    // console.log(foldersToProcess[i]);

    // create an osz for every folder
    zip
        .generateNodeStream({ type: 'nodebuffer', streamFiles: true })
        .pipe(fs.createWriteStream(outputDir + "/" + foldersToProcess[i] + '.osz'))
        .on('finish', function () {
            console.log(i + " exported [" + foldersToProcess[i] + "]");
        });
}
