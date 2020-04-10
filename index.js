const PORT = process.env.PORT || 5000;
const express = require('express');
const http = require('http');
const path = require('path');
const socketIO = require('socket.io');
const opencv = require('opencv4nodejs');

const app = express();
const server = http.Server(app);
const io = socketIO(server);

const FPS = 10;
const wCap = new opencv.VideoCapture(0);
wCap.set(opencv.CAP_PROP_FRAME_WIDTH, 300); 
wCap.set(opencv.CAP_PROP_FRAME_HEIGHT, 300); 

// route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

setInterval(() => {
    const frame = wCap.read();
    const image = opencv.imencode('.jpg', frame).toString('base64');
    io.emit('image', image );
}, 1000/FPS);

// jalankan server
server.listen(PORT, function() {
    console.log(`Server listening to port ${PORT}`);
});