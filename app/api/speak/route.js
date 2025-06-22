// import { NextResponse } from 'next/server'

// export async function POST(request) {
//   try {
//     const { text } = await request.json()
    
//     if (!text) {
//       return NextResponse.json({ error: 'Text is required' }, { status: 400 })
//     }

//     // ElevenLabs API configuration
//     const ELEVENLABS_API_KEY = process.env.ELEVENLABS_API_KEY
//     const VOICE_ID = process.env.DRAKE_VOICE_ID || 'pNInz6obpgDQGcFmaJgB' // Default Drake-like voice ID
    
//     console.log('ElevenLabs API Key exists:', !!ELEVENLABS_API_KEY)
//     console.log('Voice ID:', VOICE_ID)
//     console.log('Text to convert:', text)
    
//     if (!ELEVENLABS_API_KEY) {
//       console.error('ElevenLabs API key not found in environment variables')
//       return NextResponse.json({ 
//         error: 'ElevenLabs API key not configured. Please add ELEVENLABS_API_KEY to your .env.local file' 
//       }, { status: 500 })
//     }

//     // Call ElevenLabs API
//     const apiUrl = `https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`
//     console.log('Calling ElevenLabs API:', apiUrl)
    
//     const response = await fetch(apiUrl, {
//       method: 'POST',
//       headers: {
//         'Accept': 'audio/mpeg',
//         'Content-Type': 'application/json',
//         'xi-api-key': ELEVENLABS_API_KEY,
//       },
//       body: JSON.stringify({
//         text: text,
//         model_id: 'eleven_monolingual_v1',
//         voice_settings: {
//           stability: 0.5,
//           similarity_boost: 0.75,
//           style: 0.0,
//           use_speaker_boost: true
//         }
//       })
//     })

//     console.log('ElevenLabs API response status:', response.status)
//     console.log('ElevenLabs API response headers:', Object.fromEntries(response.headers.entries()))

//     if (!response.ok) {
//       const errorData = await response.text()
//       console.error('ElevenLabs API error response:', errorData)
      
//       let errorMessage = 'Failed to generate speech'
//       try {
//         const errorJson = JSON.parse(errorData)
//         errorMessage = errorJson.detail?.message || errorJson.message || errorMessage
//       } catch (e) {
//         // If error data is not JSON, use the raw text
//         errorMessage = errorData || errorMessage
//       }
      
//       return NextResponse.json({ 
//         error: errorMessage,
//         status: response.status,
//         details: errorData
//       }, { status: response.status })
//     }

//     // Get the audio data
//     const audioBuffer = await response.arrayBuffer()
//     console.log('Audio buffer size:', audioBuffer.byteLength, 'bytes')
    
//     // Return the audio as a blob
//     return new NextResponse(audioBuffer, {
//       headers: {
//         'Content-Type': 'audio/mpeg',
//         'Cache-Control': 'no-cache',
//       },
//     })

//   } catch (error) {
//     console.error('Error in speak API:', error)
//     return NextResponse.json({ 
//       error: 'Internal server error: ' + error.message 
//     }, { status: 500 })
//   }
// } 