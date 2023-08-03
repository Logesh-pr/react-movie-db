import React, { useState } from "react";

//icon
import Google_icon from "../assets/icons/google_icon.png";
import { AiFillEyeInvisible } from "react-icons/ai";
import { AiFillEye } from "react-icons/ai";

//react-router
import { Link, useNavigate } from "react-router-dom";

//formik
import { useFormik } from "formik";

//yup
import * as yup from "yup";

//react-toastify
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//firebase
import { auth, db } from "../config/firebase/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setConfirmShowPassword] = useState(false);
  const navigate = useNavigate();
  const schema = yup.object().shape({
    name: yup.string().required("Please enter your name"),
    email: yup
      .string()
      .required("Please enter your email")
      .email("Please enter valid email"),
    password: yup
      .string()
      .required("Please enter your password")
      .min(8, "Mininum 8 charactres are required"),
    confirmPassword: yup
      .string()
      .oneOf(
        [yup.ref("password"), null],
        "password and confirm password are not matching"
      )
      .required("Please enter your confirm password"),
  });
  const onSubmit = async (values, actions) => {
    const userName = values.name;
    await createUserWithEmailAndPassword(auth, values.email, values.password)
      .then((res) => {
        const data = doc(db, "userDetails", res.user.email);
        const userData = setDoc(data, { userName });

        navigate("/");
      })
      .catch((err) => {
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

        new Promise((resolver) => setTimeout(resolver, 1000));
        actions.resetForm();
      });
  };
  const { values, handleChange, handleSubmit, errors, touched, isSubmitting } =
    useFormik({
      initialValues: { name: "", email: "", password: "", confirmPassword: "" },
      validationSchema: schema,
      onSubmit,
    });
  window.addEventListener("beforeunload", () => {
    navigate("/");
  });

  const password = () => {
    setShowPassword(!showPassword);
  };
  const confirmPassword = () => {
    setConfirmShowPassword(!showConfirmPassword);
  };

  return (
    <div className="form_bg  overflow-y-scroll w-full bg-cover flex justify-center items-center min-h-[140vh]">
      <div className="bg-form_bg px-6 py-12 w-[95%] max-w-[450px] mx-auto rounded-lg">
        <div className="w-[95%] md:w-[90%] mx-auto">
          <h4 className="text-[26px] font-bold text-primary">Hi !</h4>
          <p className="mt-4 text-[16px] font-medium text-gray-300">
            Sign up to create an account
          </p>

          <form
            action=""
            onSubmit={handleSubmit}
            className="mt-8 flex flex-col justify-center items-center gap-y-6"
          >
            <div className="flex flex-col justify-center items-start w-full">
              <label htmlFor="" className="">
                Name
              </label>
              <input
                id="name"
                type="text"
                value={values.name}
                onChange={handleChange}
                placeholder="Enter your name"
                className="w-full mt-3 bg-secondary border border-borderColor rounded-lg px-4 py-3 md:py-4 placeholder:text-[12px] md:placeholder:text-[13px] placeholder:font-semibold placeholder:text-zinc-500"
              />
              {errors.name && touched.name && (
                <span className="error mt-3 text-[14px] md:text-[15px] font-semibold text-red-500">
                  {errors.name}
                </span>
              )}
            </div>
            <div className="flex flex-col justify-center items-start w-full ">
              <label htmlFor="" className="">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={values.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full mt-3 bg-secondary border border-borderColor rounded-lg px-4 py-3 md:py-4 placeholder:text-[12px] md:placeholder:text-[13px] placeholder:font-semibold placeholder:text-zinc-500"
              />
              {errors.email && touched.email && (
                <span className="error mt-3 text-[14px] md:text-[15px] font-semibold text-red-500">
                  {errors.email}
                </span>
              )}
            </div>
            <div className="  flex flex-col justify-center items-start w-full">
              <label htmlFor="" className="">
                Password
              </label>
              <div className="relative w-full">
                <input
                  id="password"
                  type={showPassword === true ? "text" : "password"}
                  value={values.password}
                  onChange={handleChange}
                  placeholder="Enter max 8 characters"
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
                </div>
              </div>

              {errors.password && touched.password && (
                <span className="error mt-3 text-[14px] md:text-[15px] font-semibold text-red-500">
                  {errors.password}
                </span>
              )}
            </div>
            <div className=" flex flex-col justify-center items-start w-full">
              <label htmlFor="" className="">
                Confirm password
              </label>
              <div className="relative w-full">
                <input
                  id="confirmPassword"
                  type={showConfirmPassword === true ? "text" : "password"}
                  value={values.confirmPassword}
                  onChange={handleChange}
                  placeholder="Same as password"
                  className="w-full mt-3 bg-secondary border border-borderColor rounded-lg px-4 py-3 md:py-4 placeholder:text-[12px] md:placeholder:text-[13px] placeholder:font-semibold placeholder:text-zinc-500"
                />
                <div
                  className="absolute right-[25px] bottom-[15px]  text-[20px] text-gray-300"
                  onClick={confirmPassword}
                >
                  {showConfirmPassword === true ? (
                    <AiFillEyeInvisible />
                  ) : (
                    <AiFillEye />
                  )}
                </div>
              </div>

              {errors.confirmPassword && touched.confirmPassword && (
                <span className="error mt-3 text-[14px] md:text-[15px] font-semibold text-red-500">
                  {errors.confirmPassword}
                </span>
              )}
            </div>

            <div className="w-full mt-4">
              <input
                type="Submit"
                placeholder="Sign Up"
                disabled={isSubmitting}
                value={"Sign Up"}
                className="w-full bg-primary text-white font-semibold py-3 rounded-lg cursor-pointer"
              />
            </div>
          </form>

          <div className="w-full mt-8 flex justify-center items-center gap-x-2 text-[14px]">
            <p>Already have an account ?</p>
            <Link
              to={"/accounts/log-in"}
              className="text-primary cursor-pointer"
            >
              Log in
            </Link>
          </div>
          {/* <button onClick={notify}>Notify!</button> */}
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
      </div>
    </div>
  );
}
