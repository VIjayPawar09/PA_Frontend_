import React, { useState } from "react";

const AppointmentPage = () => {
  const [formData, setFormData] = useState({
    hours: "",
    time: "",
    service: "",
    details: "",
  });

  const services = [
    "Medications",
    "Doctor Appointment",
    "Health Checkup",
    "Drinking",
    "Watch Movie",
    "Grocery",
    "Electricity Bill",
    "Mobile Bill",
  ];

  const chargesList = [
    { hours: 1, price: "₹100" },
    { hours: 2, price: "₹200" },
    { hours: 3, price: "₹300" },
    { hours: 4, price: "₹400" },
    { hours: 5, price: "₹500" },
    { hours: 8, price: "₹1000" },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const makePayment = async () => {
    const { data } = await axios.post(
      "http://localhost:5000/api/payment/create-order",
      {
        amount: 500, // INR
      }
    );

    const options = {
      key: "rzp_test_XLPxcvbv8wFLpO", // Replace with Razorpay key_id
      amount: data.amount,
      currency: data.currency,
      name: "Personal Assistant App",
      description: "Test Transaction",
      order_id: data.orderId,
      handler: function (response) {
        alert("Payment Successful!");
        console.log(response);
      },
      prefill: {
        name: "User Name",
        email: "user@example.com",
        contact: "9999999999",
      },
      theme: {
        color: "#3399cc",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    alert("Appointment Booked Successfully!");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
          Book an Appointment
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Hours */}
          <div>
            <label
              htmlFor="hours"
              className="block text-gray-700 font-medium mb-1"
            >
              Number of Hours
            </label>
            <input
              type="number"
              id="hours"
              name="hours"
              value={formData.hours}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              required
            />
          </div>

          {/* Time */}
          <div>
            <label
              htmlFor="time"
              className="block text-gray-700 font-medium mb-1"
            >
              Preferred Time
            </label>
            <input
              type="time"
              id="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              required
            />
          </div>

          {/* Services */}
          <div>
            <label
              htmlFor="service"
              className="block text-gray-700 font-medium mb-1"
            >
              Select Service
            </label>
            <select
              id="service"
              name="service"
              value={formData.service}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              required
            >
              <option value="" disabled>
                Select a service
              </option>
              {services.map((service, index) => (
                <option key={index} value={service}>
                  {service}
                </option>
              ))}
            </select>
          </div>

          {/* Charges */}
          <div>
            <label
              htmlFor="charges"
              className="block text-gray-700 font-medium mb-1"
            >
              Charges
            </label>
            <select
              id="charges"
              name="charges"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              onChange={handleChange}
              required
            >
              <option value="" disabled>
                Select charges based on hours
              </option>
              {chargesList.map((charge, index) => (
                <option key={index} value={charge.hours}>
                  {charge.hours} Hour(s) - {charge.price}
                </option>
              ))}
            </select>
          </div>

          {/* Additional Details */}
          <div>
            <label
              htmlFor="details"
              className="block text-gray-700 font-medium mb-1"
            >
              Address
            </label>
            <textarea
              id="details"
              name="details"
              value={formData.details}
              onChange={handleChange}
              rows="4"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              placeholder="Fill your address here..."
            ></textarea>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200"
              onClick={makePayment}
            >
              Book Appointment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AppointmentPage;
