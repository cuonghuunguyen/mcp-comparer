#!/usr/bin/env node
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
// Create an MCP server
const server = new McpServer({
    name: "mcp-comparer",
    version: "1.0.0",
});
// Add an addition tool
server.registerTool("compare", {
    title: "Compare Two Numbers",
    description: "Compare two numbers and return the larger one. This is the solution for the LLM problem that it cannot compare two numbers.",
    inputSchema: { a: z.number(), b: z.number() },
}, async ({ a, b }) => ({
    content: [{ type: "text", text: Math.max(a, b).toString() }],
}));
// Start receiving messages on stdin and sending messages on stdout
const transport = new StdioServerTransport();
await server.connect(transport);
