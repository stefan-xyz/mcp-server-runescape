export const GET_ITEM_DETAIL_TOOL = {
  name: 'get_item_details',
  description:
    'Returns the current price and price trends information on tradeable items in the Grand Exchange, the category, item image and examine for the given item id.',
  inputSchema: {
    type: 'object',
    properties: {
      itemName: {
        type: 'string',
        description: 'The id of the item you want to get the price for',
      },
    },
  },
};

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
      mode: {
        type: 'string',
        description:
          "The mode of the game, this can be 'ironman', 'hardcore_ironman' leave empty string '' if no mode is specified.",
      },
    },
  },
};

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
        description: 'The number of rankings to return, this can be 1-50, default is 25.',
      },
    },
  },
};

export const GET_PLAYER_COUNT_TOOL = {
  name: 'get_player_count',
  description: 'Returns the number of players currently online in RuneScape and Old School RuneScape.',
  inputSchema: {
    type: 'object',
  },
};

export const GET_RSUSER_TOTAL_TOOL = {
  name: 'get_rsuser_total',
  description:
    'Returns the current amount of accounts created that can access any form of RuneScape. This includes accounts made on FunOrb or a particular version of RuneScape.',
  inputSchema: {
    type: 'object',
  },
};
