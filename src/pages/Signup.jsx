import { useState, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router"; // ✅ react-router-dom
import { FaEye } from "react-icons/fa";
import { IoEyeOff } from "react-icons/io5";
import { toast } from "react-toastify";
import MyContainer from "../components/MyContainer";
import { useAuth } from "../context/AuthProvider"; // ✅ use hook

const Login = () => {
  const [show, setShow] = useState(false);
  const {
    signInWithEmailAndPasswordFunc,
    signInWithGoogleFunc,
    sendPassResetEmailFunc,
    setUser,
    user,
  } = useAuth(); // ✅ hook instead of useContext

  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const navigate = useNavigate();
  const emailRef = useRef(null);

  // Redirect if already logged in
  if (user) {
    navigate(from, { replace: true });
    return null;
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const res = await signInWithEmailAndPasswordFunc(email, password);

      if (!res.user.emailVerified) {
        toast.error("Please verify your email first!");
        return;
      }

      setUser(res.user);
      toast.success("Welcome back! 🐾");
      navigate(from, { replace: true });
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const res = await signInWithGoogleFunc();
      setUser(res.user);
      toast.success("Welcome with Google! 🐶");
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
    <div
      className="min-h-[calc(100vh-20px)] flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://thumbs.dreamstime.com/z/doodle-grey-big-small-paw-print-doodle-grey-big-small-paw-print-seamless-fabric-design-repeated-pattern-grey-185254359.jpg')",
      }}
    >
      <MyContainer>
        <div className="max-w-md w-full bg-white/70 backdrop-blur-md border border-emerald-200 shadow-2xl rounded-2xl p-8">
          <h1 className="text-3xl font-bold text-emerald-700 text-center mb-6">Login</h1>

          <form onSubmit={handleLogin} className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-sm mb-1 text-emerald-800">Email</label>
              <input
                type="email"
                name="email"
                ref={emailRef}
                placeholder="example@email.com"
                className="w-full px-4 py-2 rounded-lg border border-emerald-200 focus:outline-none focus:ring-2 focus:ring-emerald-400"
              />
            </div>

            {/* Password */}
            <div className="relative">
              <label className="block text-sm mb-1 text-emerald-800">Password</label>
              <input
                type={show ? "text" : "password"}
                name="password"
                placeholder="••••••••"
                className="w-full px-4 py-2 rounded-lg border border-emerald-200 focus:outline-none focus:ring-2 focus:ring-emerald-400"
              />
              <span
                onClick={() => setShow(!show)}
                className="absolute right-3 top-9 cursor-pointer text-emerald-500"
              >
                {show ? <FaEye /> : <IoEyeOff />}
              </span>
            </div>

            {/* Forget Password */}
            <button
              type="button"
              onClick={handleForgetPassword}
              className="text-sm text-emerald-600 hover:underline"
            >
              Forgot password?
            </button>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white py-2 rounded-lg font-semibold hover:from-teal-500 hover:to-emerald-500 transition"
            >
              Login
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center justify-center gap-2 my-3">
            <div className="h-px w-16 bg-gray-300"></div>
            <span className="text-sm text-gray-600">or</span>
            <div className="h-px w-16 bg-gray-300"></div>
          </div>

          {/* Google Login */}
          <button
            onClick={handleGoogleLogin}
            className="flex items-center justify-center gap-3 bg-white border border-gray-300 text-gray-800 px-5 py-2 rounded-lg w-full font-semibold hover:bg-gray-50 transition"
          >
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="google"
              className="w-5 h-5"
            />
            Continue with Google
          </button>

          {/* Sign Up Link */}
          <p className="text-center text-sm text-gray-700 mt-2">
            Don’t have an account?{" "}
            <Link to="/signup" className="text-emerald-600 font-semibold hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </MyContainer>
    </div>
  );
};

export default Login;
