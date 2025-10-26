'use client'

import React, { useState } from 'react'
// import albedo from '@albedo-link/intent'

export default function TestAlbedoButton() {
    const [result, setResult] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const handleAlbedoPay = async () => {
        setLoading(true)
        setError(null)
        setResult(null)
        try {
            // @ts-ignore
            const albedo = (window as any).albedo || (await import('@albedo-link/intent')).default
            const response = await albedo.pay({
                amount: '10',
                destination: 'GCKOQGMTULKR55EWNHAXXJLTL25J3LT6BHHLBMDAVFKX3E32PCYVBO7M',
                asset_code: 'TST',
                asset_issuer: 'GBX6YUG3KCUEOBZRPN7TXBLMNXDW35XJOKDYFYIISDKDW4Y63LBCW6EI',
                network: 'testnet'
            })
            setResult(JSON.stringify(response, null, 2))
        } catch (e: any) {
            setError(e?.message || 'Unknown error')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div>
            <button
                onClick={handleAlbedoPay}
                disabled={loading}
                style={{
                    padding: '10px 20px',
                    backgroundColor: '#0643a0',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: loading ? 'not-allowed' : 'pointer'
                }}
            >
                {loading ? 'Processing...' : 'Test Albedo Payment'}
            </button>
            {result && (
                <pre style={{ marginTop: 16, background: '#f5f5f5', padding: 12 }}>
                    Result: {result}
                </pre>
            )}
            {error && (
                <div style={{ marginTop: 16, color: 'red' }}>
                    Error: {error}
                </div>
            )}
        </div>
    )
}
