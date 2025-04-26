import fetch from 'node-fetch';

import {
  fuzzySearch,
  getHiscoreType,
  getSkillIndex,
  getActivityIndex,
  apiUrl,
  apiItemsUrl,
  GameMode,
  transformPriceData,
} from '../utils/index.js';

/**
 * Returns the ID of the item matching the given name.
 * @param {string} name - The name of the item to search for.
 * @param {string} gameMode - The game mode (e.g., 'osrs', 'rs').
 * @returns {Promise<string>} The ID of the item.
 */
export const getItemId = async (name, gameMode) => {
  try {
    const response = await fetch(apiItemsUrl(gameMode));
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

/**
 * Returns the details of the item matching the given ID.
 * @param {string} id - The ID of the item to get details for.
 * @param {string} gameMode - The game mode (e.g., 'osrs', 'rs').
 * @returns {Promise<Object>} The details of the item.
 */
export const getItemDetails = async (id, gameMode) => {
  try {
    const endpoint =
      gameMode === GameMode.RS ? `_rs/api/catalogue/detail.json?item=${id}` : `/api/catalogue/detail.json?item=${id}`;

    const response = await fetch(apiUrl('itemdb', endpoint, gameMode));
    const data = await response.json();

    return {
      content: [{ type: 'text', text: JSON.stringify(data) }],
    };
  } catch (error) {
    return {
      isError: true,
      content: [
        {
          type: 'text',
          text: `Error: ${error.message}`,
        },
      ],
    };
  }
};

/**
 * Returns the price history of the item matching the given ID.
 * 180 days of price history is available.
 * @param {string} id - The ID of the item to get price history for.
 * @param {string} gameMode - The game mode (e.g., 'osrs', 'rs').
 * @returns {Promise<Object>} The price history of the item.
 */
export const getItemPriceHistory = async (id, gameMode) => {
  try {
    const endpoint = gameMode === GameMode.RS ? `_rs/api/graph/${id}.json` : `/api/graph/${id}.json`;

    const response = await fetch(apiUrl('itemdb', endpoint, gameMode));
    const data = await response.json();

    return {
      content: [{ type: 'text', text: JSON.stringify(transformPriceData(data)) }],
    };
  } catch (error) {
    return {
      isError: true,
      content: [
        {
          type: 'text',
          text: `Error: ${error.message}`,
        },
      ],
    };
  }
};

/**
 * Returns the hiscores of the player matching the given name and type.
 * @param {string} name - The name of the player to get hiscores for.
 * @param {string} type - The type of hiscores to get (e.g., 'ironman', 'hardcore_ironman').
 * @param {string} gameMode - The game mode (e.g., 'osrs', 'rs').
 * @returns {Promise<Object>} The hiscores of the player.
 */
export const getPlayerHiscores = async (name, type, gameMode) => {
  try {
    const hiscoreType = getHiscoreType(type);
    const endpoint = hiscoreType ? `_${hiscoreType}/index_lite.json?player=${name}` : `/index_lite.json?player=${name}`;

    const response = await fetch(apiUrl('hiscore', endpoint, gameMode));
    const data = await response.json();

    return {
      content: [{ type: 'text', text: JSON.stringify(data) }],
    };
  } catch (error) {
    return {
      isError: true,
      content: [
        {
          type: 'text',
          text: `Error: ${error.message}`,
        },
      ],
    };
  }
};

/**
 * Returns the top rankings of the skill or activity matching the given name.
 * @param {string} name - The name of the skill or activity to get top rankings for.
 * @param {number} size - The number of rankings to get.
 * @param {string} gameMode - The game mode (e.g., 'osrs', 'rs').
 * @returns {Promise<Object>} The top rankings of the skill or activity.
 */
export const getTopRankings = async (name, size, gameMode) => {
  try {
    const skillIndex = getSkillIndex(name);
    const activityIndex = getActivityIndex(name);
    const category = skillIndex !== -1 ? '0' : '1';
    const endpoint = `/ranking.json?table=${skillIndex !== -1 ? skillIndex : activityIndex}&category=${category}&size=${size}`;

    if (skillIndex === -1 && getActivityIndex(name) === -1) {
      throw new Error(`Unknown skill or activity: ${name}`);
    }

    const response = await fetch(apiUrl('hiscore', endpoint, gameMode));
    const data = await response.json();

    return {
      content: [{ type: 'text', text: JSON.stringify(data) }],
    };
  } catch (error) {
    return {
      isError: true,
      content: [
        {
          type: 'text',
          text: `Error: ${error.message}`,
        },
      ],
    };
  }
};

/**
 * Returns the current player count of the RuneScape server.
 * @returns {Promise<Object>} The current player count of the RuneScape server.
 */
export const getPlayerCount = async () => {
  try {
    const response = await fetch(
      'https://www.runescape.com/player_count.js?varname=iPlayerCount&callback=jQuery000000000000000_0000000000&_=0',
    );
    const data = await response.text();

    return {
      content: [{ type: 'text', text: JSON.stringify(data) }],
    };
  } catch (error) {
    return {
      isError: true,
      content: [
        {
          type: 'text',
          text: `Error: ${error.message}`,
        },
      ],
    };
  }
};

/**
 * Returns the total number of RS accounts created.
 * @returns {Promise<Object>} The total number of RS users.
 */
export const getRSUserTotal = async () => {
  try {
    const endpoint = '/rsusertotal.ws';
    const response = await fetch(apiUrl('account-creation-reports', endpoint, GameMode.RS));
    const data = await response.json();

    return {
      content: [{ type: 'text', text: JSON.stringify(data) }],
    };
  } catch (error) {
    return {
      isError: true,
      content: [
        {
          type: 'text',
          text: `Error: ${error.message}`,
        },
      ],
    };
  }
};
