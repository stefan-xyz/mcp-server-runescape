/**
 * The get item details tool.
 */
export const GET_ITEM_DETAIL_TOOL = {
  name: 'get_item_details',
  description:
    'Returns the current price and price trends information on tradeable items in the Grand Exchange, the category, item image and examine for the given item id.',
  inputSchema: {
    type: 'object',
    properties: {
      itemName: {
        type: 'string',
        description: 'The name of the item you want to get the details for',
      },
      gameMode: {
        type: 'string',
        description: 'The mode of the game, this can be "osrs" or "rs". osrs = old school runescape, rs = runescape',
        default: 'osrs',
      },
    },
    required: ['itemName'],
  },
};

/**
 * The get item price history tool.
 */
export const GET_ITEM_PRICE_HISTORY_TOOL = {
  name: 'get_item_price_history',
  description:
    'Returns the prices each day of a given item for the previous 180 days. This is useful for seeing the price trends of an item over time.',
  inputSchema: {
    type: 'object',
    properties: {
      itemName: {
        type: 'string',
        description: 'The name of the item you want to get the graph for',
      },
      gameMode: {
        type: 'string',
        description: 'The mode of the game, this can be "osrs" or "rs". osrs = old school runescape, rs = runescape',
        default: 'osrs',
      },
    },
    required: ['itemName'],
  },
};

/**
 * The get player hiscores tool.
 */
export const GET_PLAYER_HISCORES_TOOL = {
  name: 'get_player_hiscores',
  description:
    'Returns the players hiscores data which includes the rankings and experience for skills and activities.',
  inputSchema: {
    type: 'object',
    properties: {
      playerName: {
        type: 'string',
        description: 'The name of the player.',
      },
      type: {
        type: 'string',
        description:
          "The mode of the game, this can be 'ironman', 'hardcore_ironman' leave empty if no mode is specified.",
      },
      gameMode: {
        type: 'string',
        description: 'The mode of the game, this can be "osrs" or "rs". osrs = old school runescape, rs = runescape',
        default: 'osrs',
      },
    },
    required: ['playerName'],
  },
};

/**
 * The get top rankings tool.
 */
export const GET_TOP_RANKINGS_TOOL = {
  name: 'get_top_rankings',
  description: 'Returns the top rankings (max 50) for a given skill or activity.',
  inputSchema: {
    type: 'object',
    properties: {
      name: {
        type: 'string',
        description: 'The name of the skill or activity.',
      },
      size: {
        type: 'number',
        description: 'The number of rankings to return, this can be max 50',
        default: 25,
      },
      gameMode: {
        type: 'string',
        description: 'The mode of the game, this can be "osrs" or "rs". osrs = old school runescape, rs = runescape',
        default: 'osrs',
      },
    },
    required: ['name'],
  },
};

/**
 * The get player count tool.
 */
export const GET_PLAYER_COUNT_TOOL = {
  name: 'get_player_count',
  description: 'Returns the number of players currently online in RuneScape and Old School RuneScape.',
  inputSchema: {
    type: 'object',
  },
};

/**
 * The get rsuser total tool (accounts created).
 */
export const GET_RSUSER_TOTAL_TOOL = {
  name: 'get_rsuser_total',
  description:
    'Returns the current amount of accounts created that can access any form of RuneScape. This includes accounts made on FunOrb or a particular version of RuneScape.',
  inputSchema: {
    type: 'object',
  },
};
