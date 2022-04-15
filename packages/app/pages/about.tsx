import Link from 'next/link'

export default function About() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
        <div>
          Welcome to the about page. Go to the{' '}
          <Link href="/">
            <a className='text-blue-600 underline'>Home</a>
          </Link>{' '}
          page.
        </div>
      </main>
    </div>
  )
}
