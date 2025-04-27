import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { CallToolRequestSchema, ListToolsRequestSchema, McpError, ErrorCode } from '@modelcontextprotocol/sdk/types.js';
import {
  GET_ITEM_DETAIL_TOOL,
  GET_ITEM_PRICE_HISTORY_TOOL,
  GET_PLAYER_COUNT_TOOL,
  GET_PLAYER_HISCORE_TOOL,
  GET_TOP_RANKINGS_TOOL,
  GET_RSUSER_TOTAL_TOOL,
} from './tools/index.js';
import {
  getItemDetails,
  getItemId,
  getPlayerHiscore,
  getTopRankings,
  getPlayerCount,
  getRSUserTotal,
  getItemPriceHistory,
} from './actions/index.js';

/**
 * The server instance.
 */
const server = new Server(
  {
    name: 'mcp-server-runescape',
    version: '1.0.0',
  },
  {
    capabilities: {
      tools: {},
    },
  },
);

/**
 * Handles the list of tools request.
 * @param {ListToolsRequestSchema} request - The list of tools request.
 * @returns {Promise<Object>} The list of tools.
 */
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      GET_ITEM_DETAIL_TOOL,
      GET_ITEM_PRICE_HISTORY_TOOL,
      GET_PLAYER_HISCORE_TOOL,
      GET_TOP_RANKINGS_TOOL,
      GET_PLAYER_COUNT_TOOL,
      GET_RSUSER_TOTAL_TOOL,
    ],
  };
});

/**
 * Handles the call tool request.
 * @param {CallToolRequestSchema} request - The call tool request.
 * @returns {Promise<Object>} The call tool response.
 */
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;
  try {
    switch (name) {
      case 'get_item_details': {
        const { itemName, gameMode } = args;
        const id = await getItemId(itemName, gameMode);

        return getItemDetails(id, gameMode || 'osrs');
      }
      case 'get_item_price_history': {
        const { itemName, gameMode } = args;
        const id = await getItemId(itemName, gameMode);

        return getItemPriceHistory(id, gameMode);
      }
      case 'get_player_hiscore': {
        const { playerName, type, gameMode } = args;

        return getPlayerHiscore(playerName, type, gameMode);
      }
      case 'get_top_rankings': {
        const { name, size, gameMode } = args;

        return getTopRankings(name, size, gameMode);
      }
      case 'get_player_count': {
        return getPlayerCount();
      }
      case 'get_rsuser_total': {
        return getRSUserTotal();
      }
      default:
        throw new McpError(ErrorCode.MethodNotFound, `Unknown tool: ${request.params.name}`);
    }
  } catch (error) {
    return {
      content: [
        {
          type: 'text',
          text: `Error: ${error instanceof Error ? error.message : String(error)}`,
        },
      ],
      isError: true,
    };
  }
});

const transport = new StdioServerTransport();
await server.connect(transport);
