const express = require("express");
const mysql = require("mysql");
const BodyParser = require("body-parser");
const { request } = require("express");

const app = express();
app.use(BodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", "views");

const db = mysql.createConnection({
  host: "localhost",
  database: "crudd",
  user: "root",
  password: "",
});
db.connect((err) => {
  if (err) throw err;
  console.log("database connected");

  // get data
  app.get("/", (req, res) => {
    const sql = "SELECT * FROM users";
    db.query(sql, (err, result) => {
      const users = JSON.parse(JSON.stringify(result));
      res.render("index", { users: users, title: "Aplikasi data kendaraan" });
    });

    // insert data
    app.post("/tambah", (req, res) => {
      const insertSql = `INSERT INTO users (no,nama,merk,tahun,kapasitas,warna,bahanbakar) VALUES('${req.body.no}','${req.body.nama}','${req.body.merk}','${req.body.tahun}','${req.body.cc}','${req.body.warna}','${req.body.bakar}')`;
      console.log(insertSql);
      db.query(insertSql, (err) => {
        if (err) throw err;
        res.redirect("/");
      });
    });

    // delete data
    // app.delete('', (req, res) => {
    //   const delSql = `DELETE FROM users WHERE user(id)`;
    //   console.log(delSql);
    //   db.query(delSql, (err) => {
    //     if (err) throw err;
    //     res.delete("/");
    // });
  });
});

app.listen(8000, () => {
  console.log("server ready...");
});
