const express = require("express")

const server = express()

server.all("/", (req, res) => {
    res.send("<button> MEINBUTTON </button>Bot is running!")
})

function keepAlive() {
    server.listen(3000, () => {
        console.log("HTTP Server is ready.")
    })
}

module.exports = keepAlive