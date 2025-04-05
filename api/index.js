// const fs  = require('fs');
// const http = require('http');
// const url = require('url');

// const server = http.createServer((req, res) => {

//     const pathName = req.url;

//     if(pathName === '/dashboard') {
//         res.end('This is dashboard');
//     } else if(pathName === '/users') {

//         fs.readFile(`./data/users.json`, 'utf-8', (err, data) => {
//             const usersData = data;
//             res.writeHead(200, { 'Content-type': 'application/json', 'Access-Control-Allow-Origin': "*" });
//             // res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
//             // res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");});
//             res.end(usersData);
//         })

//     } else {
//         res.end('This is normal pages.');
//     }
// })

// server.listen('3001', '127.0.0.1', () => {
//     console.log('Listening from server!');
// })

const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");

const { routerUsers } = require('./routes/users');
const { routerFee } = require('./routes/fee');
const path = require("path");

const MONGO_URI = "mongodb://127.0.0.1:27017/my-academy";

// ✅ Fix: Set a proper connection timeout
mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000, // ⏳ Wait 5 sec before failing
    connectTimeoutMS: 10000, // ⏳ Timeout after 10 sec
  })
  .then(() => {
    console.log("✅ MongoDB Connected");
  })
  .catch((err) => {
    console.error("❌ MongoDB Connection Error:", err);
  });

app.use(
  cors({
    origin: "http://localhost:3000", // React frontend URL
    credentials: true, // Allow cookies
  }),
);

const port = 3001;

app.use(express.json());
app.use(cookieParser());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/user", routerUsers);
app.use("/api/fee", routerFee);

app.listen(port, () => {
  console.log("Listening on 3001");
});
