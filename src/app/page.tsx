'use client'

import React, { useState } from 'react'
import { AcrossResponse, CHAIN_EXPLORERS, CHAIN_NAMES } from '@/types/across'

export default function Home() {
  const [txHash, setTxHash] = useState('')
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<AcrossResponse | null>(null)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const response = await fetch(`https://app.across.to/api/deposit/status?depositTxHash=${txHash}`)
      const data = await response.json()
      setData(data)
    } catch (err) {
      setError('Failed to fetch data. Please check the transaction hash.')
    } finally {
      setLoading(false)
    }
  }

  const getExplorerLink = (chainId: number, hash: string) => {
    const explorer = CHAIN_EXPLORERS[chainId as keyof typeof CHAIN_EXPLORERS]
    return explorer ? `${explorer}/tx/${hash}` : '#'
  }

  return (
    <main className="min-h-screen p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-8">Across Bridge Transaction Query</h1>
      
      <form onSubmit={handleSubmit} className="mb-8">
        <input
          type="text"
          value={txHash}
          onChange={(e) => setTxHash(e.target.value)}
          placeholder="Enter transaction hash..."
          className="w-full p-2 border rounded mb-4"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
        >
          {loading ? 'Querying...' : 'Query'}
        </button>
      </form>

      {error && <div className="text-red-500 mb-4">{error}</div>}

      {data && (
        <div className="space-y-4 bg-gray-50 p-4 rounded">
          <div>
            <span className="font-bold">Status: </span>
            <span className={
              data.status === 'filled' ? 'text-green-500' : 
              data.status === 'refunded' ? 'text-red-500' : 'text-yellow-500'
            }>
              {data.status.charAt(0).toUpperCase() + data.status.slice(1)}
            </span>
          </div>
          
          <div>
            <span className="font-bold">Source Chain: </span>
            {CHAIN_NAMES[data.originChainId as keyof typeof CHAIN_NAMES] || data.originChainId}
          </div>
          
          <div>
            <span className="font-bold">Destination Chain: </span>
            {CHAIN_NAMES[data.destinationChainId as keyof typeof CHAIN_NAMES] || data.destinationChainId}
          </div>
          
          <div>
            <span className="font-bold">Deposit Transaction: </span>
            <a 
              href={getExplorerLink(data.originChainId, data.depositTxHash)}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline break-all"
            >
              {data.depositTxHash}
            </a>
          </div>
          
          {data.fillTx && (
            <div>
              <span className="font-bold">Fill Transaction: </span>
              <a 
                href={getExplorerLink(data.destinationChainId, data.fillTx)}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline break-all"
              >
                {data.fillTx}
              </a>
            </div>
          )}
          
          {data.depositRefundTxHash && (
            <div>
              <span className="font-bold">Refund Transaction: </span>
              <a 
                href={getExplorerLink(data.originChainId, data.depositRefundTxHash)}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline break-all"
              >
                {data.depositRefundTxHash}
              </a>
            </div>
          )}
        </div>
      )}
    </main>
  )
} 