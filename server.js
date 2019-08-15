const express = require('express')
const server = express()
const path = require('path')

const buildPath = path.resolve(__dirname, 'build')

server.use(express.static(buildPath))

const port = process.env.PORT || 3000

server.listen(port, () => {
    console.log("Server started!")
    if (process.env.NODE_ENV !== 'production')
    console.log(`Port: ${port}`)
})