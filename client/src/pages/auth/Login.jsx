import React, { useState } from "react";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa6";
import toast from "../../utils/toast";
import Axios from "../../utils/Axios";
import SummaryApi from "../../common/SummaryApi";

const Login = () => {
  const { ErrorToast, SuccessToast, InfoToast } = toast;

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const isValue = Object.values(data).every((el) => el);

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isValue) {
      return InfoToast("Fill all information");
    }

    try {
      const response = await Axios({
        ...SummaryApi.login,
        data: data,
      });

      SuccessToast(response?.data?.message);
    } catch (error) {
      ErrorToast(error?.response?.data?.message);
    }
  };

  return (
    <div>
      <section className="container mx-auto px-2 h-[85vh] flex items-center justify-center">
        <div className="bg-white my-4 w-full max-w-lg mx-auto rounded p-7">
          <p>Welcome Back</p>

          <form className="grid gap-2 mt-6">
            {/* User Email */}
            <div className="grid gap-1">
              <label htmlFor="email">User Email</label>
              <input
                className="bg-blue-50 p-2 rounded border focus-within:border-blue-300"
                type="text"
                name="email"
                id="email"
                placeholder="Enter your email"
                value={data.email}
                onChange={handleChange}
                autoFocus
              />
            </div>

            {/* Password */}
            <div className="grid gap-1 relative">
              <label htmlFor="password">Password</label>
              <input
                className="bg-blue-50 p-2 rounded border focus-within:border-blue-300"
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                placeholder="Enter password"
                value={data.password}
                onChange={handleChange}
              />

              <span
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-2/3 -translate-y-1/2 cursor-pointer text-xl text-gray-600"
              >
                {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
              </span>
            </div>

            {/* Login Button */}
            <button
              className={`${
                isValue ? "bg-green-800" : "bg-gray-800"
              } text-white py-2 rounded font-semibold my-3 tracking-wide`}
              onClick={handleSubmit}
            >
              Login
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Login;
