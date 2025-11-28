import React from "react";
import { motion } from "motion/react";
import { Button } from "@mantine/core";
import { Lock, Mail,User  } from "lucide-react";

function Register() {
  return (
    <div className="flex h-screen justify-center items-center bg-gray-100">
      <motion.div
        initial={{ opacity: 0, scale: 0.3 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-96 rounded-xl p-4 shadow-md bg-white"
      >
        <h1 className="text-center mb-4">Welocme</h1>
        <form className="space-y-6 w-full">
          <div className="flex gap-2">
            <User />
            <input
              type="text"
              placeholder="Enter Email..."
              className="focus:outline-none border-b w-full border-gray-200 "
            />
          </div>

          <div className="flex gap-2">
            <Mail />
            <input
              type="email"
              placeholder="Enter Email..."
              className="focus:outline-none border-b w-full border-gray-200 "
            />
          </div>

          <div className="flex gap-2">
            <Lock />
            <input
              type="password"
              placeholder="Enter Pass..."
              className="focus:outline-none border-b w-full border-gray-200"
            />
          </div>
          <div className="flex gap-2">
            <Lock />
            <input
              type="password"
              placeholder="confram Pass..."
              className="focus:outline-none border-b w-full border-gray-200"
            />
          </div>

          <Button fullWidth>Register</Button>
        </form>
      </motion.div>
    </div>
  );
}
export default Register;
