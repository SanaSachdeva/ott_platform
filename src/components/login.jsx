import React, { useState } from "react";
import Header from "./Header";
import axios from "axios";
import { API_END_POINT } from "../utils/constant";
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "../redux/userSlice";

const Login = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [FullName, setFullName] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isLoading = useSelector(store=>store.app.isLoading)

  const loginHandler = () => {
    setIsLogin(!isLogin);
  };

  const getInputData = async (e) => {
    e.preventDefault();
    dispatch(setLoading(true))
    try {
      if (isLogin) {
        // Login logic
        const user = { Email, Password };
        const res = await axios.post(
          `${API_END_POINT}/login`,
          user,
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true
          }
        );
        console.log("Login Response:", res.data); // Debugging response structure
        if (res.data.success) {
          toast.success(res.data.message);
          dispatch(setUser(res.data.user)); // Assuming user details are in res.data.user
          navigate("/browse");
        }
      } else {
        // Signup logic
        dispatch(setLoading(true))
        const user = { FullName, Email, Password };
        const res = await axios.post(
          `${API_END_POINT}/register`,
          user,
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        );
        console.log("Signup Response:", res.data); // Debugging response structure
        if (res.data.success) {
          toast.success(res.data.message);
          setIsLogin(true); // Switch to login view after successful signup
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "An error occurred");
    }
    finally{
      dispatch(setLoading(false));
  }

    // Reset form fields
    setFullName("");
    setEmail("");
    setPassword("");
  };

  return (
    <div>
      <Header />
      <div className="absolute">
        <img
          className="w-[100vw] h-[100vh]"
          src="https://assets.nflxext.com/ffe/siteui/vlv3/dc1cf82d-97c9-409f-b7c8-6ac1718946d6/14a8fe85-b6f4-4c06-8eaf-eccf3276d557/IN-en-20230911-popsignuptwoweeks-perspective_alpha_website_medium.jpg"
          alt="banner"
        />
      </div>
      <form
        onSubmit={getInputData}
        className="flex flex-col p-12 my-36 w-3/12 left-0 right-0 mx-auto item-center justify-center absolute bg-black opacity-90 rounded-md"
      >
        <h1 className="text-white text-3xl mb-5 font-bold">
          {isLogin ? "Login" : "Signup"}
        </h1>
        <div className="flex flex-col">
          {!isLogin && (
            <input
              type="text"
              placeholder="Full Name"
              className="outline-none p-3 my-2 rounded-sm bg-gray-800 text-white"
              value={FullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          )}
          <input
            type="email"
            placeholder="Email"
            className="outline-none p-3 my-2 rounded-sm bg-gray-800 text-white"
            value={Email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="outline-none p-3 my-2 rounded-sm bg-gray-800 text-white"
            value={Password}
            onChange={(e) => setPassword(e.target.value)}
          />
           <button type='submit' className='bg-red-600 mt-6 p-3 text-white rounded-sm font-medium'>{`${isLoading ? "loading...":(isLogin?"Login":"Signup")}`}</button>
                    <p className='text-white mt-2'>{isLogin ? "New to Netflix?" : "Already have an account?"}<span onClick={loginHandler} className='ml-1 text-blue-900 font-medium cursor-pointer'>{isLogin ? "Signup" : "Login"}</span></p>
                </div>
            </form>
        </div>
    )
}

export default Login;
