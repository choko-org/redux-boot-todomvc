import path from 'path'
import express from 'express'

const app = new (express)()
const port = 3000

app.use('/static', express.static('dist'));

app.get("/", (req, res) => {
  res.sendFile(path.resolve('./index.html'))
})

app.listen(port, error => {
  if (error) {
    console.error(error)
  } else {
    console.info("==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port)
  }
})
