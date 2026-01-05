import React from "react";
import { Avatar, Flex, Menu } from "@mantine/core";
import { useDispatch } from "react-redux";
import { singOut } from "../redux/slice/authSlice.js";
import { useNavigate } from "react-router-dom";
import { LogOut, User } from "lucide-react";
import { Link } from "react-router-dom";
import { getCookies } from "../utils/util.js";

function ProfileDropDown() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleSingOut = () => {
    dispatch(singOut());
    navigate("/login");
  };
  return (
    <div className="">
      <Menu shadow="md" width={Flex}>
        <Menu.Target>
          <Avatar />
        </Menu.Target>

        <Menu.Dropdown>
          <Menu.Label>Profile</Menu.Label>
          <Link to="/Profile">
            <Menu.Item leftSection={<User size={15} />}>Profile</Menu.Item>
          </Link>
          <Menu.Item
            leftSection={<LogOut size={15} />}
            color="red"
            onClick={handleSingOut}
          >
            Sign Out
          </Menu.Item>
          <Menu.Item>{getCookies("email")} </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </div>
  );
}
export default ProfileDropDown;
