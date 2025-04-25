import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { CallToolRequestSchema, ListToolsRequestSchema } from '@modelcontextprotocol/sdk/types.js';
import {
  GET_ITEM_DETAIL_TOOL,
  GET_PLAYER_COUNT_TOOL,
  GET_PLAYER_HISCORES_TOOL,
  GET_TOP_RANKINGS_TOOL,
  GET_RSUSER_TOTAL_TOOL,
} from './tools/index.js';
import {
  getItemDetails,
  getItemId,
  getPlayerHiscores,
  getTopRankings,
  getPlayerCount,
  getRSUserTotal,
} from './actions/index.js';

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

server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      GET_ITEM_DETAIL_TOOL,
      GET_PLAYER_HISCORES_TOOL,
      GET_TOP_RANKINGS_TOOL,
      GET_PLAYER_COUNT_TOOL,
      GET_RSUSER_TOTAL_TOOL,
    ],
  };
});

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;
  try {
    switch (name) {
      case 'get_item_details': {
        const { itemName } = args;
        const id = await getItemId(itemName);
        const data = await getItemDetails(id);

        return {
          content: [{ type: 'text', text: JSON.stringify(data) }],
        };
      }
      case 'get_player_hiscores': {
        const { playerName, mode } = args;
        const data = await getPlayerHiscores(playerName, mode);

        return {
          content: [{ type: 'text', text: JSON.stringify(data) }],
        };
      }
      case 'get_top_rankings': {
        const { name, size } = args;
        const data = await getTopRankings(name, size || 25);

        return {
          content: [{ type: 'text', text: JSON.stringify(data) }],
        };
      }
      case 'get_player_count': {
        const data = await getPlayerCount();

        return {
          content: [{ type: 'text', text: JSON.stringify(data) }],
        };
      }
      case 'get_rsuser_total': {
        const data = await getRSUserTotal();

        return {
          content: [{ type: 'text', text: JSON.stringify(data) }],
        };
      }
      default:
        throw new Error(`Unknown tool: ${name}`);
    }
  } catch (error) {
    if (error) {
      throw new Error(`Error: ${error.status} ${JSON.stringify(error.body) || error.message || '(unknown error)'}`);
    }

    throw error;
  }
});

const transport = new StdioServerTransport();
await server.connect(transport);
