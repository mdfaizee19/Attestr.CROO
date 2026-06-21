import dotenv from 'dotenv'; dotenv.config({ override: true });

async function main() {
  const res = await fetch('https://api.hyperliquid.xyz/info', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ type: 'vaultDetails', vaultAddress: '0xdfc24b077bc1425ad1dea75bcb6f8158e10df303' }),
  });
  const raw = (await res.json()) as Record<string, unknown>;
  const keys = Object.keys(raw);
  console.log('Top-level keys:', JSON.stringify(keys));
  for (const k of keys) {
    const v = raw[k];
    if (typeof v !== 'object' || v === null) {
      console.log(' ', k, '=', v);
    } else if (Array.isArray(v)) {
      console.log(' ', k, '= Array[' + (v as unknown[]).length + ']', JSON.stringify((v as unknown[])[0]).slice(0, 200));
    } else {
      console.log(' ', k, '= Object keys:', Object.keys(v as object));
    }
  }
}
main().catch(console.error);
