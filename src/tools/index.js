/**
 * The get item details tool.
 */
export const GET_ITEM_DETAIL_TOOL = {
  name: 'get_item_details',
  description: `
    Returns the current price and price trends information on tradeable items in the Grand Exchange, the category, item image and examine for the given item.
    Examples: 
    - Single: "What is the price of a dragon scimitar?"
    - Multi comparison: "Compare the price of a dragon scimitar and a rune scimitar"     
    - "Torva full helm price" 
    - "Current price of a dragon pickaxe"
    - "How much percentage has the price of a dragon pickaxe changed in the past 30 days?"
    - "How much percentage has the price of a dragon pickaxe changed in the past 90 days?"
    - "How much percentage has the price of a dragon pickaxe changed in the past 180 days?"
    - "Give me the description of an armadyl godsword"
    - "Give me the icon of a dragon scimitar"
    - "What is the id of an abyssal whip?"    
    `,
  inputSchema: {
    type: 'object',
    properties: {
      itemName: {
        type: 'string',
        description: 'The name of the item you want to get the details for.',
      },
      gameMode: {
        type: 'string',
        description: 'The mode of the game, this can be "osrs" or "rs". osrs = old school runescape, rs = runescape',
        default: 'osrs',
      },
    },
    required: ['itemName', 'gameMode'],
  },
};

/**
 * The get item price history tool.
 */
export const GET_ITEM_PRICE_HISTORY_TOOL = {
  name: 'get_item_price_history',
  description: `
    Returns the prices each day of a given item for the previous 180 days. This is useful for seeing the price trends of an item over time. Usefull for when someone asks all price history of an item.
    Examples:
    - Single: "Price history of a dragon scimitar?"
    - Multi comparison: "Compare all price history of a dragon scimitar and a rune scimitar"
    - "All prices for a dragon scimitar"
    - "Rune scimitar price on 1 april 2025"  
    `,
  inputSchema: {
    type: 'object',
    properties: {
      itemName: {
        type: 'string',
        description: 'The name of the item you want to get the price history for.',
      },
      gameMode: {
        type: 'string',
        description: 'The mode of the game, this can be "osrs" or "rs". osrs = old school runescape, rs = runescape',
        default: 'osrs',
      },
    },
    required: ['itemName', 'gameMode'],
  },
};

/**
 * The get player hiscore tool.
 */
export const GET_PLAYER_HISCORE_TOOL = {
  name: 'get_player_hiscore',
  description: `
    Returns a player's rank, level and experience or score in an activity.
    Examples:
    - Single: "What rank is Zezima?"
    - Multi comparison: "Compare Zezima and Lynx Titan"
    - "What rank is Zezima on runescape?"
    - "How much experience does Lynx Titan have overall?"
    - "Iron Hyger ironman?"
  `,
  inputSchema: {
    type: 'object',
    properties: {
      playerName: {
        type: 'string',
        description: 'The name of the player you want to get the hiscore for.',
      },
      type: {
        type: 'string',
        description:
          'The type of game you want to get the hiscore for. Leave empty if no type is specified. Types: ironman, hardcore_ironman, ultimate, deadman, seasonal (leagues), tournament, fresh_start',
      },
      gameMode: {
        type: 'string',
        description: 'The mode of the game, this can be "osrs" or "rs". osrs = old school runescape, rs = runescape',
        default: 'osrs',
      },
    },
    required: ['playerName', 'gameMode'],
  },
};

/**
 * The get top rankings tool.
 */
export const GET_TOP_RANKINGS_TOOL = {
  name: 'get_top_rankings',
  description: `
    Returns up to the top 50 players in a given skill or activity.
    Examples:
    - Single: "Top 10 players overall?"
    - Multi comparison: "Compare the top 10 defence and attack rankings"
    - "Give me the top 50 attack rankings"
    - "Number one agility on runescape?"
    - "Most zulrah kills?"
    - "Give me the top 5 jad rankings"
  `,
  inputSchema: {
    type: 'object',
    properties: {
      name: {
        type: 'string',
        description: 'The name of the skill or activity.',
      },
      size: {
        type: 'number',
        description: 'The number of rankings to return, this can be max 50.',
        default: 25,
      },
      gameMode: {
        type: 'string',
        description: 'The mode of the game, this can be "osrs" or "rs". osrs = old school runescape, rs = runescape',
        default: 'osrs',
      },
    },
    required: ['name', 'gameMode'],
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
