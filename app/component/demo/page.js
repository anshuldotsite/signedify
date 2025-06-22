'use client'

import { useState, useRef, useEffect } from 'react'

export default function Demo() {
  const [isCameraOn, setIsCameraOn] = useState(false)
  const [detectedSign, setDetectedSign] = useState('')
  const [translatedText, setTranslatedText] = useState('')
  const [targetLanguage, setTargetLanguage] = useState('es') // Spanish as default
  const [isProcessing, setIsProcessing] = useState(false)
  const videoRef = useRef(null)
  const canvasRef = useRef(null)
  const streamRef = useRef(null)

  const languages = [
    { code: 'es', name: 'Spanish' },
    { code: 'fr', name: 'French' },
    { code: 'de', name: 'German' },
    { code: 'it', name: 'Italian' },
    { code: 'pt', name: 'Portuguese' },
    { code: 'ja', name: 'Japanese' },
    { code: 'ko', name: 'Korean' },
    { code: 'zh', name: 'Chinese' },
    { code: 'ar', name: 'Arabic' },
    { code: 'hi', name: 'Hindi' }
  ]

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          width: 640, 
          height: 480,
          facingMode: 'user'
        } 
      })
      streamRef.current = stream
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        setIsCameraOn(true)
      }
    } catch (error) {
      console.error('Error accessing camera:', error)
      alert('Unable to access camera. Please check permissions.')
    }
  }

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop())
      streamRef.current = null
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null
    }
    setIsCameraOn(false)
    setDetectedSign('')
    setTranslatedText('')
  }

  const captureFrame = () => {
    if (!videoRef.current || !canvasRef.current) return null
    
    const video = videoRef.current
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')
    
    canvas.width = video.videoWidth
    canvas.height = video.videoHeight
    context.drawImage(video, 0, 0)
    
    return canvas.toDataURL('image/jpeg', 0.8)
  }

  const detectSignLanguage = async () => {
    if (!isCameraOn) return
    
    setIsProcessing(true)
    const imageData = captureFrame()
    
    if (!imageData) {
      setIsProcessing(false)
      return
    }

    try {
      // Send to Flask backend for YOLO detection
      const response = await fetch('http://localhost:5000/detect', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ image: imageData })
      })

      if (response.ok) {
        const result = await response.json()
        setDetectedSign(result.detected_sign || 'No sign detected')
        
        // If we have a detected sign, translate it
        if (result.detected_sign) {
          await translateText(result.detected_sign)
        }
      }
    } catch (error) {
      console.error('Error detecting sign language:', error)
      setDetectedSign('Error detecting sign')
    } finally {
      setIsProcessing(false)
    }
  }

  const translateText = async (text) => {
    if (!text || text === 'No sign detected' || text === 'Error detecting sign') return
    
    try {
      const response = await fetch('http://localhost:5000/translate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          text: text, 
          target_language: targetLanguage 
        })
      })

      if (response.ok) {
        const result = await response.json()
        setTranslatedText(result.translated_text)
      }
    } catch (error) {
      console.error('Error translating text:', error)
      setTranslatedText('Translation error')
    }
  }

  // Auto-detect every 2 seconds when camera is on
  useEffect(() => {
    let interval
    if (isCameraOn) {
      interval = setInterval(detectSignLanguage, 2000)
    }
    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isCameraOn])

  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-blue-600 mb-8 text-center">
          Sign Language Translator
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Camera Section */}
          <div className="bg-blue-50 rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-blue-700 mb-4">
              Camera Feed
            </h2>
            
            <div className="relative">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-96 bg-gray-200 rounded-lg object-cover"
              />
              <canvas
                ref={canvasRef}
                className="hidden"
              />
              
              {!isCameraOn && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-200 rounded-lg">
                  <div className="text-center">
                    <div className="text-6xl text-gray-400 mb-4">📷</div>
                    <p className="text-gray-600">Camera not active</p>
                  </div>
                </div>
              )}
            </div>
            
            <div className="mt-4 flex gap-4">
              {!isCameraOn ? (
                <button
                  onClick={startCamera}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Start Camera
                </button>
              ) : (
                <button
                  onClick={stopCamera}
                  className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors"
                >
                  Stop Camera
                </button>
              )}
              
              {isCameraOn && (
                <button
                  onClick={detectSignLanguage}
                  disabled={isProcessing}
                  className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
                >
                  {isProcessing ? 'Processing...' : 'Detect Now'}
                </button>
              )}
            </div>
          </div>

          {/* Results Section */}
          <div className="bg-blue-50 rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-blue-700 mb-4">
              Translation Results
            </h2>
            
            <div className="space-y-6">
              {/* Detected Sign */}
              <div>
                <label className="block text-sm font-medium text-blue-600 mb-2">
                  Detected Sign Language:
                </label>
                <div className="bg-white p-4 rounded-lg border-2 border-blue-200 min-h-16">
                  {detectedSign ? (
                    <p className="text-lg text-blue-800 font-medium">{detectedSign}</p>
                  ) : (
                    <p className="text-gray-500 italic">No sign detected yet...</p>
                  )}
                </div>
              </div>

              {/* Language Selection */}
              <div>
                <label className="block text-sm font-medium text-blue-600 mb-2">
                  Translate to:
                </label>
                <select
                  value={targetLanguage}
                  onChange={(e) => setTargetLanguage(e.target.value)}
                  className="w-full p-3 border-2 border-blue-200 rounded-lg bg-white text-blue-800 focus:border-blue-400 focus:outline-none"
                >
                  {languages.map((lang) => (
                    <option key={lang.code} value={lang.code}>
                      {lang.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Translated Text */}
              <div>
                <label className="block text-sm font-medium text-blue-600 mb-2">
                  Translation:
                </label>
                <div className="bg-white p-4 rounded-lg border-2 border-blue-200 min-h-16">
                  {translatedText ? (
                    <p className="text-lg text-blue-800 font-medium">{translatedText}</p>
                  ) : (
                    <p className="text-gray-500 italic">Translation will appear here...</p>
                  )}
                </div>
              </div>

              {/* Status */}
              <div className="text-center">
                {isProcessing && (
                  <div className="inline-flex items-center text-blue-600">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2"></div>
                    Processing...
                  </div>
                )}
                {isCameraOn && !isProcessing && (
                  <p className="text-green-600 text-sm">
                    ✓ Real-time detection active
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-8 bg-blue-50 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-blue-700 mb-3">
            How to Use:
          </h3>
          <ol className="list-decimal list-inside space-y-2 text-blue-800">
            <li>Click "Start Camera" to enable your webcam</li>
            <li>Position yourself in front of the camera</li>
            <li>Perform sign language gestures</li>
            <li>The system will automatically detect signs every 2 seconds</li>
            <li>Select your desired target language for translation</li>
            <li>View the real-time translation results</li>
          </ol>
        </div>
      </div>
    </div>
  )
}
