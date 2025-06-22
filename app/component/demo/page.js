'use client'

import { useState, useRef, useEffect } from 'react'

export default function Demo() {
  const [isCameraOn, setIsCameraOn] = useState(false)
  const [detectedSign, setDetectedSign] = useState('')
  const [translatedText, setTranslatedText] = useState('')
  const [targetLanguage, setTargetLanguage] = useState('en')
  const [isProcessing, setIsProcessing] = useState(false)
  const videoRef = useRef(null)
  const streamRef = useRef(null)

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Spanish' },
    { code: 'fr', name: 'French' },
    { code: 'de', name: 'German' },
    { code: 'zh', name: 'Chinese' },
    { code: 'ja', name: 'Japanese' }
  ]

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true })
      streamRef.current = stream
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        setIsCameraOn(true)
      }
    } catch (error) {
      alert('Unable to access camera: ' + error.message)
    }
  }

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop())
    }
    setIsCameraOn(false)
    setDetectedSign('')
    setTranslatedText('')
  }

  const detectSign = async () => {
    if (!isCameraOn) return

    setIsProcessing(true)

    setTimeout(() => {
      const mockSigns = ['Hello', 'Thank you', 'Please', 'Yes', 'No']
      const detected = mockSigns[Math.floor(Math.random() * mockSigns.length)]
      setDetectedSign(detected)
      translateText(detected)
      setIsProcessing(false)
    }, 1000)
  }

  const speak = (text) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = targetLanguage
      speechSynthesis.speak(utterance)
    } else {
      alert('TTS not supported in this browser.')
    }
  }

  const translateText = async (text) => {
    if (!text) return

    const translations = {
      'Hello': { es: 'Hola', fr: 'Bonjour', de: 'Hallo', zh: '你好', ja: 'こんにちは' },
      'Thank you': { es: 'Gracias', fr: 'Merci', de: 'Danke', zh: '谢谢', ja: 'ありがとう' },
      'Please': { es: 'Por favor', fr: 'S\'il vous plaît', de: 'Bitte', zh: '请', ja: 'お願いします' },
      'Yes': { es: 'Sí', fr: 'Oui', de: 'Ja', zh: '是的', ja: 'はい' },
      'No': { es: 'No', fr: 'Non', de: 'Nein', zh: '不', ja: 'いいえ' }
    }

    const translated = translations[text]?.[targetLanguage] || text
    setTranslatedText(translated)
    speak(translated)
  }

  useEffect(() => {
    if (!isCameraOn) return
    const interval = setInterval(detectSign, 3000)
    return () => clearInterval(interval)
  }, [isCameraOn])

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-blue-600 mb-10">Sign Language Translator</h1>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Camera Feed */}
          <div className="bg-white shadow-lg rounded-2xl p-6 border border-gray-200">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Camera Feed</h2>
            <video
              ref={videoRef}
              autoPlay
              muted
              className="w-full h-80 bg-gray-100 rounded-lg border border-gray-300 object-cover"
            />
            <div className="mt-6 flex flex-wrap gap-4">
              {!isCameraOn ? (
                <button
                  onClick={startCamera}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
                >
                  Start Camera
                </button>
              ) : (
                <>
                  <button
                    onClick={stopCamera}
                    className="px-6 py-3 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition"
                  >
                    Stop Camera
                  </button>
                  <button
                    onClick={detectSign}
                    disabled={isProcessing}
                    className="px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 disabled:opacity-50 transition"
                  >
                    {isProcessing ? 'Processing...' : 'Detect Sign'}
                  </button>
                </>
              )}
            </div>
            {isCameraOn && (
              <p className="mt-4 text-sm text-gray-500 text-center">
                {isProcessing ? '⏳ Processing...' : '✓ Auto-detection active'}
              </p>
            )}
          </div>

          {/* Translation Results */}
          <div className="bg-white shadow-lg rounded-2xl p-6 border border-gray-200">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Translation Results</h2>

            <div className="space-y-6">
              <div>
                <label className="block text-lg font-medium text-gray-700 mb-1">Detected Sign:</label>
                <p className="text-xl font-semibold text-gray-800 min-h-8">
                  {detectedSign || 'Waiting for detection...'}
                </p>
              </div>

              <div>
                <label className="block text-lg font-medium text-gray-700 mb-1">Translate to:</label>
                <select
                  value={targetLanguage}
                  onChange={(e) => setTargetLanguage(e.target.value)}
                  className="w-full border-2 border-gray-300 p-3 rounded-lg focus:border-blue-500 focus:outline-none text-blue-600 text-lg"
                >
                  {languages.map((lang) => (
                    <option key={lang.code} value={lang.code}>
                      {lang.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-lg font-medium text-gray-700 mb-1">Translation:</label>
                <p className="text-xl font-semibold text-blue-600 min-h-8">
                  {translatedText || 'Translation will appear here...'}
                </p>
              </div>

              {translatedText && (
                <button
                  onClick={() => speak(translatedText)}
                  className="px-5 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition"
                >
                  🔊 Speak Again
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="mt-16 text-center text-gray-600 text-lg">
          Start camera → Make a sign → Wait for detection → Get translation with audio
        </div>
      </div>
    </div>
  )
}
