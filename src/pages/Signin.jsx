import React, { useState, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router"; // ✅ react-router-dom
import MyContainer from "../components/MyContainer";
import { FaEye } from "react-icons/fa";
import { IoEyeOff } from "react-icons/io5";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthProvider";

const Signin = () => {
  const [show, setShow] = useState(false);
  const {
    signInWithEmailAndPasswordFunc,
    signInWithGoogleFunc,
    signInWithGithubFunc,
    sendPassResetEmailFunc,
    setUser,
    user,
    loading,
    setLoading,
  } = useAuth(); // ✅ use the hook

  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const navigate = useNavigate();
  const emailRef = useRef(null);

  if (user) {
    navigate(from, { replace: true });
    return null;
  }

  const handleSignin = async (e) => {
    e.preventDefault();
    const email = e.target.email?.value;
    const password = e.target.password?.value;

    try {
      const res = await signInWithEmailAndPasswordFunc(email, password);
      setUser(res.user);

      if (!res.user.emailVerified) {
        toast.error("Please verify your email first!");
        return;
      }

      toast.success("Welcome back! 🐾");
      navigate(from, { replace: true });
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleGoogleSignin = async () => {
    try {
      const res = await signInWithGoogleFunc();
      setUser(res.user);
      toast.success("Welcome with Google! 🐶");
      navigate(from, { replace: true });
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleGithubSignin = async () => {
    try {
      const res = await signInWithGithubFunc();
      setUser(res.user);
      toast.success("Welcome with GitHub! 🐱");
      navigate(from, { replace: true });
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleForgetPassword = async () => {
    const email = emailRef.current.value;
    if (!email) {
      toast.error("Please enter your email first!");
      return;
    }
    try {
      await sendPassResetEmailFunc(email);
      toast.success("Check your inbox to reset your password 🐾");
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="min-h-[calc(100vh-20px)] flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-emerald-100 via-teal-100 to-sky-100">
      <div className="absolute inset-0 bg-[url('https://static.vecteezy.com/system/resources/previews/006/431/803/non_2x/seamless-dog-pattern-with-paw-prints-and-hearts-cat-foot-texture-pattern-with-doggy-pawprint-and-hearts-dog-texture-hand-drawn-illustration-in-doodle-style-on-white-background-vector.jpg')] opacity-10 bg-repeat"></div>

      <MyContainer>
        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10 p-6 lg:p-10">
          <div className="max-w-lg text-center lg:text-left space-y-4">
            <h1 className="text-5xl font-extrabold text-emerald-700 drop-shadow-md">
              Welcome Back, Pet Lover! 🐾
            </h1>
            <p className="text-gray-600 text-lg leading-relaxed">
              Sign in to continue caring for your furry friends. Manage
              appointments, track health, and get tips for happy paws.
            </p>
          </div>

          <div className="w-full max-w-md bg-white/80 backdrop-blur-md border border-emerald-200 shadow-2xl rounded-2xl p-8">
            <form onSubmit={handleSignin} className="space-y-5">
              <h2 className="text-3xl font-semibold text-center text-emerald-700 mb-2">
                Sign In
              </h2>

              <div>
                <label className="block text-sm mb-1 text-emerald-800">Email</label>
                <input
                  type="email"
                  name="email"
                  ref={emailRef}
                  placeholder="example@email.com"
                  className="w-full px-4 py-2 rounded-lg border border-emerald-200 focus:outline-none focus:ring-2 focus:ring-emerald-400 bg-white text-gray-800"
                />
              </div>

              <div className="relative">
                <label className="block text-sm mb-1 text-emerald-800">Password</label>
                <input
                  type={show ? "text" : "password"}
                  name="password"
                  placeholder="••••••••"
                  className="w-full px-4 py-2 rounded-lg border border-emerald-200 focus:outline-none focus:ring-2 focus:ring-emerald-400 bg-white text-gray-800"
                />
                <span
                  onClick={() => setShow(!show)}
                  className="absolute right-3 top-9 cursor-pointer text-emerald-500"
                >
                  {show ? <FaEye /> : <IoEyeOff />}
                </span>
              </div>

              <button
                type="button"
                onClick={handleForgetPassword}
                className="text-sm text-emerald-600 hover:underline"
              >
                Forgot password?
              </button>

              <button
                type="submit"
                className="w-full bg-emerald-600 text-white py-2 rounded-lg font-semibold hover:bg-emerald-700 transition"
              >
                Sign In
              </button>

              <div className="flex items-center justify-center gap-2 my-2">
                <div className="h-px w-16 bg-gray-300"></div>
                <span className="text-sm text-gray-600">or</span>
                <div className="h-px w-16 bg-gray-300"></div>
              </div>

              <button
                type="button"
                onClick={handleGoogleSignin}
                className="flex items-center justify-center gap-3 bg-white border border-gray-300 text-gray-800 px-5 py-2 rounded-lg w-full font-semibold hover:bg-gray-50 transition"
              >
                <img
                  src="https://www.svgrepo.com/show/475656/google-color.svg"
                  alt="google"
                  className="w-5 h-5"
                />
                Continue with Google
              </button>

              <button
                type="button"
                onClick={handleGithubSignin}
                className="flex items-center justify-center gap-3 bg-gray-900 text-white px-5 py-2 rounded-lg w-full font-semibold hover:bg-gray-800 transition"
              >
                <img
                  src="https://img.icons8.com/fluency/48/github.png"
                  alt="github"
                  className="w-5 h-5"
                />
                Continue with GitHub
              </button>

              <p className="text-center text-sm text-gray-700 mt-3">
                Don’t have an account?{" "}
                <Link
                  to="/signup"
                  className="text-emerald-600 font-semibold hover:underline"
                >
                  Sign Up
                </Link>
              </p>
            </form>
          </div>
        </div>
      </MyContainer>
    </div>
  );
};

export default Signin;
