// components/HeroStatsCard.js
import { Sparkles, Globe, Hand } from 'lucide-react';

export default function HeroStatsCard() {
  return (
    <div className="w-full max-w-sm mx-auto bg-white rounded-2xl shadow-xl p-4 sm:p-6 border border-gray-200 lg:max-w-md">
      <h3 className="text-lg sm:text-xl font-semibold text-blue-600 mb-3 sm:mb-4">Why Signedify?</h3>
      <ul className="space-y-3 sm:space-y-4 text-gray-700 text-sm">
        <li className="flex items-center gap-2 sm:gap-3">
          <Sparkles className="text-blue-500 flex-shrink-0" size={18} />
          <span><strong>AI-Powered</strong> sign language detection</span>
        </li>
        <li className="flex items-center gap-2 sm:gap-3">
          <Hand className="text-purple-500 flex-shrink-0" size={18} />
          <span><strong>20+ ASL signs</strong> supported (and growing)</span>
        </li>
        <li className="flex items-center gap-2 sm:gap-3">
          <Globe className="text-green-500 flex-shrink-0" size={18} />
          <span><strong>Browser-based</strong>, no install needed</span>
        </li>
      </ul>
    </div>
  );
}
