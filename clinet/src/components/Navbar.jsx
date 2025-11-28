import React from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { Button } from "@mantine/core";
// import { X, Menu } from "lucide-react";

function Navbar() {
  // const [isOpen , setIsopen] = useState(false);
  // const handelClick = ()=>{
  //   setIsopen(!isOpen)
  // }

  return (
    <nav className="h-16 p-2">
      <div className=" flex mx-6 items-center justify-between ">
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-2xl font-semibold"
        >
          NEWSAI
        </motion.h1>

        <ul className="flex gap-4">
          {["Home", "Categories", "Channels", "About"].map((navitem) => (
            <motion.li
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 100 }}
              key={navitem}
              className="hover:text-gray-700"
            >
              <Link to={`/${navitem.toLowerCase()}`}>{navitem}</Link>
            </motion.li>
          ))}
        </ul>

        <div className="flex justify-center items-center">
          <Link to="/login">
            <Button variant="white">Login</Button>
          </Link>
          <Link to="register">
            <Button variant="white">Register</Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
