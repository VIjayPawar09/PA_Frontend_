import React, { useState, useRef } from "react";
import {
  FaPills,
  FaUserMd,
  FaStethoscope,
  FaBeer,
  FaFilm,
  FaShoppingCart,
  FaBolt,
  FaMobileAlt,
} from "react-icons/fa";
import AppointmentPage from "../AppointmentPage/Appointment";

const Services = () => {
  const [selectedService, setSelectedService] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const formRef = useRef(null); // Reference for scrolling to the form

  const services = [
    {
      title: "Medication",
      description:
        "Get reminders for your medications and manage prescriptions efficiently.",
      icon: <FaPills className="text-blue-500 text-4xl" />,
    },
    {
      title: "Doctor Appointments",
      description:
        "Schedule appointments with doctors and manage your health consultations.",
      icon: <FaUserMd className="text-green-500 text-4xl" />,
    },
    {
      title: "Health Checkups",
      description:
        "Book routine health checkups and access detailed reports online.",
      icon: <FaStethoscope className="text-red-500 text-4xl" />,
    },
    {
      title: "Drink Beer",
      description:
        "Discover the best beer spots and keep track of your favorite beverages.",
      icon: <FaBeer className="text-yellow-500 text-4xl" />,
    },
    {
      title: "Watch Movie",
      description:
        "Book movie tickets and enjoy a personalized watchlist for your entertainment.",
      icon: <FaFilm className="text-gray-700 text-4xl" />,
    },
    {
      title: "Grocery",
      description: "Order groceries online and manage your pantry efficiently.",
      icon: <FaShoppingCart className="text-green-600 text-4xl" />,
    },
    {
      title: "Electricity Bill",
      description:
        "Pay your electricity bills easily and track your monthly usage.",
      icon: <FaBolt className="text-yellow-400 text-4xl" />,
    },
    {
      title: "Mobile Bill",
      description: "Recharge your mobile and pay bills with just a few clicks.",
      icon: <FaMobileAlt className="text-blue-700 text-4xl" />,
    },
  ];

  const handleServiceClick = (service) => {
    setSelectedService(service);
    setShowForm(true);
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100); // Small delay to ensure the form is rendered before scrolling
  };

  const closeForm = () => {
    setSelectedService(null);
    setShowForm(false);
  };

  return (
    <div className="bg-gray-100 py-16">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">Our Services</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 cursor-pointer"
              onClick={() => handleServiceClick(service)}
            >
              <div className="mb-4 flex justify-center">{service.icon}</div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                {service.title}
              </h3>
              <p className="text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Form Section */}
      {showForm && (
        <div ref={formRef} className="mt-16">
          <AppointmentPage />
        </div>
      )}
    </div>
  );
};

export default Services;
