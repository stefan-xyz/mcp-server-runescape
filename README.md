# mcp-server-runescape
[![npm version](https://badge.fury.io/js/mcp-server-runescape.svg)](https://badge.fury.io/js/mcp-server-runescape)
[![smithery badge](https://smithery.ai/badge/@stefan-xyz/mcp-server-runescape)](https://smithery.ai/server/@stefan-xyz/mcp-server-runescape)

This is an MCP server with tools for interacting with RuneScape (RS) and Old School RuneScape (OSRS) data, including item prices, player hiscores, and more.

[Introduction to MCP servers](https://modelcontextprotocol.io/introduction)

## Features

The MCP server provides several tools which are used to answer your questions during gaming with data from accurate sources.

### 1. Item Details (`get_item_details`)

Retrieve comprehensive information about tradeable items, including:

- Current price in the Grand Exchange
- Price trends (24h, 30, 90, and 180 days)
- Name
- Category
- Description (examine text)
- Image
- Members
- ID

https://runescape.wiki/w/Application_programming_interface#detail

### 2. Item Price History (`get_item_price_history`)

Access the price history of an item over the last 180 days, including:

- Price on a given day (timestamp)
- Average price on a given day (timestamp)

https://runescape.wiki/w/Application_programming_interface#Graph

### 3. Player Hiscore (`get_player_hiscore`)

Fetch rankings and experience for skills and activities of any player, including:

- Player rank
- Skill level
- Experience points
- Activity scores

https://runescape.wiki/w/Application_programming_interface#Hiscores_Lite_2

### 4. Top Rankings (`get_top_rankings`)

View the top (max 50) players for a specific skill or activity, including:

- Name
- Score (used for both skill and activity)
- Rank

https://runescape.wiki/w/Application_programming_interface#ranking

### 5. Player Count (`get_player_count`)

Gets the number of players currently online in RuneScape and Old School RuneScape, including:

- Real-time player counts

https://runescape.wiki/w/Application_programming_interface#player_count

### 6. Account Totals (`get_rsuser_total`)

Gets the current amount of accounts created that can access any form of RuneScape. This includes accounts made on FunOrb or a particular version of RuneScape, including:

- Historical accounts creation data

https://runescape.wiki/w/Application_programming_interface#rsusertotal

#### Note

For consistency I tried to only use API endpoints which support both RS and OSRS data.

## Example Use Cases

The goal is for you to have an easy way to fetch more accurate data right from the source while scaping.

Here are some example queries you can ask the AI when using this MCP server:

### Item Details

```
"What is the price of a dragon scimitar in the Grand Exchange?"
"Torva full helm price"
"Current price of a dragon pickaxe"
"How much percentage has the price of a dragon pickaxe changed in the past 30 days?"
"How much percentage has the price of a dragon pickaxe changed in the past 90 days?"
"How much percentage has the price of a dragon pickaxe changed in the past 180 days?"
"Give me the description of an armadyl godsword"
"Give me the icon of a dragon scimitar"
"What is the id of an abbyssal whip?"
```

### Item Price History

```
"Give me the price history of a dragon scimitar"
"Rune scimitar price on 1 april 2025?"
```

### Player Hiscore

```
"What rank is Zezima?"
"What rank is Zezima on runescape?"
"How much experience does Lynx Titan have overall?"
"Iron Hyger ironman rank?"
```

### Top Rankings

```
"Top 10 players overall?"
"Give me the top 50 attack rankings"
"Number one agility on runescape?"
"Most zulrah kills?"
"Give me the top 5 jad rankings"
```

## Getting Started

You can use the MCP server in many clients, for example:

- Claude desktop
- Cursor

### 1. Add the MCP server in your config (NPM Package)

Paste this snippet in your mcp config that your client is using

```json
{
  "mcpServers": {
    "mcp-server-runescape": {
      "command": "npx",
      "args": ["-y", "mcp-server-runescape"]
    }
  }
}
```

You can find the config file in (mac):

- Claude desktop:

`~/Library/Application Support/Claude/claude_desktop_config.json`

- Cursor:

`/Users/name/.cursor/mcp.json`

### 2. From Source

**Required** [Node.js](https://nodejs.org/en) installed on your system

1. Clone this repository
2. Install dependencies:
   ```bash   
   yarn
   ```
   or
   ```bash   
   npm install
   ```
3. Then update your Claude desktop or Cursor with:
   ```json
   {
     "mcpServers": {
       "mcp-server-runescape": {
         "command": "node",
         "args": ["/Users/path/to/mcp-server-runescape/src/server.js"]
       }
     }
   }
   ```
4. **Optional**: Run the debugger/inspector
   ```bash
   yarn dev
   ```
   or
   ```bash   
   npm run build
   ```

Make sure to:

- Replace `/path/to/mcp-server-runescape` with the actual path to your installation.

After updating the configuration, restart Claude desktop or Cursor for the changes to take effect.

#### Personal preference

You can use any client you want, my personal preference goes to Cursor at the moment in combination with deepseek-v3.1 which is performing really well.

[List of clients](https://modelcontextprotocol.io/clients)

## API Documentation

For detailed information about the Runescape API endpoints used by this MCP server, visit:
[RS/Wiki API](https://runescape.wiki/w/Application_programming_interface)

## Thank you

I built this over the weekend, to learn a bit more about MCP servers. Runescape was the perfect subject to try it out on.

- Shout out to the rs/wiki team for the docs and API.

If this helps you out in anyway when scaping and you would like to support me, feel free to buy me a flat white :)

[!["Buy Me A Coffee"](https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png)](https://buymeacoffee.com/stefanxyz)
