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
