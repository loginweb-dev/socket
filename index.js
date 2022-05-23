const express = require('express')
const cors = require('cors')
require('dotenv').config()
const axios = require('axios').default;
const app = express()
app.use(cors())

const http = require('http')
const server = http.createServer(app)

const {Server} = require('socket.io')
const io = new Server(server, {
	origin: '*'
})

io.on('connection', (socket) => {
	//CANALES DEFAULT
	socket.on('ventas', (msg) =>{
		io.emit('ventas', msg)
	})
	socket.on('cocina', (msg) =>{
		io.emit('cocina', msg)
	})

	//CANALES PIOLIN
	socket.on('piolin_ventas', (msg) =>{
		io.emit('piolin_ventas', msg)
	})

	//CANALES TATUPIZZERIA
	socket.on('tatu_ventas', (msg) =>{
		io.emit('tatu_ventas', msg)
	})
	socket.on('tatu_cocina', (msg) =>{
		io.emit('tatu_cocina', msg)
	})
	socket.on('tatu_monitor', (msg) =>{
		io.emit('tatu_monitor', msg)
	})

	//CANALES GREENERGY
	socket.on('greenergy_ventas', (msg) =>{
		io.emit('greenergy_ventas', msg)
	})
	socket.on('greenergy_cocina', (msg) =>{
		io.emit('greenergy_cocina', msg)
	})

	//TELEMEDICIANA
	socket.on('nueva_consulta', (msg) =>{
		io.emit('nueva_consulta', msg)
	})

	//APPXI------------------------------------------------------------------
	socket.on('nuevo_viaje', async (msg) =>{
		await axios.get('https://appxi.net/api/notificacione/save/'+msg)
		io.emit('nuevo_viaje', msg)
	})
	socket.on('nuevo_chofer', async (msg) =>{
		await axios.get('https://appxi.net/api/notificacione/save/'+msg)
		io.emit('nuevo_chofer', msg)
	})
	socket.on('nuevo_cliente', async (msg) =>{
		await axios.get('https://appxi.net/api/notificacione/save/'+msg)
		io.emit('nuevo_cliente', msg)
	})
	socket.on('traking', (obj) =>{
		io.emit('traking', obj)
	})
	socket.on('controferta', (obj) =>{
		io.emit('controferta', obj)
	})
	socket.on('viaje_aprobado', (obj) =>{
		io.emit('viaje_aprobado', obj)
	})
	socket.on('limpiar_localstorage', (obj) =>{
		io.emit('limpiar_localstorage', obj)
	})
	socket.on('final_viaje', (obj) =>{
		io.emit('final_viaje', obj)
	})
	

	//streaming
	socket.on('webcam', (image) =>{
		socket.broadcast.emit('webcam', image)
	})
	socket.on('audio', (audio) =>{
		socket.broadcast.emit('audio', audio)
	})
})

app.get('/', (req, res) =>{
	res.send('HOLA SOCKET')
})

server.listen(process.env.PORT, () => {
	console.log('Server is Listening on: '+process.env.PORT)
})