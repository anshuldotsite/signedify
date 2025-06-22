// Test script for ElevenLabs API
// Run this with: node test-elevenlabs.js

const fs = require('fs');
const path = require('path');

// Load environment variables
require('dotenv').config({ path: '.env.local' });

const ELEVENLABS_API_KEY = process.env.ELEVENLABS_API_KEY;
const VOICE_ID = process.env.DRAKE_VOICE_ID || 'pNInz6obpgDQGcFmaJgB';

console.log('🔍 ElevenLabs API Test');
console.log('=====================');
console.log('API Key exists:', !!ELEVENLABS_API_KEY);
console.log('Voice ID:', VOICE_ID);
console.log('');

if (!ELEVENLABS_API_KEY) {
  console.log('❌ ERROR: ELEVENLABS_API_KEY not found in .env.local');
  console.log('');
  console.log('Please create a .env.local file with:');
  console.log('ELEVENLABS_API_KEY=your_api_key_here');
  console.log('');
  console.log('Get your API key from: https://elevenlabs.io');
  process.exit(1);
}

async function testElevenLabs() {
  try {
    console.log('🚀 Testing ElevenLabs API...');
    
    const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`, {
      method: 'POST',
      headers: {
        'Accept': 'audio/mpeg',
        'Content-Type': 'application/json',
        'xi-api-key': ELEVENLABS_API_KEY,
      },
      body: JSON.stringify({
        text: 'Hello, this is a test of the ElevenLabs API.',
        model_id: 'eleven_monolingual_v1',
        voice_settings: {
          stability: 0.5,
          similarity_boost: 0.75,
          style: 0.0,
          use_speaker_boost: true
        }
      })
    });

    console.log('Response status:', response.status);
    console.log('Response headers:', Object.fromEntries(response.headers.entries()));

    if (!response.ok) {
      const errorText = await response.text();
      console.log('❌ API Error:', errorText);
      
      try {
        const errorJson = JSON.parse(errorText);
        console.log('Error details:', errorJson);
      } catch (e) {
        console.log('Raw error response:', errorText);
      }
      
      return false;
    }

    const audioBuffer = await response.arrayBuffer();
    console.log('✅ Success! Audio generated:', audioBuffer.byteLength, 'bytes');
    
    // Save test audio file
    const testFile = 'test-audio.mp3';
    fs.writeFileSync(testFile, Buffer.from(audioBuffer));
    console.log('✅ Test audio saved as:', testFile);
    
    return true;
    
  } catch (error) {
    console.log('❌ Network error:', error.message);
    return false;
  }
}

// Run the test
testElevenLabs().then(success => {
  if (success) {
    console.log('');
    console.log('🎉 ElevenLabs API is working correctly!');
    console.log('You can now use Drake voice in your app.');
  } else {
    console.log('');
    console.log('❌ ElevenLabs API test failed.');
    console.log('Please check your API key and try again.');
  }
}); 