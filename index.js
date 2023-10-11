const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const db = require("./DB/DBConnection");
const router  = require('./routers/UserRouter'); // Import both router and server

// Use the router
app.use("/", router);

// Port Define
app.listen(port, () => {
  console.log(`listening on ${port}`);
});
