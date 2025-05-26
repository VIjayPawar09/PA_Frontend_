import axios from "axios";
import { useEffect, useState } from "react";

export const RegistrationModal = ({ isOpen, onClose, userType }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // Common fields
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",

    // Assistant specific fields
    experience: "",
    specializations: [],
    availability: [],
    certifications: "",

    // Customer specific fields
    age: "",
    emergencyContact: "",
    medicalConditions: "",
    assistanceNeeded: [],
    preferredSchedule: "",
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    // Reset form when modal opens
    if (isOpen) {
      setStep(1);
      setErrors({});
    }

    // Load existing users
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    setUsers(storedUsers);

    // Handle ESC key
    const handleEsc = (event) => {
      if (event.keyCode === 27) onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [isOpen, onClose]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    // Handle checkboxes (arrays)
    if (type === "checkbox") {
      const arrayField = formData[name] || [];
      if (checked) {
        setFormData({
          ...formData,
          [name]: [...arrayField, value],
        });
      } else {
        setFormData({
          ...formData,
          [name]: arrayField.filter((item) => item !== value),
        });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }

    // Clear specific error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const validateStep = (currentStep) => {
    const newErrors = {};

    // Validate step 1 (common fields)
    if (currentStep === 1) {
      if (!formData.username.trim()) {
        newErrors.username = "Username is required";
      } else if (formData.username.length < 3) {
        newErrors.username = "Username must be at least 3 characters";
      }

      if (!formData.email.trim()) {
        newErrors.email = "Email is required";
      } else {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
          newErrors.email = "Please enter a valid email";
        }
      }

      if (!formData.password) {
        newErrors.password = "Password is required";
      } else if (formData.password.length < 6) {
        newErrors.password = "Password must be at least 6 characters";
      }

      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match";
      }

      if (!formData.phoneNumber) {
        newErrors.phoneNumber = "Phone number is required";
      }
    }

    // Validate step 2 (type-specific fields)
    if (currentStep === 2) {
      if (userType === "assistant") {
        if (!formData.experience) {
          newErrors.experience = "Experience information is required";
        }
        if (formData.specializations.length === 0) {
          newErrors.specializations =
            "Please select at least one specialization";
        }
        if (formData.availability.length === 0) {
          newErrors.availability = "Please select your availability";
        }
      } else {
        if (!formData.age) {
          newErrors.age = "Age is required";
        }
        if (!formData.emergencyContact) {
          newErrors.emergencyContact = "Emergency contact is required";
        }
        if (formData.assistanceNeeded.length === 0) {
          newErrors.assistanceNeeded =
            "Please select at least one type of assistance needed";
        }
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = () => {
    if (validateStep(step)) {
      setStep(step + 1);
    }
  };

  const handlePrevStep = () => {
    setStep(step - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateStep(step)) return;

    setIsLoading(true);

    // Simulate network request delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    // // Check if user already exists
    // const existingUser = users.find(
    //   (user) => user.username === formData.username || user.email === formData.email
    // );

    // if (existingUser) {
    //   setErrors({ username: "User already exists! Please use different credentials." });
    //   setIsLoading(false);
    //   return;
    // }

    // Create a new user
    const newUser = {
      id: Date.now().toString(),
      userType,
      username: formData.username,
      email: formData.email,
      phoneNumber: formData.phoneNumber,
      password: formData.password,
      createdAt: new Date().toISOString(),
    };

    // Add user type specific fields
    if (userType === "assistant") {
      newUser.experience = formData.experience;
      newUser.specializations = formData.specializations;
      newUser.availability = formData.availability;
      newUser.certifications = formData.certifications;
    } else {
      newUser.age = formData.age;
      newUser.emergencyContact = formData.emergencyContact;
      newUser.medicalConditions = formData.medicalConditions;
      newUser.assistanceNeeded = formData.assistanceNeeded;
      newUser.preferredSchedule = formData.preferredSchedule;
    }

    setIsLoading(false);
    const newUsers = [...users, newUser];
    const res = await axios.post(
      "https://pa-backend-wprc.onrender.com/user/register",
      newUser
    );
    console.log(res);

    // Update state and localStorage
    setUsers(newUsers);
    localStorage.setItem("users", JSON.stringify(newUsers));
    localStorage.setItem("token", res.data.token);

    // Show success message
    alert(
      `Registration successful! You've registered as ${
        userType === "assistant" ? "an assistant" : "a customer"
      }.`
    );

    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 overflow-scroll bg-black bg-opacity-50 flex justify-center items-center z-50 p-8">
      <div
        className="bg-white rounded-xl shadow-2xl w-full max-w-md relative transform transition-all duration-300 ease-in-out"
        style={{ animation: "modalFadeIn 0.3s" }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
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
          <h2 className="text-2xl font-bold text-gray-800">
            {userType === "assistant"
              ? "Register as Assistant"
              : "Register as Customer"}
          </h2>
          <p className="text-gray-500 mt-1">
            {userType === "assistant"
              ? "Join our team to provide care and assistance"
              : "Sign up to receive personalized assistance and care"}
          </p>
          <div className="flex mt-4 text-sm">
            <div
              className={`flex-1 text-center py-2 rounded-l-lg ${
                step === 1
                  ? "bg-purple-100 text-purple-700 font-medium"
                  : "text-gray-500"
              }`}
            >
              Account Info
            </div>
            <div
              className={`flex-1 text-center py-2 rounded-r-lg ${
                step === 2
                  ? "bg-purple-100 text-purple-700 font-medium"
                  : "text-gray-500"
              }`}
            >
              {userType === "assistant"
                ? "Professional Details"
                : "Personal Details"}
            </div>
          </div>
        </div>

        {/* Modal body */}
        <div className="p-6">
          <form
            onSubmit={
              step === 2
                ? handleSubmit
                : (e) => {
                    e.preventDefault();
                    handleNextStep();
                  }
            }
          >
            {/* Step 1: Common Fields */}
            {step === 1 && (
              <>
                {/* Username */}
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-medium mb-1"
                    htmlFor="username"
                  >
                    Username *
                  </label>
                  <input
                    id="username"
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    className={`w-full p-3 border ${
                      errors.username ? "border-red-300" : "border-gray-300"
                    } rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500`}
                    placeholder="Choose a username"
                  />
                  {errors.username && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.username}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-medium mb-1"
                    htmlFor="email"
                  >
                    Email Address *
                  </label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full p-3 border ${
                      errors.email ? "border-red-300" : "border-gray-300"
                    } rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500`}
                    placeholder="Enter your email"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                  )}
                </div>

                {/* Phone Number */}
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-medium mb-1"
                    htmlFor="phoneNumber"
                  >
                    Phone Number *
                  </label>
                  <input
                    id="phoneNumber"
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    className={`w-full p-3 border ${
                      errors.phoneNumber ? "border-red-300" : "border-gray-300"
                    } rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500`}
                    placeholder="Enter your phone number"
                  />
                  {errors.phoneNumber && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.phoneNumber}
                    </p>
                  )}
                </div>

                {/* Password */}
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-medium mb-1"
                    htmlFor="password"
                  >
                    Password *
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className={`w-full p-3 border ${
                        errors.password ? "border-red-300" : "border-gray-300"
                      } rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500`}
                      placeholder="Create a password"
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

                {/* Confirm Password */}
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-medium mb-1"
                    htmlFor="confirmPassword"
                  >
                    Confirm Password *
                  </label>
                  <input
                    id="confirmPassword"
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className={`w-full p-3 border ${
                      errors.confirmPassword
                        ? "border-red-300"
                        : "border-gray-300"
                    } rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500`}
                    placeholder="Confirm your password"
                  />
                  {errors.confirmPassword && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.confirmPassword}
                    </p>
                  )}
                </div>
              </>
            )}

            {/* Step 2: User Type Specific Fields */}
            {step === 2 && userType === "assistant" && (
              <>
                {/* Experience */}
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-medium mb-1"
                    htmlFor="experience"
                  >
                    Years of Experience *
                  </label>
                  <select
                    id="experience"
                    name="experience"
                    value={formData.experience}
                    onChange={handleChange}
                    className={`w-full p-3 border ${
                      errors.experience ? "border-red-300" : "border-gray-300"
                    } rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500`}
                  >
                    <option value="">Select years of experience</option>
                    <option value="0-1">Less than 1 year</option>
                    <option value="1-3">1-3 years</option>
                    <option value="3-5">3-5 years</option>
                    <option value="5-10">5-10 years</option>
                    <option value="10+">More than 10 years</option>
                  </select>
                  {errors.experience && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.experience}
                    </p>
                  )}
                </div>

                {/* Specializations */}
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-medium mb-1">
                    Specializations *
                  </label>
                  <div className="space-y-2">
                    {[
                      "Personal Care",
                      "Medical Assistance",
                      "Mobility Assistance",
                      "Companionship",
                      "Household Help",
                      "Dementia Care",
                    ].map((spec) => (
                      <div key={spec} className="flex items-center">
                        <input
                          id={`spec-${spec}`}
                          type="checkbox"
                          name="specializations"
                          value={spec}
                          checked={formData.specializations.includes(spec)}
                          onChange={handleChange}
                          className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                        />
                        <label
                          htmlFor={`spec-${spec}`}
                          className="ml-2 block text-sm text-gray-700"
                        >
                          {spec}
                        </label>
                      </div>
                    ))}
                  </div>
                  {errors.specializations && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.specializations}
                    </p>
                  )}
                </div>

                {/* Availability */}
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-medium mb-1">
                    Availability *
                  </label>
                  <div className="space-y-2">
                    {[
                      "Weekday Mornings",
                      "Weekday Afternoons",
                      "Weekday Evenings",
                      "Weekend Mornings",
                      "Weekend Afternoons",
                      "Weekend Evenings",
                      "Overnight Care",
                    ].map((time) => (
                      <div key={time} className="flex items-center">
                        <input
                          id={`avail-${time}`}
                          type="checkbox"
                          name="availability"
                          value={time}
                          checked={formData.availability.includes(time)}
                          onChange={handleChange}
                          className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                        />
                        <label
                          htmlFor={`avail-${time}`}
                          className="ml-2 block text-sm text-gray-700"
                        >
                          {time}
                        </label>
                      </div>
                    ))}
                  </div>
                  {errors.availability && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.availability}
                    </p>
                  )}
                </div>

                {/* Certifications */}
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-medium mb-1"
                    htmlFor="certifications"
                  >
                    Certifications / Qualifications
                  </label>
                  <textarea
                    id="certifications"
                    name="certifications"
                    value={formData.certifications}
                    onChange={handleChange}
                    rows="3"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="List any relevant certifications or qualifications"
                  ></textarea>
                </div>
              </>
            )}

            {step === 2 && userType === "customer" && (
              <>
                {/* Age */}
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-medium mb-1"
                    htmlFor="age"
                  >
                    Age *
                  </label>
                  <input
                    id="age"
                    type="number"
                    name="age"
                    min="0"
                    max="120"
                    value={formData.age}
                    onChange={handleChange}
                    className={`w-full p-3 border ${
                      errors.age ? "border-red-300" : "border-gray-300"
                    } rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500`}
                    placeholder="Enter age"
                  />
                  {errors.age && (
                    <p className="mt-1 text-sm text-red-500">{errors.age}</p>
                  )}
                </div>

                {/* Emergency Contact */}
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-medium mb-1"
                    htmlFor="emergencyContact"
                  >
                    Emergency Contact *
                  </label>
                  <input
                    id="emergencyContact"
                    type="text"
                    name="emergencyContact"
                    value={formData.emergencyContact}
                    onChange={handleChange}
                    className={`w-full p-3 border ${
                      errors.emergencyContact
                        ? "border-red-300"
                        : "border-gray-300"
                    } rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500`}
                    placeholder="Name and phone number"
                  />
                  {errors.emergencyContact && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.emergencyContact}
                    </p>
                  )}
                </div>

                {/* Medical Conditions */}
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-medium mb-1"
                    htmlFor="medicalConditions"
                  >
                    Medical Conditions or Allergies
                  </label>
                  <textarea
                    id="medicalConditions"
                    name="medicalConditions"
                    value={formData.medicalConditions}
                    onChange={handleChange}
                    rows="3"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="List any medical conditions or allergies"
                  ></textarea>
                </div>

                {/* Assistance Needed */}
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-medium mb-1">
                    Assistance Needed *
                  </label>
                  <div className="space-y-2">
                    {[
                      "Personal Care",
                      "Medication Reminder",
                      "Mobility Assistance",
                      "Meal Preparation",
                      "Housekeeping",
                      "Transportation",
                      "Companionship",
                    ].map((assist) => (
                      <div key={assist} className="flex items-center">
                        <input
                          id={`assist-${assist}`}
                          type="checkbox"
                          name="assistanceNeeded"
                          value={assist}
                          checked={formData.assistanceNeeded.includes(assist)}
                          onChange={handleChange}
                          className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                        />
                        <label
                          htmlFor={`assist-${assist}`}
                          className="ml-2 block text-sm text-gray-700"
                        >
                          {assist}
                        </label>
                      </div>
                    ))}
                  </div>
                  {errors.assistanceNeeded && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.assistanceNeeded}
                    </p>
                  )}
                </div>

                {/* Preferred Schedule */}
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-medium mb-1"
                    htmlFor="preferredSchedule"
                  >
                    Preferred Schedule
                  </label>
                  <textarea
                    id="preferredSchedule"
                    name="preferredSchedule"
                    value={formData.preferredSchedule}
                    onChange={handleChange}
                    rows="2"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Describe your preferred schedule for assistance"
                  ></textarea>
                </div>
              </>
            )}

            {/* Form buttons */}
            <div className="flex justify-between mt-6">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={handlePrevStep}
                  className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Back
                </button>
              ) : (
                <div></div> // Empty div for spacing
              )}

              <button
                type="submit"
                disabled={isLoading}
                className={`px-6 py-2 rounded-lg font-medium transition-all duration-300 ${
                  step < 2
                    ? "bg-purple-600 hover:bg-purple-700 text-white"
                    : "bg-green-500 hover:bg-green-600 text-white"
                } ${isLoading ? "opacity-70 cursor-not-allowed" : ""}`}
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
                ) : step < 2 ? (
                  "Next"
                ) : (
                  "Complete Registration"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Animation style */}
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
    </div>
  );
};
