const PORT = process.env.PORT || 5000;
const { Console } = require('console');
let express = require('express');
let app = express();
let http = require('http');
let server = http.Server(app);
const mongoose = require('mongoose');
const Switch = require('../model/Switch');

// const uri = "mongodb+srv://treCoops:Brand1995@treswitch.lltrm.mongodb.net/treSwitch?retryWrites=true&w=majority";
// mongoose.connect(uri, {
//     useCreateIndex: true,
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// }).then(() => {
//     console.log("MongoDB Connected…");
// }).catch(err => console.log(err))


app.get('/', async (req, res)=> {

    // try{
    //     let swt = await Switch.find({name: "Switch1"});
    //     console.log(swt);
    //
    // }catch(e){
    //     res.status(500).send(e.message);
    // }
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

    socket.on('init', async (data) => {
        // try{
            // let swt = await Switch.find({name: "Switch1"});
            // console.log(swt);
            socket.emit('init', "swt");
        // }catch(e){
        //     res.status(500).send(e.message);
        // }
    });
});