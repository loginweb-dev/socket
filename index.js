const express = require('express')
const cors = require('cors')
require('dotenv').config()

const app = express()
// app.use(cors)

const http = require('http')
const server = http.createServer(app)

const {Server} = require('socket.io')
const io = new Server(server)

io.on('connection', (socket) => {
	console.log('client new')
})

app.get('/', (req, res) =>{
	res.send('HOLA SOCKET')
})

server.listen(process.env.PORT, () => {
	console.log('Server is Listening on: '+process.env.PORT)
})