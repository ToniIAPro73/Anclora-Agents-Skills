# NotebookLM MCP Operations Reference

These tools are typically available via a NotebookLM MCP server (`jacob-bd/notebooklm-mcp-cli` or similar).

| Tool | Usage in Audit |
|------|----------------|
| `notebook_list` | Discovery of available notebooks. |
| `notebook_get` | Reading current instructions and source lists. |
| `source_list` | Detailed metadata for all sources (wordCount, tokenCount). |
| `source_get` | Reading the raw content of a specific source. |
| `source_add` | Adding missing documentation or context. |
| `source_delete` | Pruning redundant or noisy sources. |
| `configure_chat` | Updating the system instructions (up to 10k chars). |
| `notebook_query` | Running validation and stress-test queries. |
| `note_create` | Adding permanent internal summaries or findings. |
