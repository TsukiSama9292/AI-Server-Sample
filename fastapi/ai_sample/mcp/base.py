from langchain_mcp_adapters.client import MultiServerMCPClient

client = MultiServerMCPClient(
    {
        "My App": {
            "transport": "streamable_http",
            "url": "http://ai_server_sample_mcp:6277/mcp"
        },
    }
)
tools = client.get_tools()