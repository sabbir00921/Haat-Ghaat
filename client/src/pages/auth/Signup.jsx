import React, { useState } from "react";
import { FaRegEyeSlash } from "react-icons/fa6";
import { FaRegEye } from "react-icons/fa6";
import toast from "../../utils/toast";
import Axios from "../../utils/Axios";
import SummaryApi from "../../common/SummaryApi";
import { Link } from "react-router-dom";

const Signup = () => {
  const { ErrorToast, SuccessToast, InfoToast } = toast;
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const isValue = Object.values(data).every((el) => el);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handlechange = (e) => {
    const { name, value } = e.target;
    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValue) {
      InfoToast("Fill all information");
    } else {
      if (data.password !== data.confirmPassword) {
        ErrorToast("Password are not same");
      } else {
        try {
          const response = await Axios({
            ...SummaryApi.register,
            data: data,
          });
          SuccessToast(response?.data?.message);
        } catch (error) {
          ErrorToast(error?.response?.data?.message);
        }
      }
    }
  };

  return (
    <div className="">
      <section className="container mx-auto px-2 h-[85vh] flex items-center justify-center">
        <div className="bg-white my-4 w-full max-w-lg mx-auto rounded p-7">
          <p>Welcome to Haat-Ghat</p>
          <form action="" className="grid gap-2 mt-6">
            {/*User Name */}
            <div className="grid gap-1">
              <label htmlFor="name">User Name</label>
              <input
                className="bg-blue-50 p-2 rounded border focus-within:border-blue-300"
                type="text"
                name="name"
                id="name"
                placeholder="Enter your name"
                value={data.name}
                onChange={handlechange}
                autoFocus
              />
            </div>

            {/*User email */}
            <div className="grid gap-1">
              <label htmlFor="email">User Email</label>
              <input
                className="bg-blue-50 p-2 rounded border focus-within:border-blue-300"
                type="text"
                name="email"
                id="email"
                placeholder="Enter your email"
                value={data.email}
                onChange={handlechange}
                autoFocus
              />
            </div>

            {/*User password */}
            <div className="grid gap-1 relative">
              <label htmlFor="password">Password</label>
              <input
                className="bg-blue-50 p-2 rounded border focus-within:border-blue-300"
                type={showConfirmPassword ? "text" : "password"}
                name="password"
                id="password"
                placeholder="Enter password"
                value={data.password}
                onChange={handlechange}
                autoFocus
              />
              <span
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className="absolute right-3 top-2/3 -translate-y-1/2 cursor-pointer text-xl text-gray-600"
              >
                {showConfirmPassword ? <FaRegEyeSlash /> : <FaRegEye />}
              </span>
            </div>

            {/*User Confirm password */}
            <div className="grid gap-1 relative">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                className="bg-blue-50 p-2 rounded border focus-within:border-blue-300"
                type={showPassword ? "text" : "password"}
                name="confirmPassword"
                id="confirmPassword"
                placeholder="Confirm password"
                value={data.confirmPassword}
                onChange={handlechange}
              />

              <span
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-2/3 -translate-y-1/2 cursor-pointer text-xl text-gray-600"
              >
                {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
              </span>
            </div>

            <button
              className={`${
                isValue ? "bg-green-800" : "bg-gray-800"
              } text-white py-2 rounded font-semibold my-3 tracking-wide`}
              onClick={handleSubmit}
            >
              Register
            </button>
          </form>
          {/* Login Link */}

          <p className="text-sm text-center mt-2">
            Have an account?
            <Link to="/login" className="text-blue-600 hover:underline">
              Login here
            </Link>
          </p>
        </div>
      </section>
    </div>
  );
};

export default Signup;
