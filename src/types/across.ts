export interface AcrossResponse {
  status: string
  originChainId: number
  depositId: string
  depositTxHash: string
  fillTx: string
  destinationChainId: number
  depositRefundTxHash: string | null
  pagination: {
    currentIndex: number
    maxIndex: number
  }
}

// Only include explorers that we know are available and stable
export const CHAIN_EXPLORERS = {
    1: 'https://etherscan.io',
    10: 'https://optimistic.etherscan.io',
    130: 'https://unichain.blockscout.com/',
    137: 'https://polygonscan.com',
    232: 'https://explorer.lens.xyz',
    324: 'https://explorer.zksync.io',
    480: 'https://worldscan.org',
    690: 'https://explorer.redstone.xyz',
    1135: 'https://blockscout.lisk.com/',
    1868: 'https://soneium.blockscout.com',
    8453: 'https://basescan.org',
    34443: 'https://mode.blockscout.com',
    41455: 'https://evm-explorer.alephzero.org',
    42161: 'https://arbiscan.io',
    57073: 'https://explorer.inkonchain.com',
    59144: 'https://lineascan.build',
    81457: 'https://blastscan.io',
    534352: 'https://scrollscan.com',
    7777777: 'https://explorer.zora.energy'
} as const

// Include all chain names regardless of explorer availability
export const CHAIN_NAMES = {
  1: 'Ethereum',
  10: 'Optimism',
  130: 'Unichain',
  137: 'Polygon',
  232: 'Lens',
  324: 'zkSync',
  480: 'WorldChain',
  690: 'Redstone',
  1135: 'Lisk',
  1868: 'Soneium',
  8453: 'Base',
  34443: 'Mode',
  41455: 'Aleph Zero',
  42161: 'Arbitrum',
  57073: 'Ink',
  59144: 'Linea',
  81457: 'Blast',
  534352: 'Scroll',
  7777777: 'Zora',
} as const 