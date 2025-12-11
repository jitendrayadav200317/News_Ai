import { Tabs } from "@mantine/core";
import React from "react";

function Catagory() {
  const category = [
    "Genral",
    "Sport",
    "Political",
    "Business",
    "Entertinment",
    "Movies",
  ];
  return (
    <div className="text-center space-y-10 font-bold text-2xl">
      <h1>Categories</h1>
      <Tabs defaultValue="gallery">
        <Tabs.List>
          {category.map((cat) => (
            <Tabs.Tab value={cat} key={cat}> {cat} </Tabs.Tab>
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
