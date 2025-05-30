import cors from "cors"
import cookieParser from "cookie-parser"
import express from "express"
import http from "http"
import mongoose from "mongoose"
import "dotenv/config"

import routes from "./src/routes/index.route.js"

const app = express()

app.use(cors())
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use("/api/v2", routes)

const port = process.env.PORT || 5000

const server = http.createServer(app)

mongoose.connect(process.env.MONGODB_URL).then(() => {
  console.log("Mongodb connected")
  server.listen(port, () => {
    console.log(`Server is listening on port ${port}`)
  })
}).catch((err) => {
  console.log({ err })
  process.exit(1)
})