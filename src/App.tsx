import s from "./App.module.css";

import { useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import InfiniteScroll from "react-infinite-scroller";

import { searchUser } from "./lib/api";

import { SearchForm } from "./components/SearchForm/SearchForm";
import { UserCard } from "./components/UserCard/UserCard";

function App() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ["searchUser", searchQuery],
    queryFn: ({ pageParam }) => searchUser(searchQuery, pageParam),
    getNextPageParam: (lastPage, _, pageParam) => {
      if (!lastPage.hasNext) return undefined;
      return pageParam + 1;
    },
    initialPageParam: 1,
    enabled: !!searchQuery,
  });

  const items = data?.pages.flatMap((page) => page.items) ?? [];

  return (
    <div className={s.container}>
      <header>
        <h1>ghfinder</h1>
      </header>
      <main className={s.content}>
        <SearchForm onSubmit={({ q }) => setSearchQuery(q)} />
        <div className={s.scrollWrapper}>
          <InfiniteScroll
            loadMore={() => fetchNextPage()}
            hasMore={hasNextPage}
            useWindow={false}
          >
            {items.map((user) => (
              <UserCard
                key={user.id}
                login={user.login}
                id={user.id}
                avatar_url={user.avatar_url}
                url={user.url}
              />
            ))}
          </InfiniteScroll>
        </div>
      </main>
    </div>
  );
}

export default App;
