import React from "react";
import { motion } from "motion/react";
import { Button } from "@mantine/core";
import { Lock, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/slice/authSlice";

const loginSchema = z.object({
      email: z
        .string()
        .min(1, { message: "this is has to be filled." })
        .email("this is valid email."),
      password: z.string(),
    });
function Login() {
  const dispatch = useDispatch()
  const { register, handleSubmit, formState:{errors} } = useForm({
    resolver:zodResolver(loginSchema)
  });
  const onSubmit = (data) => {
    console.log(data);
    dispatch(loginUser(data))
  };
  

  return (
    <div className="flex h-screen justify-center items-center bg-gray-100">
      <motion.div
        initial={{ opacity: 0, scale: 0.3 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-96 rounded-xl p-4 shadow-md bg-white"
      >
        <h1 className="text-center mb-4">Welcome Back</h1>

        <form className="space-y-6 w-full" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex gap-2">
            <Lock />
            <input
              type="email"
              placeholder="Enter Email..."
              className="focus:outline-none border-b w-full border-gray-200"
              {...register("email")}
            />
            {errors.email && <p> {errors.email.message} </p> }
          </div>

          <div className="flex gap-2">
            <Mail />
            <input
              type="password"
              placeholder="Enter Pass..."
              className="focus:outline-none border-b w-full border-gray-200"
              {...register("password")}
            />
          </div>

          <Button type="submit" fullWidth>
            login
          </Button>

          <p className="text-center text-gray-800">
            Don't have an account?
            <Link to="/register" className="text-sky-500 hover:underline">
               Register
            </Link>
          </p>
        </form>
      </motion.div>
    </div>
  );
}

export default Login;
