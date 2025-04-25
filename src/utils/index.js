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

const modeSuffixes = {
  ironman: '_ironman',
  hardcore_ironman: '_hardcore',
  ultimate_ironman: '_ultimate',
  deadman: '_deadman',
  seasonal: '_seasonal',
  tournament: '_tournament',
  fresh_start: '_fresh_start',
};

/**
 * Returns the suffix for the given RuneScape hiscores mode.
 * @param {string} mode - The player's mode (e.g., 'ironman', 'hardcore_ironman').
 * @returns {string} The mode suffix, or an empty string if the mode is not recognized.
 */
export function getModeSuffix(mode) {
  return modeSuffixes[mode] || '';
}
