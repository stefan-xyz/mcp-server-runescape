import { fuzzySearch, getModeSuffix } from '../utils/index.js';

const API_BASE_URL = 'https://secure.runescape.com';
const API_ITEMS_DUMP_BASE_URL = 'https://chisel.weirdgloop.org';

export const getItemId = async (name) => {
  try {
    const response = await fetch(`${API_ITEMS_DUMP_BASE_URL}/gazproj/gazbot/os_dump.json`);
    const data = await response.json();

    // Convert the data into an array of { id, name } objects for fuzzy search
    const items = Object.entries(data).map(([id, item]) => ({
      id,
      name: item?.name || '',
    }));

    const results = fuzzySearch(items, name);

    if (results.length === 0) throw new Error(`No items matching "${name}" found`);

    // Return the ID of the best match
    return results[0].item.id;
  } catch (error) {
    console.error('Error fetching item ID:', error);
    throw error;
  }
};

export const getItemDetails = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/m=itemdb_oldschool/api/catalogue/detail.json?item=${id}`);
    const data = await response.json();

    return data;
  } catch (error) {
    console.error('Error fetching item details:', error);
    throw error;
  }
};

export const getPlayerHiscores = async (name, mode) => {
  try {
    const suffix = getModeSuffix(mode);
    const m = `hiscore_oldschool${suffix}`;

    const response = await fetch(`${API_BASE_URL}/m=${m}/index_lite.json?player=${name}`);
    const data = await response.json();

    return data;
  } catch (error) {
    console.error('Error fetching player hiscores:', error);
    throw error;
  }
};

export const getPlayerCount = async () => {
  try {
    const response = await fetch(
      'https://www.runescape.com/player_count.js?varname=iPlayerCount&callback=jQuery000000000000000_0000000000&_=0',
    );
    const data = await response.text();

    return data;
  } catch (error) {
    console.error('Error fetching player count:', error);
    throw error;
  }
};

export const getRSUserTotal = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/m=account-creation-reports/rsusertotal.ws`);
    const data = await response.json();

    return data;
  } catch (error) {
    console.error('Error fetching RS user total:', error);
    throw error;
  }
};
