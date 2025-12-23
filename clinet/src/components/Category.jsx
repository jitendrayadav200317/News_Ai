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
    const response = await axios.get(
      `${
        import.meta.env.VITE_API_URL
      }/api/news/${category}?page=${pageParam}&pageSize=10`
    );
    return response.data;
  };
  const { data, hasNextPage, fetchNextPage, status, isLoading } =
    useInfiniteQuery({
      queryKey: ["category", category],
      queryFn: fetchNewsByCategory,
      getNextPageParam: (lastPage) => {
        // console.log('lastPage: ', lastPage);

        return lastPage.nextPage;
      },
    });
  console.log(data);
  return (
    <div className="py-12 px-10 max-w-5xl mx-auto">
      <h1 className="text-center space-y-10 my-6 font-bold text-3xl">
        Categories
      </h1>

      <Tabs value={category} onChange={setCategory}>
        <Tabs.List>
          {categories.map((cat) => (
            <Tabs.Tab value={cat} key={cat}>
              {cat}
            </Tabs.Tab>
          ))}
        </Tabs.List>
      </Tabs>
      <div className="mt-14">
        <InfiniteScroll
          dataLength={
            data?.pages.length >= 0 &&
            data?.pages.reduce(
              (total, page) => total + page.news.length,
              0 || 0
            )
          }
          next={fetchNextPage}
          hasMore={hasNextPage}
          loader={<h4>Loading...</h4>}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>Yay! You have seen it all</b>
            </p>
          }>
            {
            data?.pages.map((page,index)=>{
              page.news.map((article)=>{
                console.log(article);
                
              })
              
            })
          }
          </InfiniteScroll>
      </div>
    </div>
  );
}

export default Category;
