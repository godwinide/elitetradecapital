const express = require("express");
const cors = require("cors");
const app = express();
const flash = require('connect-flash');
const session = require('express-session');
const passport = require("passport")
const expressLayout = require("express-ejs-layouts");
const fileUpload = require("express-fileupload");
const Site = require("./model/Site");

// CONFIGS
require("dotenv").config();
// Simple polyfill for Headers if not available (Node < 18)
if (!globalThis.Headers) {
  globalThis.Headers = class Headers {
    constructor(init = {}) {
      this._headers = new Map();
      if (init) {
        if (typeof init === 'object') {
          for (const [key, value] of Object.entries(init)) {
            this.set(key, value);
          }
        }
      }
    }
    set(name, value) { this._headers.set(name.toLowerCase(), String(value)); }
    get(name) { return this._headers.get(name.toLowerCase()) || null; }
    has(name) { return this._headers.has(name.toLowerCase()); }
    delete(name) { this._headers.delete(name.toLowerCase()); }
    entries() { return this._headers.entries(); }
    keys() { return this._headers.keys(); }
    values() { return this._headers.values(); }
  };
}
require("./config/db")();
require('./config/passport')(passport);
// MIDDLEWARES
app.use(cors());
app.use(express.static('./public'))
app.use(expressLayout);
app.set("view engine", "ejs");
app.use(express.urlencoded({
  extended: true
}));
app.use(express.json());
app.use(fileUpload({}))
app.use(flash());
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
);
// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Global variables
app.use(async function (req, res, next) {
  res.locals.siteName = "Elite Trade Capital";
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

const PORT = process.env.PORT || 2022;

// URLS
// app.use("*", require("./routes/down"))
app.use("/", require("./routes/index"));
app.use("/", require("./routes/auth"));
app.use("/", require("./routes/user"));
app.use("/admin", require("./routes/admin/index"));
app.use("/admin", require("./routes/admin/auth"));
app.use("*", (req, res) => {
  try {
    return res.redirect("/")
  } catch (err) {
    return res.redirect("/");
  }
});

app.listen(PORT, () => console.log(`server started on port ${PORT}`));