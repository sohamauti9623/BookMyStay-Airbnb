const mongoose = require("mongoose");
require("dns").setDefaultResultOrder("ipv4first");
// ================= ENV =================
require("dotenv").config();


mongoose.connect(process.env.ATLASDB_URL)
.then(()=> console.log("Connected"))
.catch(err => console.log(err));