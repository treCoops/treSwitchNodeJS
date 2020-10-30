const PORT = process.env.PORT || 3000;
const { Console } = require('console');
let express = require('express');
let app = express();
let http = require('http');
let server = http.Server(app);


app.get('/', (req, res)=> {
    res.send('<h1>Hello World!!</h1>');
});


server.listen(PORT, () => {
    console.log("Listening to port: "+PORT);
});

let io = require('socket.io')(server);

io.on('connect', (socket)=> {
    console.log("User Connected.!");

    socket.on('message', (data) => {
        console.log(data);
        let val = {switch1: data}
        io.emit('message', val);
    });
});