const express = require('express')
const server = express()
const path = require('path')

server.use(express.static(path.resolve(__dirname, 'build')))

server.listen(process.env.PORT, () => {
    console.log("Server started!")
    if (process.env.NODE_ENV !== 'production')
    console.log(`Port: ${process.env.PORT}`)
})