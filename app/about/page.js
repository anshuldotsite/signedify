export default function About() {
    return (
      <div className="min-h-screen bg-gray-900 flex flex-col md:flex-row">
        
        {/* Main Content */}
        <main className="flex-1 flex flex-col md:flex-row items-center justify-center px-8 py-12">
          {/* Text Section */}
        
          
          {/* Phone Mockup */}
          <div className="flex-1 flex justify-center mt-12 md:mt-0">
            <div className="relative w-[300px] h-[600px] flex items-center justify-center">
              {/* Phone Frame */}
              <div className="rounded-[2.5rem] bg-white shadow-2xl border-4 border-gray-200 w-[270px] h-[550px] flex flex-col items-center p-4">
                {/* Notch */}
                <div className="w-24 h-3 bg-gray-300 rounded-b-lg mx-auto mb-4"></div>
                {/* Mockup Content */}
                <div className="w-full flex flex-col gap-4">
                  <div className="flex justify-between items-center mb-2">
                    <button className="text-gray-400 text-xl">&times;</button>
                    <div className="flex gap-2">
                      <button className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-xs font-semibold">Location</button>
                      <button className="bg-gray-100 text-gray-500 px-3 py-1 rounded-full text-xs font-semibold">University</button>
                    </div>
                  </div>
                  <div className="text-gray-700 font-medium text-lg mb-2">Where do you want to study?</div>
                  <input
                    type="text"
                    placeholder="Search location"
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 mb-2 text-sm"
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-blue-50 rounded-lg flex flex-col items-center justify-center p-3">
                      <div className="w-10 h-10 bg-blue-200 rounded-full mb-1"></div>
                      <span className="text-xs text-gray-700">Any place</span>
                    </div>
                    <div className="bg-gray-100 rounded-lg flex flex-col items-center justify-center p-3">
                      <div className="w-10 h-10 bg-gray-300 rounded-full mb-1"></div>
                      <span className="text-xs text-gray-700">USA</span>
                    </div>
                    <div className="bg-gray-100 rounded-lg flex flex-col items-center justify-center p-3">
                      <div className="w-10 h-10 bg-gray-300 rounded-full mb-1"></div>
                      <span className="text-xs text-gray-700">EU</span>
                    </div>
                    <div className="bg-gray-100 rounded-lg flex flex-col items-center justify-center p-3">
                      <div className="w-10 h-10 bg-gray-300 rounded-full mb-1"></div>
                      <span className="text-xs text-gray-700">Canada</span>
                    </div>
                  </div>
                  <button className="bg-blue-500 text-white rounded-lg py-2 mt-6 font-semibold">Search</button>
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1 flex flex-col items-center md:items-start text-center pb-[6rem] md:text-left">
            <h1 className="text-5xl font-semibold text-white leading-tight mb-6">
              Our Goal
            </h1>
            <p className="text-gray-300 max-w-xl text-lg">
                Signedify is dedicated to bridging the communication divide between individuals who rely on sign language and those who may find it challenging to understand. Our mission is to alleviate the struggles faced by those who are unable to express themselves, building a more inclusive environment where everyone can share their thoughts and emotions freely. With Signedify, we aim to foster connections that transcend any disabilities impeding their paths.
            </p>
          </div>
        </main>
      </div>
    );
  }
  