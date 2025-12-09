import react, { useState } from "react";
import { motion } from "motion/react";
import { Button } from "@mantine/core";
import { CircleCheckBig } from "lucide-react";
import { Slide } from "react-awesome-reveal";
import { setPreferences } from "../redux/slice/newsSlice.js";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";


function Preferences() {
  const [selectedCatagory, setSelectedCatagory] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const toggleCategory = (category) => {
    setSelectedCatagory((prev) => {
      return prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category];
    });
  };

  const handelSavePreferneces = async () => {
    await dispatch(setPreferences({preferences: selectedCatagory}))
    navigate('/')
  };

  const categories = [
    "Technology",
    "sport",
    "Health",
    "Entertainment",
    "Business",
    "Politics",
  ];
  return (
    <Slide>
      <div className="h-screen gap-6 flex flex-col justify-center items-center">
        <div className="text-gray-800 font-semibold text-2xl ">
          Select Interests
        </div>
        <div className="grid grid-cols-3 gap-10 mt-6 ">
          {categories.map((category) => (
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              key={category}
              className={`shadow-md  rounded-xl flex justify-center items-center gap-4 px-5 py-4 ${
                selectedCatagory.includes(category) && "bg-blue-500 text-white"
              }`}
              onClick={() => toggleCategory(category)}
            >
              {selectedCatagory.includes(category) && <CircleCheckBig />}
              {category}
            </motion.div>
          ))}
        </div>
        <div className="py-7">
          <Button onClick={handelSavePreferneces}>Save Preferences</Button>
        </div>
      </div>
    </Slide>
  );
}
export default Preferences;
