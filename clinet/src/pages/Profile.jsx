import React from "react";
import { Avatar, Tabs } from "@mantine/core";
import { Bookmark, Heart, BotMessageSquare, Cog } from "lucide-react";
import { getCookies } from "../utils/util";

function Profile() {
  return (
    <div className="">
      <Avatar size="xl" />
      <text>{getCookies('name')} </text>
      <text>{getCookies('email')} </text>
      <Tabs defaultValue="gallery">
        <Tabs.List>
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
        </Tabs.List>

        <Tabs.Panel value="Bookmark">Gallery tab content</Tabs.Panel>

        <Tabs.Panel value="Like">Messages tab content</Tabs.Panel>
        <Tabs.Panel value="AI-Recommandation">Messages tab content</Tabs.Panel>

        <Tabs.Panel value="Preferences">Settings tab content</Tabs.Panel>
      </Tabs>
    </div>
  );
}
export default Profile;
