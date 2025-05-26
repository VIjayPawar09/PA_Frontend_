import { useEffect, useState } from "react";
import { RegisterDropDown } from "./RegisterDropDown";
import { RegistrationModal } from "./RegistrationModal";
import axios from "axios";

// Updated Navbar Component with Registration Integration
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [authMode, setAuthMode] = useState(null); // 'login' or null
  const [registrationMode, setRegistrationMode] = useState(null); // 'assistant', 'customer', or null
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [rememberMe, setRememberMe] = useState(false);

  // Load users from localStorage on component mount
  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    setUsers(storedUsers);

    // Check for remembered login
    const remembered = JSON.parse(localStorage.getItem("rememberedUser"));
    if (remembered) {
      setCurrentUser(remembered);
    }
  }, []);

  // Handle modal close with ESC key
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.keyCode === 27) {
        closeAuthModal();
        closeRegistrationModal();
      }
    };
    window.addEventListener("keydown", handleEsc);

    // Expose method to open registration modal from dropdown
    window.openRegistrationModal = (userType) => {
      setRegistrationMode(userType);
    };

    return () => {
      window.removeEventListener("keydown", handleEsc);
      delete window.openRegistrationModal;
    };
  }, []);

  const closeAuthModal = () => {
    setAuthMode(null);
    setCredentials({ email: "", password: "" });
    setErrors({});
    setShowPassword(false);
  };

  const closeRegistrationModal = () => {
    setRegistrationMode(null);
  };

  const toggleNav = () => setIsOpen(!isOpen);

  const toggleAuthModal = (mode) => {
    setAuthMode(mode);
    setErrors({});
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });

    // Clear specific error when user starts typing in that field
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Validate email
    if (!credentials.email.trim()) {
      newErrors.email = "email is required";
    }

    // Validate password
    if (!credentials.password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    // Simulate network request delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    // // Find user by email and password
    // const user = users.find(
    //   (user) => user.email === credentials.email &&
    //             user.password === credentials.password
    // );
    try {
      const res = await axios.post(
        "https://pa-backend-wprc.onrender.com/user/login",
        credentials
      );
      setCurrentUser(res.data.user);
      closeAuthModal();
    } catch (err) {
      console.log(err);
    }

    // Set current user

    // Remember user if checkbox is checked
    if (rememberMe) {
      localStorage.setItem("rememberedUser", JSON.stringify(loggedInUser));
    }

    // Close modal

    setIsLoading(false);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem("rememberedUser");
  };

  return (
    <>
      <nav className="bg-gradient-to-r from-indigo-600 via-blue-500 to-teal-400 shadow-md">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="text-white text-2xl font-extrabold tracking-wide">
                Elderly Personal Assistance
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={toggleNav}
                className="text-white hover:text-gray-200 focus:outline-none"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {isOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            </div>

            {/* Desktop menu */}
            <div className="hidden md:flex space-x-4 items-center">
              <a
                href="#home"
                className="text-white hover:bg-white hover:text-indigo-600 px-4 py-2 rounded-lg transition-all duration-300"
              >
                Home
              </a>
              <a
                href="#services"
                className="text-white hover:bg-white hover:text-indigo-600 px-4 py-2 rounded-lg transition-all duration-300"
              >
                Services
              </a>
              <a
                href="#about"
                className="text-white hover:bg-white hover:text-indigo-600 px-4 py-2 rounded-lg transition-all duration-300"
              >
                About
              </a>
              <a
                href="#contact"
                className="text-white hover:bg-white hover:text-indigo-600 px-4 py-2 rounded-lg transition-all duration-300"
              >
                Contact
              </a>

              {currentUser ? (
                <div className="flex items-center space-x-4">
                  <div className="bg-white text-indigo-600 px-3 py-1 rounded-full font-medium">
                    {currentUser.username}{" "}
                    {currentUser.userType === "assistant"
                      ? "(Assistant)"
                      : "(Customer)"}
                  </div>
                  <button
                    onClick={handleLogout}
                    className="bg-white text-red-500 hover:bg-red-500 hover:text-white px-4 py-2 rounded-lg transition-all duration-300"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <>
                  <button
                    onClick={() => toggleAuthModal("login")}
                    className="text-white hover:bg-white hover:text-blue-500 px-4 py-2 rounded-lg transition-all duration-300"
                  >
                    Login
                  </button>
                  <RegisterDropDown />
                </>
              )}
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden bg-indigo-700 p-4">
            <a
              href="#home"
              className="block text-white hover:bg-white hover:text-indigo-600 px-4 py-2 rounded-lg my-2 transition-all duration-300"
            >
              Home
            </a>
            <a
              href="#services"
              className="block text-white hover:bg-white hover:text-indigo-600 px-4 py-2 rounded-lg my-2 transition-all duration-300"
            >
              Services
            </a>
            <a
              href="#about"
              className="block text-white hover:bg-white hover:text-indigo-600 px-4 py-2 rounded-lg my-2 transition-all duration-300"
            >
              About
            </a>
            <a
              href="#contact"
              className="block text-white hover:bg-white hover:text-indigo-600 px-4 py-2 rounded-lg my-2 transition-all duration-300"
            >
              Contact
            </a>

            {currentUser ? (
              <>
                <div className="bg-white text-indigo-600 px-3 py-1 rounded-full font-medium inline-block my-2">
                  {currentUser.email}{" "}
                  {currentUser.userType === "assistant"
                    ? "(Assistant)"
                    : "(Customer)"}
                </div>
                <button
                  onClick={handleLogout}
                  className="block w-full bg-white text-red-500 hover:bg-red-500 hover:text-white px-4 py-2 rounded-lg my-2 transition-all duration-300"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => toggleAuthModal("login")}
                  className="block w-full text-white hover:bg-white hover:text-blue-500 px-4 py-2 rounded-lg my-2 transition-all duration-300"
                >
                  Login
                </button>
                <button
                  onClick={() => setRegistrationMode("customer")}
                  className="block w-full bg-white text-indigo-600 hover:bg-indigo-600 hover:text-white px-4 py-2 rounded-lg my-2 font-medium transition-all duration-300"
                >
                  Register as Customer
                </button>
                <button
                  onClick={() => setRegistrationMode("assistant")}
                  className="block w-full bg-white text-teal-600 hover:bg-teal-600 hover:text-white px-4 py-2 rounded-lg my-2 font-medium transition-all duration-300"
                >
                  Register as Assistant
                </button>
              </>
            )}
          </div>
        )}
      </nav>

      {/* Login Modal */}
      {authMode === "login" && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
          <div
            className="bg-white rounded-xl shadow-2xl w-full max-w-md relative transform transition-all duration-300 ease-in-out"
            style={{ animation: "modalFadeIn 0.3s" }}
          >
            {/* Close button */}
            <button
              onClick={closeAuthModal}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Close modal"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>

            {/* Modal header */}
            <div className="p-6 border-b">
              <h2 className="text-2xl font-bold text-gray-800">Welcome Back</h2>
              <p className="text-gray-500 mt-1">
                Sign in to access your account
              </p>
            </div>

            {/* Modal body */}
            <div className="p-6">
              {errors.general && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-500 rounded-lg text-sm">
                  {errors.general}
                </div>
              )}

              <form onSubmit={handleLogin}>
                {/* email */}
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-medium mb-1"
                    htmlFor="login-email"
                  >
                    email
                  </label>
                  <div className="relative">
                    <div className="absolute left-3 top-3 text-gray-400">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <input
                      id="login-email"
                      type="text"
                      name="email"
                      value={credentials.email}
                      onChange={handleChange}
                      className={`pl-10 w-full p-3 border ${
                        errors.email ? "border-red-300" : "border-gray-300"
                      } rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                      placeholder="Enter your email"
                    />
                  </div>
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                  )}
                </div>

                {/* Password */}
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-medium mb-1"
                    htmlFor="login-password"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute left-3 top-3 text-gray-400">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <input
                      id="login-password"
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={credentials.password}
                      onChange={handleChange}
                      className={`pl-10 w-full p-3 border ${
                        errors.password ? "border-red-300" : "border-gray-300"
                      } rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                      placeholder="Enter your password"
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                    >
                      {showPassword ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                          <path
                            fillRule="evenodd"
                            d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z"
                            clipRule="evenodd"
                          />
                          <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                        </svg>
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.password}
                    </p>
                  )}
                </div>

                {/* Remember me */}
                <div className="flex items-center mb-4">
                  <input
                    id="remember"
                    type="checkbox"
                    checked={rememberMe}
                    onChange={() => setRememberMe(!rememberMe)}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="remember"
                    className="ml-2 block text-sm text-gray-700"
                  >
                    Remember me
                  </label>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full p-3 rounded-lg font-medium transition-all duration-300 bg-blue-500 hover:bg-blue-600 text-white ${
                    isLoading ? "opacity-70 cursor-not-allowed" : ""
                  }`}
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center">
                      <svg
                        className="animate-spin mr-2 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Processing...
                    </span>
                  ) : (
                    "Sign In"
                  )}
                </button>
              </form>

              {/* Footer */}
              <div className="mt-6 text-center text-sm">
                <p className="text-gray-600">
                  Don't have an account?{" "}
                  <button
                    onClick={() => {
                      closeAuthModal();
                      setRegistrationMode("customer");
                    }}
                    className="text-indigo-600 hover:text-indigo-800 font-medium"
                  >
                    Register
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Registration Modal */}
      {registrationMode && (
        <RegistrationModal
          isOpen={!!registrationMode}
          onClose={closeRegistrationModal}
          userType={registrationMode}
        />
      )}

      {/* Add this style for animation */}
      <style jsx>{`
        @keyframes modalFadeIn {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  );
};

export default Navbar;
