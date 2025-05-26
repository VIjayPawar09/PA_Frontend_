import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10">
      <div className="container mx-auto px-6 md:px-12">
        {/* Title Section */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary">
            Personal Assistance
          </h1>
          <p className="text-gray-400 mt-2 text-lg">
            Your reliable assistant for everyday tasks of elderly people.
          </p>
        </div>

        {/* Content Section */}
        <div className="flex flex-wrap justify-between text-sm">
          {/* About Project */}
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h2 className="text-lg font-semibold text-secondary">
              About Project
            </h2>
            <p className="mt-3 text-gray-400 leading-relaxed">
              This project is designed to assist elderly people by providing
              personalized support and care. It aims to make their daily lives
              easier through technology.
            </p>
          </div>

          {/* Contact Info */}
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h2 className="text-lg font-semibold text-secondary">Contact Us</h2>
            <ul className="mt-3 text-gray-400 space-y-2">
              <li className="flex items-center">
                <FaEnvelope className="mr-2" /> personalassistance12@gmail.com
              </li>
              <li className="flex items-center">
                <FaPhone className="mr-2" /> 9828291010
              </li>
              <li className="flex items-center">
                <FaMapMarkerAlt className="mr-2" /> 123 Assistance Tower, Tech
                City, Pune
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div className="w-full md:w-1/3 text-center md:text-right">
            <h2 className="text-lg font-semibold text-secondary">Follow Us</h2>
            <div className="mt-3 flex justify-center md:justify-end space-x-4">
              <a
                href="#"
                className="text-gray-400 hover:text-primary transition"
              >
                <FaFacebookF size={20} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-primary transition"
              >
                <FaTwitter size={20} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-primary transition"
              >
                <FaInstagram size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-gray-700 mt-8 pt-4 text-center text-gray-500 text-sm">
          <p>
            © {new Date().getFullYear()} Personal Assistance. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
