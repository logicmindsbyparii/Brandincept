import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaWhatsapp, FaTimes } from "react-icons/fa";

const FloatingWhatsApp = () => {
  const [showPopup, setShowPopup] = useState(true); // Popup visible on load

  const phoneNumber = "917622934444"; // +91 76229 34444
  const message = "Hi! I'm interested in your corporate leasing services.";
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <div className="fixed bottom-6 right-6 z-[9999]">
      {/* Popup Message */}
      <AnimatePresence>
        {showPopup && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            className="absolute bottom-20 right-0 bg-white rounded-2xl shadow-2xl p-4 w-64 border border-gray-100"
          >
            <button
              onClick={() => setShowPopup(false)}
              className="absolute -top-2 -right-2 w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300"
            >
              <FaTimes className="text-xs" />
            </button>

            {/* Header with WhatsApp icon and Brandincept logo */}
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-[#017dc5] rounded-full flex items-center justify-center flex-shrink-0">
                <FaWhatsapp className="text-white text-xl" />
              </div>
              <div className="flex flex-col">
                <img
                  src="/assests/bluelogo-removebg.png"
                  alt="Brandincept"
                  className="h-6 w-auto object-contain"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.style.display = "none";
                    // Fallback text if logo fails to load
                    e.target.insertAdjacentHTML(
                      "afterend",
                      '<span class="font-bold text-sm">Brandincept</span>'
                    );
                  }}
                />
                <p className="text-xs text-gray-800 mt-1">Online</p>
              </div>
            </div>

            <p className="text-sm text-gray-800 mb-3">
              👋 Hi! How can we help you with Corporate Leasing | Franchise Development | Business Consulting?
            </p>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-center bg-[#017dc5] text-white-300 text-sm font-semibold py-2 rounded-lg hover:bg-green-600"
            >
              Start Chat
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* WhatsApp Button */}
      <motion.a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onMouseEnter={() => setShowPopup(true)} // Reopen popup on hover
        className="flex items-center justify-center w-14 h-14 bg-gradient-to-r from-[#017dc5] to-[#017dc5] text-white rounded-full shadow-2xl hover:shadow-green-500/50 relative overflow-hidden"
      >
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute inset-0 bg-white/20 rounded-full"
        />
        <FaWhatsapp className="text-3xl relative z-10" />
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white animate-pulse" />
      </motion.a>
    </div>
  );
};

export default FloatingWhatsApp;
