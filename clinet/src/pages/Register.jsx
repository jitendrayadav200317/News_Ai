import React from "react";
import { motion } from "motion/react";
import { Button, Loader } from "@mantine/core";
import { Lock, Mail, User } from "lucide-react";
import { useForm } from "react-hook-form";
import { registerUser } from "../redux/slice/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {  z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const registerSchema = z.object({
  name: z.string()
     .min(4, { message: "Name should contain at 4 charater long..." }),
  email: z
    .string()
    .min(1, { message: "this is has to be filled..." })
    .email("this is valid email."),
  password: z.string().min(8,{message:"password should be at lest 8 charater long"}),
  confirmPassword: z
    .string()
    .refine((data) => data.password === data.confirmPassword, {
      message: "password do not match",
      path: ["confirmPassword"],
    }),
});

const Register = () => {
  const dispatch = useDispatch();

  const { loading } = useSelector((state) => state.auth);

  const { register, handleSubmit,formState:{errors} } = useForm({
    resolver:zodResolver(registerSchema)
  });
  const onSubmit = (data) => {
    dispatch(registerUser(data));
    console.log(data);
  };

  return (
    <div className="flex min-h-screen justify-center items-center bg-gray-100">
      <motion.div
        initial={{ opacity: 0, scale: 0.3 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-96 rounded-xl p-4 shadow-md bg-white"
      >
        <h1 className="text-center mb-4">Welocme</h1>
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex gap-2 items-center pb-2 border-gray-300">
            <User className="text-gray-400 mr-2" size={20}/>
            <input
              type="text"
              placeholder="Enter Email..."
              className="bg-transparent focus:outline-none border-b w-full border-gray-200 "
              {...register("name")}
            />
            {errors.name && <p className="text-red-500 text-sm"> {errors.name.message} </p>}
          </div>

          <div className="flex gap-2 items-center pb-2 border-gray-300">
            <Mail className="text-gray-400 mr-2" size={20}/>
            <input
              type="email"
              placeholder="Enter Email..."
              className="bg-transparent focus:outline-none border-b w-full border-gray-200 "
              {...register("email")}
            />
            {errors.email && <p className="text-red-500 text-sm"> {errors.email.message} </p>}
          </div>

          <div className="flex gap-2 items-center pb-2 border-gray-300">
            <Lock className="text-gray-400 mr-2" size={20}/>
            <input
              type="password"
              placeholder="Enter Pass..."
              className="bg-transparent focus:outline-none border-b w-full border-gray-200"
              {...register("password")}
            />
            {errors.password && <p className="text-red-500 text-sm"> {errors.password.message} </p>}
          </div>
          <div className="flex gap-2 items-center pb-2 border-gray-300">
            <Lock className="text-gray-400 mr-2" size={20}/>
            <input
              type="password"
              placeholder="confram Pass..."
              className="bg-transparent focus:outline-none border-b w-full border-gray-200"
              {...register("conframPassword")}
            />
             {errors.confirmPassword && <p className="text-red-500 text-sm"> {errors.confirmPassword.message} </p>}
          </div>

          <Button type="submit" fullWidth>
            {loading ? <Loader size={20} color="white" /> : "Register"}
          </Button>

          <p className="text-center text-gray-800">
            Already have an account?
            <Link to="/login" className="text-sky-500 hover:underline">
              Login
            </Link>
          </p>
        </form>
      </motion.div>
    </div>
  );
};
export default Register;
