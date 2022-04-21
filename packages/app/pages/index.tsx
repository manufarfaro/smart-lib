import Link from 'next/link'
import { useState } from 'react'
import {
  ViewerQuery,
  useViewerQuery,
  useUpdateNameMutation,
  ViewerDocument,
} from '../lib/viewer.graphql'
import { initializeApollo } from '../lib/apollo'

const Index = () => {
  const { viewer } = useViewerQuery().data!
  const [newName, setNewName] = useState('')
  const [updateNameMutation] = useUpdateNameMutation()

  const onChangeName = () => {
    updateNameMutation({
      variables: {
        name: newName,
      },
      //Follow apollo suggestion to update cache
      //https://www.apollographql.com/docs/angular/features/cache-updates/#update
      update: (cache, mutationResult) => {
        const { data } = mutationResult
        if (!data) return // Cancel updating name in cache if no data is returned from mutation.
        // Read the data from our cache for this query.
        const { viewer } = cache.readQuery({
          query: ViewerDocument,
        }) as ViewerQuery
        const newViewer = { ...viewer }
        // Add our comment from the mutation to the end.
        newViewer.name = data.updateName.name
        // Write our data back to the cache.
        cache.writeQuery({ query: ViewerDocument, data: { viewer: newViewer } })
      },
    })
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
      <div>
        You're signed in as {viewer.name} and you're {viewer.status}.
      </div>
      <div>
        Go to the{' '}
        <Link href="/about">
          <a className='text-blue-600 underline'>about</a>
        </Link>{' '}
        page.
      </div>
        <div className="mt-6">
          <input
            type="text"
            placeholder="your new name..."
            onChange={(e) => setNewName(e.target.value)}
            className='mt-1 mr-2 px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400'
          />
          <input className='bg-sky-500 hover:bg-sky-700 px-5 py-2.5 text-sm leading-5 rounded-md font-semibold text-white' type="button" value="change" onClick={onChangeName} />
        </div>
      </main>
      
    </div>
  )
}

export async function getStaticProps() {
  const apolloClient = initializeApollo()

  await apolloClient.query({
    query: ViewerDocument,
  })

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
  }
}

export default Index
