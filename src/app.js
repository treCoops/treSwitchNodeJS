const PORT = process.env.PORT || 5000;
let express = require('express');
let app = express();
let http = require('http');
let server = http.Server(app);
const mongoose = require('mongoose');
const Switch = require('../model/Switch');

const uri = "mongodb+srv://treCoops:Brand1995@treswitch.lltrm.mongodb.net/treSwitch?retryWrites=true&w=majority";
mongoose.connect(uri, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("MongoDB Connected…");
}).catch(err => console.log(err))


app.get('/', async (req, res)=> {

    res.send('<h1>Hello World!!</h1>');
});

app.get('/getSwitchStatus', async (req, res) => {
    console.log(req);
    try{
        let swt = await Switch.find({name: "Switch1"});
        console.log(swt);
        res.status(200).send(swt);

    }catch(e){
        res.status(500).send(e.message);
    }
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

        console.log(data)
        try{
            let swt = await Switch.find({name: "Switch1"});
            console.log(swt);
            io.emit('init', "swt");
        }catch(e){
            res.status(500).send(e.message);
        }
    });
});