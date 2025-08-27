import { BrowserProvider, JsonRpcSigner, isAddress } from 'ethers'
import { contractAddress } from '../config'
import { LibraryFactory } from '@manufarfaro/sl-contracts'

export function getProvider(): BrowserProvider | null {
  if (typeof window === 'undefined') return null
  const anyWindow = window as any
  if (!anyWindow.ethereum) return null
  return new BrowserProvider(anyWindow.ethereum)
}

export async function getSigner(): Promise<JsonRpcSigner | null> {
  const provider = getProvider()
  if (!provider) return null
  await provider.send('eth_requestAccounts', [])
  return await provider.getSigner()
}

export async function getLibraryContract() {
  const signer = await getSigner()
  if (!signer) return null
  if (!contractAddress) throw new Error('Missing NEXT_PUBLIC_LIBRARY_CONTRACT_ADDRESS')
  if (!isAddress(contractAddress)) {
    throw new Error(`Invalid contract address: ${contractAddress}`)
  }
  const provider = signer.provider
  if (!provider) throw new Error('No provider')
  const code = await provider.getCode(contractAddress)
  if (code === '0x') {
    const net = await provider.getNetwork()
    throw new Error(`No contract code at ${contractAddress} on chain ${net.chainId.toString()}. Did you deploy and set NEXT_PUBLIC_LIBRARY_CONTRACT_ADDRESS?`)
  }
  return LibraryFactory.connect(contractAddress, signer)
}


