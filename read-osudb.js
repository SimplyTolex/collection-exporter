const fs = require("fs");
const { OsuDBParser } = require("osu-db-parser");

let osuDBbuffer = Buffer.from(fs.readFileSync("C:/Users/rogat/AppData/Local/osu!/osu!.db"));
const osuDB = new OsuDBParser(osuDBbuffer);

let osuDBData = osuDB.getOsuDBData(); // This is osu!.db data you can make with this all that you want.
// let test2 = osuDBData["beatmaps"][0]["md5"]
let test2 = osuDBData["beatmaps"][2]
// let test2 = osuDBData
console.log(test2)
// console.log(osuDBData);
// let osuTest = JSON.parse(osuDBData);
// console.log(osuTest[0]);

/*
  osuver: 20250122,
  folder_count: 927,
  is_unlocked: true,
  date_unlock_ticks: 0n,
  username: 'to1ex',
  beatmaps_count: 3959,
  beatmaps: [
    {
*/

/*
  artist_name: '07th Expansion',
  artist_name_unicode: null,
  song_title: 'Eiji Kuinbii',
  song_title_unicode: null,
  creator_name: 'Natteke',
  difficulty: 'Collapse',
  audio_file_name: '27. Eiji Kuinbii.mp3',
  md5: 'f9e18a5b5f9cc08956a7901a2f616c06',
  osu_file_name: '07th Expansion - Eiji Kuinbii (Natteke) [Collapse].osu',
  ranked_status: 5,
  n_hitcircles: 578,
  n_sliders: 253,
  n_spinners: 0,
  last_modification_time: 638390031514979816n,
  approach_rate: 8,
  circle_size: 4,
  hp_drain: 7,
  overall_difficulty: 7,
  slider_velocity: 1.6,
  ---
  drain_time: 190,
  total_time: 227549,
  preview_offset: 152255,
  beatmap_id: 124321,
  beatmapset_id: 38235,
  thread_id: 0,
  grade_standard: 6,
  grade_taiko: 9,
  grade_ctb: 9,
  grade_mania: 9,
  local_beatmap_offset: 0,
  stack_leniency: 0.5,
  timing_points: [ [ 392.156862745098, 1667, true ] ],
  mode: 0,
  song_source: 'Umineko no Naku Koro ni',
  song_tags: 'when they cry ep6 -45',
  online_offset: 0,
  title_font: '[bold:0,size:20,time:26765]07th Expansion\nEiji Kuinbii',
  unplayed: false,
  last_played: 638460774224670022n,
  osz2: false,
  folder_name: '38235 07th Expansion - Eiji Kuinbii',
  last_checked_against_repository: 638461026469378045n,
  ignore_sound: false,
  ignore_skin: false,
  disable_storyboard: false,
  disable_video: false,
  visual_override: false,
  last_modification_time_2: 206320,
  mania_scroll_speed: 0
*/