# Signify - Real-Time Sign Language Detection & Translation

A comprehensive web application that uses computer vision and machine learning to detect sign language gestures in real-time and translate them into multiple languages.

## 🌟 Features

- **Real-time Camera Detection**: Live webcam feed for sign language input
- **YOLO-based Detection**: Advanced object detection using YOLO model
- **Multi-language Translation**: Translate detected signs to 10+ languages
- **Modern UI**: Clean, responsive interface with white background and blue text
- **Real-time Processing**: Automatic detection every 2 seconds
- **Cross-platform**: Works on desktop and mobile browsers

## 🏗️ Architecture

- **Frontend**: Next.js 15 with React 19 and Tailwind CSS
- **Backend**: Flask with Python
- **AI Model**: YOLO (You Only Look Once) for sign language detection
- **Translation**: Configurable translation API support

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm
- Python 3.8+
- Your trained YOLO model for sign language detection

### Installation

1. **Clone and install frontend dependencies:**

   ```bash
   npm install
   ```

2. **Set up the backend:**

   ```bash
   cd backend
   pip install -r requirements.txt
   ```

3. **Configure your YOLO model:**

   - Edit `backend/app.py`
   - Replace `'path/to/your/sign_language_model.pt'` with your actual model path

4. **Start the application:**

   ```bash
   ./start.sh
   ```

   Or start manually:

   ```bash
   # Terminal 1 - Backend
   cd backend && python app.py

   # Terminal 2 - Frontend
   npm run dev
   ```

5. **Access the application:**
   - Frontend: http://localhost:3000
   - Demo page: http://localhost:3000/component/demo
   - Backend API: http://localhost:5000

## 📱 How to Use

1. **Open the demo page** at http://localhost:3000/component/demo
2. **Click "Start Camera"** to enable your webcam
3. **Position yourself** in front of the camera
4. **Perform sign language gestures** - the system detects automatically every 2 seconds
5. **Select target language** from the dropdown menu
6. **View real-time translations** in the results panel

## 🔧 Configuration

### YOLO Model Setup

Your YOLO model should be trained to detect sign language gestures. The model should:

- Be saved in `.pt` format
- Have classes corresponding to different signs
- Return confidence scores for detections

Example model classes:

```
0: hello
1: thank_you
2: goodbye
3: yes
4: no
5: please
6: sorry
7: help
8: water
9: food
```

### Translation API

The backend includes a demo translation function. For production use:

1. **Google Translate API:**

   ```bash
   pip install googletrans==4.0.0rc1
   ```

2. **Azure Translator:**

   - Get API key from Azure Portal
   - Set environment variable: `TRANSLATION_API_KEY=your_key`

3. **Custom API:**
   - Modify the `translate_text()` function in `backend/app.py`

## 📁 Project Structure

```
signedify/
├── app/
│   └── component/
│       └── demo/
│           └── page.js          # Main demo UI
├── backend/
│   ├── app.py                   # Flask backend
│   ├── requirements.txt         # Python dependencies
│   └── README.md               # Backend documentation
├── start.sh                    # Startup script
└── README.md                   # This file
```

## 🔌 API Endpoints

### Backend API (http://localhost:5000)

- `GET /health` - Health check
- `POST /detect` - Sign language detection
- `POST /translate` - Text translation

### Frontend Routes

- `/` - Home page
- `/component/demo` - Sign language detection demo
- `/about` - About page
- `/contact` - Contact page

## 🛠️ Development

### Frontend Development

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

### Backend Development

```bash
cd backend
python app.py        # Start Flask server
```

### Environment Variables

Create a `.env` file in the backend directory:

```env
TRANSLATION_API_KEY=your_api_key_here
MODEL_PATH=path/to/your/model.pt
FLASK_ENV=development
```

## 🐛 Troubleshooting

### Common Issues

1. **Camera not working:**

   - Check browser permissions
   - Ensure HTTPS in production (required for camera access)

2. **Model not loading:**

   - Verify model file path in `backend/app.py`
   - Check model file format (.pt)

3. **CORS errors:**

   - Backend includes CORS headers
   - Ensure frontend is making requests to correct URL

4. **Translation not working:**
   - Check API key configuration
   - Verify internet connection for external APIs

### Performance Tips

- Use GPU acceleration for YOLO model if available
- Optimize image resolution for faster processing
- Consider model quantization for mobile deployment

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- YOLO model for object detection
- Flask for backend framework
- Next.js for frontend framework
- Tailwind CSS for styling

---

**Note**: This application requires a trained YOLO model for sign language detection. Make sure to replace the placeholder model path with your actual trained model before running the application.
