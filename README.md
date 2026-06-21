# Attestr MCP Server

Web3 Intelligence tools for Claude — contract risk analysis, DeFi research, Hyperliquid vault analysis, and full due diligence.

## Tools

| Tool | Input | What it does |
|---|---|---|
| `check_contract_risk` | `address` | On-chain analysis via Etherscan (Base) + Groq → SAFE/CAUTION/DANGEROUS badge + score/100 |
| `research_web3` | `query` | Serper web search + source verification + Groq synthesis → research report + confidence score |
| `analyze_hyperliquid_vault` | `vault_address` | Hyperliquid API → TVL, APR, risk score + YES/NO deposit recommendation |
| `full_due_diligence` | `query` | Research + risk in parallel → combined report + overall confidence |

## Install in Claude Desktop

Add to `claude_desktop_config.json`:

**Mac:** `~/Library/Application Support/Claude/claude_desktop_config.json`  
**Windows:** `%APPDATA%\Claude\claude_desktop_config.json`

```json
{
  "mcpServers": {
    "attestr": {
      "command": "npx",
      "args": ["ts-node", "D:\\Attestr\\src\\mcp\\index.ts"],
      "env": {
        "GROQ_API_KEY": "your_groq_key",
        "SERPER_API_KEY": "your_serper_key",
        "ETHERSCAN_API_KEY": "your_etherscan_key"
      }
    }
  }
}
```

Restart Claude Desktop — the 4 Attestr tools will appear automatically.

## Install in Claude Code

```bash
claude mcp add attestr -- npx ts-node D:\Attestr\src\mcp\index.ts
```

Or add to your project's `.claude/mcp.json`:

```json
{
  "mcpServers": {
    "attestr": {
      "command": "npx",
      "args": ["ts-node", "D:\\Attestr\\src\\mcp\\index.ts"]
    }
  }
}
```

## Run manually

```bash
cd D:\Attestr
npm run mcp
```

## Example tool calls

### Check contract risk
```
check_contract_risk("0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913")
```
Returns:
```json
{
  "address": "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
  "badge": "SAFE",
  "riskScore": 10,
  "reasons": ["Verified source code", "Known FiatTokenProxy pattern"],
  "report": "## Risk Summary\n..."
}
```

### Research a Web3 topic
```
research_web3("What are the risks of using Uniswap V4 hooks?")
```
Returns: executive summary, key findings, risk assessment, recommendations, confidence score 0–100, verified/unverified source lists.

### Analyze a Hyperliquid vault
```
analyze_hyperliquid_vault("0x010461C14e146ac35Fe42271BDC1134EE31C703a")
```
Returns:
```json
{
  "name": "HLP",
  "tvlUsd": 420000,
  "apr": 18.5,
  "commission": 10,
  "badge": "SAFE",
  "riskScore": 22,
  "depositRecommendation": "YES",
  "recommendationReason": "Established vault with verified TVL and sustainable APR"
}
```

### Full due diligence
```
full_due_diligence("Is Aave V3 safe on Base? Contract: 0xA238Dd80C259a72e81d7e4664a9801593F98d1c5")
```
Returns: combined markdown report with research findings + contract risk analysis + overall confidence score.

## Environment variables

Copy `.env.example` to `.env` and fill in:

```
GROQ_API_KEY=
SERPER_API_KEY=
ETHERSCAN_API_KEY=
```
