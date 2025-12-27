import { Tabs } from "@mantine/core";
import axios from "axios";
import React, { useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import InfiniteScroll from "react-infinite-scroll-component";
import ArticleCard from "./ArticleCard";
import { Skeleton } from "@mantine/core";

function Category() {
  const [category, setCategory] = useState("General");

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
          loader={
            <p style={{ textAlign: "center", marginTop: "20px" }}>
              <b>Loading...</b>
            </p>
          }
          endMessage={
            <p style={{ textAlign: "center", marginTop: "20px" }}>
              <b>NO More News</b>
            </p>
          }
        >
          {isLoading ? (
            <div className="space-y-6">
              <Skeleton height={500} />
              <Skeleton height={20} />
              <Skeleton height={30} />
            </div>
          ) : (
            <div className="space-y-6">
              {data?.pages.length >= 0 &&
                data?.pages.map((page, index) =>
                  page.news.map((article) => (
                    <ArticleCard
                      key={article._id || article.url}
                      article={article}
                      category={category}
                    />
                  ))
                )}
            </div>
          )}
        </InfiniteScroll>
      </div>
    </div>
  );
}

export default Category;
