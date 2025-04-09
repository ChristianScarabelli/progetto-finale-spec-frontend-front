import React from "react";


export default function Footer() {

  return (
    <footer className="bg-gray-50 text-green-600 p-5 pt-8 py-6">
      <div className="flex flex-col xs:flex-col sm:flex-col md:flex-row flex-wrap justify-between gap-5">
        {/* Descrizione */}
        <div className="flex-1">
          <h2 className="text-green-800 mb-2 font-bold">Vegan Food</h2>
          <p className="text-gray-700">
            The ideal platform to study vegan food of all genres and compare the nutrients. Add them to the wishlist, don't forget to buy them, stay healthy!</p>
        </div>

        {/* Quick Links */}
        <div className='flex-1'>
          <h3 className="text-green-800 mb-2 font-bold">Quick links</h3>
          <ul className="list-none space-y-2">
            <li>
              <a href="/" className="hover:text-cyan-600 transition-colors duration-300">
                Home
              </a>
            </li>
            <li>
              <a href="/foods" className="hover:text-cyan-600 transition-colors duration-300">
                Food list
              </a>
            </li>
          </ul>
        </div>
        {/* Social Media */}
        <div className='flex-1'>
          <h3 className="text-green-800 mb-2 font-bold">Follow us</h3>
          <ul className="list-none space-y-2">
            <li>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-cyan-600 transition-colors duration-300 flex items-center"
              >
                <img width="35" height="35" src="https://img.icons8.com/fluency/48/facebook-new.png" alt="facebook-new" /> Facebook
              </a>
            </li>
            <li>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-cyan-600 transition-colors duration-300 flex items-center"
              >
                <img width="35" height="35" src="https://img.icons8.com/lollipop/48/twitterx.png" alt="twitterx" /> Twitter
              </a>
            </li>
            <li>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-cyan-600 transition-colors duration-300 flex items-center"
              >
                <img width="35" height="35" src="https://img.icons8.com/fluency/48/instagram-new.png" alt="instagram-new" /> Instagram
              </a>
            </li>
            <li>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-cyan-600 transition-colors duration-300 flex items-center"
              >
                <img width="35" height="35" src="https://img.icons8.com/fluency/48/linkedin.png" alt="linkedin" /> LinkedIn
              </a>
            </li>
          </ul>
        </div>
      </div>
      {/* Copyright */}
      <div className="text-center mt-5 border-t border-green-600 pt-3 text-sm text-gray-600">
        <p>&copy; 2025 Vegan Food. All rights reserved.</p>
      </div>
    </footer>
  );
}
