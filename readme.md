# Collection Exporter
still in need of cooking

Collection Exporter lets you export specific collections from osu!stable as .osz files. You can use them to backup your downloaded beatmaps or import them into osu!lazer.

## Limitations

- You can't export individual difficulties, only entire beatmaps
    - explanation
- It doesn't do anything with collections in Lazer: you can't read from them, add beatmaps into collection in-bulk or anything like that.
> [!CAUTION]
> There may or may not be a bug related to path separators. The program is tested (and works) on Windows (which uses backslashes), be careful if you're on Linux etc.

## How to use
1. install node.js
2. `npm install osu-db-parser jszip`
3. ???
4. profit

The program works, you can use it if you really wanna, but it doesn't have any interfaces, everything is done by downloading / forking it and changing the code.

## Future plans / To-Do
[ ] Make a proper CLI
[ ] Make it a webapp (because why not)
[ ] Add Lazer collection support?? (kinda don't wanna deal with parsers)
[ ] Fix the bug which may or may not exist