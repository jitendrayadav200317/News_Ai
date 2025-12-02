import React from "react";
import { motion } from "motion/react";
import { Button } from "@mantine/core";
import { Lock, Mail, User } from "lucide-react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";


function Register() {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    console.log(data);

  }

  return (
    <div className="flex h-screen justify-center items-center bg-gray-100">
      <motion.div
        initial={{ opacity: 0, scale: 0.3 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-96 rounded-xl p-4 shadow-md bg-white"
      >
        <h1 className="text-center mb-4">Welocme</h1>
        <form className="space-y-6 w-full" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex gap-2">
            <User />
            <input
              type="text"
              placeholder="Enter Email..."
              className="focus:outline-none border-b w-full border-gray-200 "
              {...register('name')}
            />
          </div>

          <div className="flex gap-2">
            <Mail />
            <input
              type="email"
              placeholder="Enter Email..."
              className="focus:outline-none border-b w-full border-gray-200 "
              {...register('email')}
            />
          </div>

          <div className="flex gap-2">
            <Lock />
            <input
              type="password"
              placeholder="Enter Pass..."
              className="focus:outline-none border-b w-full border-gray-200"
              {...register('password')}
            />
          </div>
          <div className="flex gap-2">
            <Lock />
            <input
              type="password"
              placeholder="confram Pass..."
              className="focus:outline-none border-b w-full border-gray-200"
              {...register('conframPassword')}
            />
          </div>

          <Button type="submit" fullWidth>Register</Button>
          <p className="text-center text-gray-800">Already have an account?
          <Link to="/login" className="text-sky-500 hover:underline">
            Login
          </Link>
          </p>
        </form>
      </motion.div>
    </div>
  );
}
export default Register;
