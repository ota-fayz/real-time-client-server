const ws = require("ws")

const wss = new ws.Server({
    port: 8000,
}, () => console.log(`Server started on 8000`))

wss.on("connection", function connection(ws) {
  ws.on("message", function (message) {
      message = JSON.parse(message)
      switch (message.event) {
          case "message":
              broadcastMessage(message)
              break
          case "connection":
              broadcastMessage(message)
              break
      }
  })
})

function broadcastMessage(message) {
    wss.clients.forEach(client => {
        client.send(JSON.stringify(message))
    })
}

// const message = {
//     event: "message/connection",
//     id: 123,
//     date: new Date(),
//     username: "ota-fayz",
//     message: "Ты гей"
// }