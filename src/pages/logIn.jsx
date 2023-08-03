import React, { useState } from "react";

//icon
import Google_icon from "../assets/icons/google_icon.png";
import { AiFillEyeInvisible } from "react-icons/ai";
import { AiFillEye } from "react-icons/ai";

//formik
import { useFormik } from "formik";

//yup
import * as yup from "yup";

//react-router
import { Link, useNavigate } from "react-router-dom";

//react-toastify
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//firebase
import { auth } from "../config/firebase/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

export default function LogIn() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const schema = yup.object().shape({
    email: yup
      .string()
      .required("Please enter your email")
      .email("Please enter valid email"),
    password: yup
      .string()
      .required("Please enter your password")
      .min(8, "Mininum 8 charactres are required"),
  });

  const onSubmit = async (values, actions) => {
    try {
      await signInWithEmailAndPassword(auth, values.email, values.password);
      navigate("/");
    } catch (err) {
      alert(err.message);
      toast.error(err.message, {
        position: "top-center",
        autoClose: 0,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: 0,
        theme: "dark",
      });

      await new Promise((resolver) => setTimeout(resolver, 1000));
      actions.resetForm();
    }
  };
  const { values, handleChange, handleSubmit, errors, touched, isSubmitting } =
    useFormik({
      initialValues: { email: "", password: "" },
      validationSchema: schema,
      onSubmit,
    });
  window.addEventListener("beforeunload", () => {
    navigate("/");
  });

  const password = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="form_bg  overflow-y-scroll w-full min-h-[110vh] bg-cover flex justify-center items-center">
      <div className="bg-form_bg px-6 py-12 w-[95%] max-w-[450px] mx-auto rounded-lg">
        <div className="w-[95%] md:w-[90%] mx-auto">
          <h4 className="text-[26px] font-bold text-primary">Welcome !</h4>
          <p className="mt-4 text-[16px] font-medium text-gray-300">
            Log in to continue
          </p>
          <form
            onSubmit={handleSubmit}
            className="mt-8 flex flex-col justify-center items-center gap-y-6"
          >
            <div className="flex flex-col justify-center items-start w-full ">
              <label htmlFor="" className="">
                Email
              </label>
              <input
                id="email"
                type="email"
                onChange={handleChange}
                defaultValue={values.email}
                placeholder="Enter your email"
                className="w-full mt-3 bg-secondary border border-borderColor rounded-lg px-4 py-3 md:py-4  placeholder:text-[12px] md:placeholder:text-[13px] placeholder:font-semibold placeholder:text-zinc-500 "
              />
              {errors.email && touched.email && (
                <span className=" mt-3 text-[14px] md:text-[15px] font-semibold text-red-500">
                  {errors.email}
                </span>
              )}
            </div>
            <div className="flex flex-col justify-center items-start w-full">
              <label htmlFor="" className="">
                Password
              </label>
              <div className="relative w-full">
                <input
                  id="password"
                  type={showPassword === true ? "text" : "password"}
                  onChange={handleChange}
                  defaultValue={values.password}
                  placeholder="Enter your password"
                  className="w-full mt-3 bg-secondary border border-borderColor rounded-lg px-4 py-3 md:py-4 placeholder:text-[12px] md:placeholder:text-[13px] placeholder:font-semibold placeholder:text-zinc-500"
                />
                <div
                  className="absolute right-[25px] bottom-[15px] text-[20px] text-gray-300"
                  onClick={password}
                >
                  {showPassword === true ? (
                    <AiFillEyeInvisible />
                  ) : (
                    <AiFillEye />
                  )}
                </div>{" "}
                <div
                  className="absolute right-[25px] bottom-[15px] text-[20px] text-gray-300"
                  onClick={password}
                >
                  {showPassword === true ? (
                    <AiFillEyeInvisible />
                  ) : (
                    <AiFillEye />
                  )}
                </div>
              </div>

              {errors.password && touched.password && (
                <span className="error mt-3 text-[14px] md:text-[15px] font-semibold text-red-500">
                  {errors.password}
                </span>
              )}
            </div>

            <div className="w-full mt-4">
              <input
                type="Submit"
                placeholder="Login"
                disabled={isSubmitting}
                value={"Log in"}
                className="w-full bg-primary text-white font-semibold py-3 rounded-lg cursor-pointer"
              />
            </div>
          </form>

          <div className="w-full mt-8 flex justify-center items-center gap-x-2 text-[14px]">
            <p>Dont't have an account ?</p>
            <Link
              to={"/accounts/sign-up"}
              className="text-primary cursor-pointer"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={0}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
}
