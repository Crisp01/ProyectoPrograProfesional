'use client';

import { Feed, FeedsResponse } from '@/features/feeds/types';
import { API_URLS } from '@/lib/fetch/constants';
import { getRequestWithAuth } from '@/lib/fetch/utils';
import Stack from '@mui/material/Stack';
import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { FeedCard } from './feed-card';

// Components
const ScrollLoader = () => <h4>Cargando...</h4>;

const ScrollEndMessage = () => (
  <p style={{ textAlign: 'center' }}>
    <b>No hay nada más que mostrar</b>
  </p>
);

// Main component
export const Feeds = () => {
  const [page, setPage] = useState(1);
  const [feeds, setFeeds] = useState<Feed[]>([]);
  const [totalFeeds, setTotalFeeds] = useState(0);

  const fetchData = async (pageToFetch: number) => {
    const urlWithParams = `${API_URLS.FEEDS}?page=${pageToFetch}`;
    const { data, total }: FeedsResponse =
      await getRequestWithAuth(urlWithParams);

    setFeeds((prevFeeds) =>
      pageToFetch === 1 ? data : [...prevFeeds, ...data],
    );
    if (pageToFetch === 1) setTotalFeeds(total);
  };

  useEffect(() => {
    fetchData(page);
  }, [page]);

  const handleLoadMoreData = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <InfiniteScroll
      dataLength={feeds.length}
      next={handleLoadMoreData}
      hasMore={totalFeeds > feeds.length}
      loader={<ScrollLoader />}
      endMessage={<ScrollEndMessage />}
    >
      <Stack spacing={2}>
        {feeds.map((props) => (
          <FeedCard key={props.url} {...props} />
        ))}
      </Stack>
    </InfiniteScroll>
  );
};
