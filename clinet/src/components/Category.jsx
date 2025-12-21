import { Tabs } from "@mantine/core";
import axios from "axios";
import React, { useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import InfiniteScroll from "react-infinite-scroll-component";

function Category() {
  const [category, setCategory] = useState("Genral");

  const categories = [
    "General",
    "Sports",
    "Business",
    "Entertainment",
    "Science",
    "Technology",
    "Health",
  ];

  const fetchNewsByCategory = async ({ pageParam = 1 }) => {
    const res = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/news/${category}`,
      {
        params: { page: pageParam },
      }
    );
    return res.data;
  };

  const { data, fetchNextPage, hasNextPage, status } = useInfiniteQuery({
    queryKey: ["category", category],
    queryFn: fetchNewsByCategory,
    getNextPageParam: (lastPage) => lastPage?.nextPage ?? false,
  });


  const news = data?.pages.flatMap((page) => page.news) ?? [];

  return (
    <div className="text-center space-y-10 font-bold text-2xl">
      <h1 className="my-6">Categories</h1>

      <Tabs value={category} onChange={setCategory}>
        <Tabs.List>
          {categories.map((cat) => (
            <Tabs.Tab value={cat} key={cat}>
              {cat}
            </Tabs.Tab>
          ))}
        </Tabs.List>
      </Tabs>

      <InfiniteScroll
        dataLength={news.length}
        next={fetchNextPage}
        hasMore={!!hasNextPage}
        loader={<h4>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        {news.map((item, index) => (
          item.news.map((article)=>{
            console.log(article);
            
          })
          
        ))}
      </InfiniteScroll>
    </div>
  );
}

export default Category;
