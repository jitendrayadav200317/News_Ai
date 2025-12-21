import { Tabs } from "@mantine/core";
import axios from "axios";
import React from "react";
import { useState } from "react";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

function Catagory() {
  const [Catagory, setCategory] = useState("Genral");

  const categorie = [
    "Genral",
    "Sport",
    "Political",
    "Business",
    "Entertinment",
    "Movies",
    "science",
  ];
  const fetchNewsByCategory = async (pageParams= 1) => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/news/${Catagory} `,{params:{page:pageParams}}
      );
      return res.data;
    } catch (error) {
      console.log(error);
    }
    const { data} = useQuery({
      queryKey:['name'],
      queryFn:fetchNewsByCategory
    })
    console.log('data',data);
    
  };
  const {data,hasNextPage,fetchNextPage ,status }= useInfiniteQuery({
    queryKey: ["category", Catagory],
    queryFn: fetchNewsByCategory,
    getNextPageParam: (lastPage) => {
      console.log("lastPage", lastPage);
      return lastPage.nextPage;
    },
  });
  console.log(data);
  

  return (
    <div className="text-center space-y-10 font-bold text-2xl">
      <h1 className="text-center space-y-10 my-6 font-bold text-2xl">Categories</h1>
      <Tabs defaultValue="gallery" onChange={(value) => setCategory(value.toLowerCase())}>
        <Tabs.List>
          {categorie.map((cat) => (
            <Tabs.Tab value={cat} key={cat}>
              {cat}
            </Tabs.Tab>
          ))}
        </Tabs.List>
      </Tabs>
    </div>
  );
}
export default Catagory;

{
  /* 
       
          <Tabs.Tab
            value="Bookmark"
            leftSection={<Bookmark size={20} color="orange" />}
          >
            Gallery
          </Tabs.Tab>
          <Tabs.Tab value="Like" leftSection={<Heart size={20} color="red" />}>
            Like News
          </Tabs.Tab>
          <Tabs.Tab value="Preferences" leftSection={<Cog size={20} />}>
            Preferences
          </Tabs.Tab>
          <Tabs.Tab
            value="AI-Recommandation"
            leftSection={<BotMessageSquare size={20} color="blue" />}
          >
            BotMessageSquare
          </Tabs.Tab>
       

        <Tabs.Panel value="Bookmark">Gallery tab content</Tabs.Panel>

        <Tabs.Panel value="Like">Messages tab content</Tabs.Panel>
        <Tabs.Panel value="AI-Recommandation">Messages tab content</Tabs.Panel>

        <Tabs.Panel value="Preferences">Settings tab content</Tabs.Panel>
       */
}
