// pages/contact.js

export default function Contact() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 pt-[4rem]">
      <div className="bg-white rounded-xl shadow-md p-8 max-w-md w-full">
        <h1 className="text-2xl font-semibold text-blue-800 mb-4 text-center">
          Contact Us
        </h1>
        <p className="text-gray-600 mb-8 text-center">
          Have questions or feedback? Fill out the form below and our team will get back to you soon!
        </p>
        <form className="space-y-6">
          <div>
            <label className="block text-gray-700 mb-1" htmlFor="name">
              Name
            </label>
            <input
              className="w-full px-4 py-2 border placeholder-gray-400 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              type="text"
              id="name"
              placeholder="Your Name"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1" htmlFor="email">
              Email
            </label>
            <input
              className="w-full px-4 py-2 border placeholder-gray-400 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              type="email"
              id="email"
              placeholder="you@example.com"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1" htmlFor="message">
              Message
            </label>
            <textarea
              className="w-full px-4 py-2 border placeholder-gray-400 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              id="message"
              rows={4}
              placeholder="How can we help you?"
              required
            />
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-white rounded-full w-12 h-12 shadow-md transition-colors"
              aria-label="Send Message"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 12h14M12 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </form>
      </div>

          <div className="bg-blue-400 rounded-2xl shadow-lg p-8 max-w-3xl w-full mt-8 mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-8">
        {/* Phone */}
        <div className="flex flex-col items-center bg-white/60 rounded-xl px-6 py-6 shadow transition hover:scale-105 hover:shadow-xl">
          <img src="/phone.png" alt="Phone" className="w-16 h-16 mb-4" />
          <span className="font-semibold text-gray-800 text-base">(123) 456-7899</span>
        </div>

        {/* Email */}
        <div className="flex flex-col items-center bg-white/60 rounded-xl px-6 py-6 shadow transition hover:scale-105 hover:shadow-xl">
          <img src="/email.png" alt="Email" className="w-16 h-16 mb-4" />
          <span className="font-semibold text-gray-800 text-base">test@gmail.com</span>
        </div>

        {/* Location */}
        <div className="flex flex-col items-center bg-white/60 rounded-xl px-6 py-6 shadow transition hover:scale-105 hover:shadow-xl">
          <img src="/location.png" alt="Location" className="w-16 h-16 mb-4" />
          <span className="font-semibold text-gray-800 text-base">58 Negro Arroyo Lane</span>
        </div>
      </div>
    </div>


    </div>
  );
}