import { useCallback, useEffect, useState } from 'react';
import Book from './Book';
import { getLibraryContract } from '../lib/web3';

function BookList() {
  const [books, setBooks] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleClick = useCallback((e) => {
    e.preventDefault();
  }, []);

  const fetchBooks = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const contract = await getLibraryContract()
      if (!contract) {
        setLoading(false)
        return
      }
      const [finished, unfinished] = await Promise.all([
        contract.getFinishedBooks(),
        contract.getUnfinishedBooks(),
      ])
      const normalize = (arr: any[]) =>
        arr.map((b: any) => ({
          id: Number(b.id),
          name: b.name,
          year: Number(b.year),
          author: b.author,
          isFinished: Boolean(b.isFinished),
        }))
      setBooks([...normalize(unfinished), ...normalize(finished)])
    } catch (e: any) {
      // eslint-disable-next-line no-console
      console.error(e)
      setError(e?.message ?? 'Failed to load books')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    let mounted = true
    ;(async () => {
      if (!mounted) return
      await fetchBooks()
    })()
    const anyWindow = window as any
    if (anyWindow?.ethereum) {
      const onAccountsChanged = () => fetchBooks()
      const onChainChanged = () => fetchBooks()
      anyWindow.ethereum.on?.('accountsChanged', onAccountsChanged)
      anyWindow.ethereum.on?.('chainChanged', onChainChanged)
      return () => {
        mounted = false
        anyWindow.ethereum.removeListener?.('accountsChanged', onAccountsChanged)
        anyWindow.ethereum.removeListener?.('chainChanged', onChainChanged)
      }
    }
    return () => { mounted = false }
  }, [fetchBooks])

  return (
    <div className="bg-white">
      <div className="max-w-2xl mx-auto px-2 sm:py-8 sm:px-6 lg:max-w-7xl">  
        {loading && <span className="text-sm text-gray-500">Loading…</span>}
        {error && <span className="text-sm text-red-600 ml-3">{error}</span>}
        <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {books.map((book) => <Book key={book.id} {...book} onClick={handleClick} />)}
        </div>
      </div>
    </div>
  )
}

export default BookList;