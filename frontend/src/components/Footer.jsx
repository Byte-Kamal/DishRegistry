import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="py-6 text-white bg-black">
      <div className="container px-4 mx-auto">
        <div className="flex flex-col items-center justify-between md:flex-row">
          {/* Logo */}
          <div className="mb-4 md:mb-0">
            <h1 className="text-2xl font-bold">
              <span className="text-red-500">Dish</span>
              <span className="text-white">Registry</span>
            </h1>
          </div>

          {/* Navigation Links */}
          <ul className="flex flex-col mb-4 md:flex-row md:mb-0">
            <li className="mb-2 md:mx-4 md:mb-0">
              <Link to="/" className="hover:text-gray-400">
                Home
              </Link>
            </li>
            <li className="mb-2 md:mx-4 md:mb-0">
              <Link to="/recipes" className="hover:text-gray-400">
                Recipes
              </Link>
            </li>
          </ul>

          {/* Social Media Icons */}
          <div className="flex space-x-4">
            <a
              href="https://facebook.com"
              className="text-gray-400 hover:text-white"
              aria-label="Facebook"
            >
              <FaFacebook size={20} />
            </a>
            <a
              href="https://twitter.com"
              className="text-gray-400 hover:text-white"
              aria-label="Twitter"
            >
              <FaTwitter size={20} />
            </a>
            <a
              href="https://instagram.com"
              className="text-gray-400 hover:text-white"
              aria-label="Instagram"
            >
              <FaInstagram size={20} />
            </a>
            <a
              href="https://linkedin.com"
              className="text-gray-400 hover:text-white"
              aria-label="LinkedIn"
            >
              <FaLinkedin size={20} />
            </a>
          </div>
        </div>
        <div className="mt-4 text-center">
          <p className="text-sm">
            © {new Date().getFullYear()} DishNetwork. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
