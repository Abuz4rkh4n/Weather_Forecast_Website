const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use("/public", express.static("public"));
app.use("/images", express.static("images"));
app.set("viewengine", "ejs");

app.get("/login", (req, res) => {
  res.sendFile(__dirname + "/login.html");
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/login", (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  if (email) {
    db.query(
      "SELECT email FROM users WHERE email = ?",
      [email],
      async (err, result) => {
        if (err) throw err;
        if (result[0]) {
          return res.json({
            error: "Email has already been Registered",
          });
        } else {
          const sql =
            "INSERT INTO users (username, email, password) VALUES ('" +
            name +
            "', '" +
            email +
            "','" +
            password +
            "')";
          db.query(sql, (err, result) => {
            if (err) {
              console.error("Error inserting data:", err);
            } else {
              console.log("Data inserted successfully!");
            }
          });
        }
      }
    );
  }
});

app.listen(port);
