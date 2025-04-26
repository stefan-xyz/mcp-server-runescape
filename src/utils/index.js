import Fuse from 'fuse.js';

/**
 * Performs a fuzzy search using Fuse.js.
 * @param {Array} items - The array of items to search through.
 * @param {string} query - The search query.
 * @param {Object} options - Fuse.js options (optional).
 * @returns {Array} The search results.
 */
export const fuzzySearch = (
  items,
  query,
  options = {
    includeScore: true,
    keys: ['name'],
    threshold: 0.3,
  },
) => {
  const fuse = new Fuse(items, options);
  return fuse.search(query);
};

/**
 * Formats a value to a string with a suffix for thousands, millions, and billions.
 * @param {number} value - The value to format.
 * @returns {string} The formatted value.
 */
export const formatValue = (value) => {
  if (value >= 1000000000) return `${(value / 1000000000).toFixed(1)}b`;
  if (value >= 1000000) return `${(value / 1000000).toFixed(1)}m`;
  if (value >= 1000) return `${(value / 1000).toFixed(1)}k`;
  return value.toString();
};

/**
 * Transforms price data from a daily and average format to a date-value format.
 * @param {Object} data - The price data to transform.
 * @returns {Object} The transformed price data.
 */
export const transformPriceData = (data) => {
  // Transform the data
  const transformedDaily = {};
  const transformedAverage = {};

  for (const [timestamp, value] of Object.entries(data.daily)) {
    const date = new Date(parseInt(timestamp)).toLocaleDateString();
    transformedDaily[date] = formatValue(value);
  }

  for (const [timestamp, value] of Object.entries(data.average)) {
    const date = new Date(parseInt(timestamp)).toLocaleDateString();
    transformedAverage[date] = formatValue(value);
  }

  return {
    daily: transformedDaily,
    average: transformedAverage,
  };
};

/**
 * The list of hiscores types.
 */
const hiscoreTypes = [
  'ironman',
  'hardcore_ironman',
  'ultimate_ironman',
  'deadman',
  'seasonal',
  'tournament',
  'fresh_start',
];

/**
 * Returns the suffix for the given RuneScape hiscores type.
 * @param {string} type - The player's type (e.g., 'ironman', 'hardcore_ironman').
 * @returns {string} The type suffix, or an empty string if the type is not recognized.
 */
export function getHiscoreType(type) {
  return hiscoreTypes.includes(type) ? type : '';
}

/**
 * The list of skills in RuneScape.
 */
const skillToIndex = {
  overall: 0,
  attack: 1,
  defence: 2,
  strength: 3,
  hitpoints: 4,
  ranged: 5,
  prayer: 6,
  magic: 7,
  cooking: 8,
  woodcutting: 9,
  fletching: 10,
  fishing: 11,
  firemaking: 12,
  crafting: 13,
  smithing: 14,
  mining: 15,
  herblore: 16,
  agility: 17,
  thieving: 18,
  slayer: 19,
  farming: 20,
  runecrafting: 21,
  hunter: 22,
  construction: 23,
};

/**
 * Returns the index for the given RuneScape hiscores skill.
 * @param {string} skill - The skill name (e.g., 'Woodcutting', 'Attack').
 * @returns {number} The skill index, or -1 if the skill is not recognized.
 */
export function getSkillIndex(skill) {
  return skillToIndex[skill.toLowerCase()] ?? -1;
}

/**
 * The list of hiscores activities in RuneScape.
 */
const activityToIndex = {
  'league points': 0,
  'deadman points': 1,
  'bounty hunter - hunter': 2,
  'bounty hunter - rogue': 3,
  'bounty hunter (legacy) - hunter': 4,
  'bounty hunter (legacy) - rogue': 5,
  'clue scrolls (all)': 6,
  'clue scrolls (beginner)': 7,
  'clue scrolls (easy)': 8,
  'clue scrolls (medium)': 9,
  'clue scrolls (hard)': 10,
  'clue scrolls (elite)': 11,
  'clue scrolls (master)': 12,
  'lms - rank': 13,
  'pvp arena - rank': 14,
  'soul wars zeal': 15,
  'rifts closed': 16,
  'colosseum glory': 17,
  'collections logged': 18,
  'abyssal sire': 19,
  'alchemical hydra': 20,
  amoxliatl: 21,
  araxxor: 22,
  artio: 23,
  'barrows chests': 24,
  bryophyta: 25,
  callisto: 26,
  "cal'varion": 27,
  cerberus: 28,
  'chambers of xeric': 29,
  'chambers of xeric: challenge mode': 30,
  'chaos elemental': 31,
  'chaos fanatic': 32,
  'commander zilyana': 33,
  'corporeal beast': 34,
  'crazy archaeologist': 35,
  'dagannoth prime': 36,
  'dagannoth rex': 37,
  'dagannoth supreme': 38,
  'deranged archaeologist': 39,
  'duke sucellus': 40,
  'general graardor': 41,
  'giant mole': 42,
  'grotesque guardians': 43,
  hespori: 44,
  'kalphite queen': 45,
  'king black dragon': 46,
  kraken: 47,
  "kree'arra": 48,
  "k'ril tsutsaroth": 49,
  'lunar chests': 50,
  mimic: 51,
  nex: 52,
  nightmare: 53,
  "phosani's nightmare": 54,
  obor: 55,
  'phantom muspah': 56,
  'royal titans': 57,
  sarachnis: 58,
  scorpia: 59,
  scurrius: 60,
  skotizo: 61,
  'sol heret': 62,
  spindel: 63,
  tempoross: 64,
  'the gauntlet': 65,
  'the corrupted gauntlet': 66,
  'the hueycoatl': 67,
  'the leviathan': 68,
  'the whisper': 69,
  'theatre of blood': 70,
  'theatre of blood: hard mode': 71,
  'thermonuclear smoke devil': 72,
  'tombs of amascut': 73,
  'tombs of amascut: expert mode': 74,
  'tzkal-zuk': 75,
  'tztok-jad': 76,
  vardorvis: 77,
  venenatis: 78,
  "vet'ion": 79,
  vorkath: 80,
  wintertodt: 81,
  zalcano: 82,
  zulrah: 83,
};

/**
 * Returns the index for the given RuneScape hiscores activity.
 * @param {string} activity - The activity name (e.g., 'Clue Scrolls (all)', 'Vorkath').
 * @returns {number} The activity index, or -1 if the activity is not recognized.
 */
export function getActivityIndex(activity) {
  return activityToIndex[activity.toLowerCase()] ?? -1;
}

/**
 * The list of game modes in RuneScape.
 */
export const GameMode = {
  OSRS: 'osrs',
  RS: 'rs',
};

/**
 * Returns the API URL for the given mode and endpoint.
 * @param {string} mode - The mode (e.g., 'itemdb', 'hiscore').
 * @param {string} endpoint - The endpoint (e.g., '/api/catalogue/detail.json?item=1').
 * @param {string} gameMode - The game mode (e.g., 'osrs', 'rs').
 * @returns {string} The API URL.
 */
export const apiUrl = (mode, endpoint, gameMode) => {
  const base = 'https://secure.runescape.com';
  const modePrefix = gameMode === GameMode.OSRS ? `m=${mode}_oldschool` : `m=${mode}`;
  return `${base}/${modePrefix}${endpoint}`;
};

/**
 * Returns the API URL for the items in RuneScape.
 * @param {string} gameMode - The game mode (e.g., 'osrs', 'rs').
 * @returns {string} The API URL.
 */
export const apiItemsUrl = (gameMode) => {
  const base = 'https://chisel.weirdgloop.org/gazproj/gazbot';
  const modePrefix = gameMode === GameMode.OSRS ? 'os_dump.json' : 'rs_dump.json';
  return `${base}/${modePrefix}`;
};
