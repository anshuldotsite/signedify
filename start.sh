#!/bin/bash

# Start Sign Language Detection Application
echo "🚀 Starting Sign Language Detection Application..."

# Function to cleanup background processes
cleanup() {
    echo "🛑 Shutting down servers..."
    kill $FRONTEND_PID $BACKEND_PID 2>/dev/null
    exit 0
}

# Set up signal handlers
trap cleanup SIGINT SIGTERM

# Start Flask backend
echo "📡 Starting Flask backend..."
cd backend
python app.py &
BACKEND_PID=$!
cd ..

# Wait a moment for backend to start
sleep 3

# Start Next.js frontend
echo "🌐 Starting Next.js frontend..."
npm run dev &
FRONTEND_PID=$!

echo "✅ Both servers are starting..."
echo "📱 Frontend: http://localhost:3000"
echo "🔧 Backend: http://localhost:5000"
echo "📖 Demo page: http://localhost:3000/component/demo"
echo ""
echo "Press Ctrl+C to stop both servers"

# Wait for both processes
wait 