import React, { Suspense } from 'react'
import { dehydrate, HydrationBoundary, useQueryClient } from '@tanstack/react-query'
import { trpc } from '@/trpc/server';
import { Client } from './client';

const page = () => {
  const queryClient = useQueryClient();
  void queryClient.prefetchQuery(trpc.hello.queryOptions({
    text: 'world',
  }))
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<div>Loading...</div>}>
    <Client/>
    </Suspense>
    </HydrationBoundary>
  )
}

export default page