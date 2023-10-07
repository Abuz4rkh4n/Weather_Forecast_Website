const express = require("express");
const db = require("./db-confiq");
const bcrypt = require("bcryptjs");
const app = express();
const bodyParser = require("body-parser");
const port = process.env.PORT;

app.use("/public", express.static("public"));
app.use("/images", express.static("images"));
app.use("/Gallery-Images", express.static("Gallery-Images"));
app.use("/Articles", express.static("Articles"));
app.use("/videos", express.static("videos"));
app.use("/script", express.static("script"));
app.use("/admin-panel", express.static("admin-panel"));
app.set("view engine", "ejs");

// Database connection message
db.connect((err) => {
  if (err) throw err;
  console.log("Nimra Database Connected!");
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// sign up

app.get("/signup", (req, res) => {
  res.sendFile(__dirname + "/signup.html");
});

app.get("/home", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.get("/admin", (req, res) => {
  res.sendFile(__dirname + "/admin-panel/main.html");
});

app.post("/signup", (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  const stringEmail = JSON.stringify(req.body.email);
  if (email) {
    db.query(
      "SELECT email FROM users WHERE email = ?",
      [email],
      async (err, result) => {
        if (err) throw err;
        if (result[0]) {
          return res.json({
            status: "The Email has already been registered.",
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
              if (stringEmail.includes(".admin")) {
                res.redirect("/admin");
              } else {
                res.redirect("/home");
              }
              console.log("Data inserted successfully!");
            }
          });
        }
      }
    );
  }
});

// login

app.get("/login", (req, res) => {
  res.sendFile(__dirname + "/login.html");
});

app.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const stringEmail = JSON.stringify(req.body.email);
  if (email) {
    db.query(
      "SELECT email FROM users WHERE email = ?",
      [email],
      async (err, result) => {
        if (err) throw err;
        if (!result[0]) {
          return res.json({
            error: "Incorrect Email",
          });
        } else {
          if (stringEmail.includes(".admin")) {
            res.redirect("/admin");
          } else {
            res.redirect("/home");
          }
        }
      }
    );
  }
});

// Admin Forecast Location

app.get("/location", (req, res) => {
  res.sendFile(__dirname + "/admin-panel/admin-forecast.html");
});

app.post("/location", (req, res) => {
  const city = req.body.city;
  const country = req.body.country;
  const latitude = req.body.latitude;
  const longitude = req.body.longitude;
  const state = req.body.state;
  const seaLevel = req.body.seaLevel;
  const timeZone = req.body.timeZone;
  if (city && country) {
    db.query(
      "INSERT INTO location (city, country, latitude, longitude, state, sea_level, time_zone) values ('" +
        city +
        "','" +
        country +
        "','" +
        latitude +
        "','" +
        longitude +
        "','" +
        state +
        "','" +
        seaLevel +
        "','" +
        timeZone +
        "');",
      (err, result) => {
        if (err) {
          throw err;
        } else {
          res.json({
            status: req.body,
          });
          console.log("Data Inserted.");
        }
      }
    );
  }
});

// Admin Forecast

app.get("/forecast", (req, res) => {
  res.sendFile(__dirname + "/admin-panel/admin-forecast.html");
});

app.post("/forecast", (req, res) => {
  const date = req.body.date;
  const temperature = req.body.temperature;
  const feelsLike = req.body.feelsLike;
  const precipitation = req.body.precipitation;
  const field = req.body.field;
  const uvIndex = req.body.uvIndex;
  const humidity = req.body.humidity;
  const windSpeed = req.body.windSpeed;
  const windDirection = req.body.windDirection;
  const airQuality = req.body.airQuality;
  const locationID = req.body.locationID;
  console.log(req.body);
  if (date && temperature) {
    db.query(
      "INSERT INTO forecast (forecast_date, temperature, feels_like, precipitation, field, uv_index, humidity, wind_speed, wind_direction, air_quality, location_id) values ('" +
        date +
        "','" +
        temperature +
        "','" +
        feelsLike +
        "','" +
        precipitation +
        "','" +
        field +
        "','" +
        uvIndex +
        "','" +
        humidity +
        "','" +
        windSpeed +
        "','" +
        windDirection +
        "','" +
        airQuality +
        "','" +
        locationID +
        "');",
      (err, result) => {
        if (err) {
          throw err;
        } else {
          res.json({
            status: req.body,
          });
          console.log("Data Inserted.");
        }
      }
    );
  }
});

// surfing

app.get("/surfing", (req, res) => {
  res.sendFile(__dirname + "/admin-panel/admin-Surfing.html");
});

app.post("/surfing", (req, res) => {
  const locationID = req.body.locationID;
  const type = req.body.type;
  const name = req.body.name;
  const swellHeights = req.body.swellHeights;
  const swellPeriod = req.body.swellPeriod;
  const waterTemperature = req.body.waterTemperature;
  const surfRating = req.body.surfRating;
  if (type && name) {
    db.query(
      "INSERT INTO surfing (location_id, surfing_type, surfing_name, swell_heights, swell_period, water_temperature, surf_rating) values ('" +
        locationID +
        "','" +
        type +
        "','" +
        name +
        "','" +
        swellHeights +
        "','" +
        swellPeriod +
        "','" +
        waterTemperature +
        "','" +
        surfRating +
        "');",
      (err, result) => {
        if (err) {
          throw err;
        } else {
          res.json({
            status: req.body,
          });
          console.log("Data Inserted.");
        }
      }
    );
  }
});

// Article

app.get("/article", (req, res) => {
  res.sendFile(__dirname + "/admin-panel/admin-article.html");
});

app.post("/article", (req, res) => {
  const articleTitle = req.body.articleTitle;
  const author = req.body.author;
  const publishDate = req.body.publishDate;
  const articleTopic = req.body.articleTopic;
  const userID = req.body.userID;
  const description = req.body.description;
  if (articleTitle && author) {
    db.query(
      "INSERT INTO articles (article_title, author, publish_date, article_topic, user_id, article_description) values ('" +
        articleTitle +
        "','" +
        author +
        "','" +
        publishDate +
        "','" +
        articleTopic +
        "','" +
        userID +
        "','" +
        description +
        "');",
      (err, result) => {
        if (err) {
          throw err;
        } else {
          res.json({
            status: req.body,
          });
          console.log("Data Inserted.");
        }
      }
    );
  }
});

// Data Selection

// User Table

app.get("/users", (req, res) => {
  const sql = "SELECT * from users;";
  db.query(sql, (error, result) => {
    if (error) {
      throw error;
    } else {
      res.render(__dirname + "/users", { users: result });
    }
  });
});

//surfing Table
app.get("/surfingdata", (req, res) => {
  const sql = "SELECT * from surfing;";
  db.query(sql, (error, result) => {
    if (error) {
      throw error;
    } else {
      res.render(__dirname + "/surfingdata", { surfingdata: result });
    }
  });
});

// Forecaset Table

app.get("/forecastdata", (req, res) => {
  const sql = "SELECT * from forecast;";
  db.query(sql, (error, result) => {
    if (error) {
      throw error;
    } else {
      res.render(__dirname + "/forecastdata", { forecastdata: result });
    }
  });
});

// Location Table

app.get("/locationdata", (req, res) => {
  const sql = "SELECT * from location;";
  db.query(sql, (error, result) => {
    if (error) {
      throw error;
    } else {
      res.render(__dirname + "/locationdata", { locationdata: result });
    }
  });
});

// Article Table

app.get("/users", (req, res) => {
  const sql = "SELECT * from users;";
  db.query(sql, (error, result) => {
    if (error) {
      throw error;
    } else {
      res.render(__dirname + "/users", { users: result });
    }
  });
});

// Deletion
//  Deletion from User Table

app.get("/delete-user", (req, res) => {
  const sql = "delete from users where user_id=?;";
  const userID = req.query.user_id;
  db.query(sql, [userID], (error, result) => {
    if (error) {
      throw error;
    } else {
      res.redirect("/users");
    }
  });
});

// Deletion from Surfing

app.get("/delete-surf", (req, res) => {
  const sql = "delete from surfing where surfing_id=?;";
  const surfID = req.query.surfing_id;
  db.query(sql, [surfID], (error, result) => {
    if (error) {
      throw error;
    } else {
      res.redirect("/surfingdata");
    }
  });
});

//forecast Table

app.get("/delete-forecast", (req, res) => {
  const sql = "delete from forecast where forecast_id=?;";
  const forecastID = req.query.forecast_id;
  db.query(sql, [forecastID], (error, result) => {
    if (error) {
      throw error;
    } else {
      res.redirect("/forecastdata");
    }
  });
});

// Location Table

app.get("/delete-location", (req, res) => {
  const sql = "delete from location where location_id=?;";
  const locationID = req.query.location_id;
  db.query(sql, [locationID], (error, result) => {
    if (error) {
      throw error;
    } else {
      res.redirect("/locationdata");
    }
  });
});

// Updation
// Updation From User Table

app.get("/update-user", (req, res) => {
  const sql = "select * from users where user_id=?;";
  const userID = req.query.user_id;
  db.query(sql, [userID], (error, result) => {
    if (error) {
      throw error;
    } else {
      res.render(__dirname + "/update-user", { users: result });
    }
  });
});

app.post("/update-user", (req, res) => {
  const userID = req.body.userID;
  const name = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  const sql =
    "update users set username = '" +
    name +
    "', email = '" +
    email +
    "', password = '" +
    password +
    "' where user_id = '" +
    userID +
    "';";
  db.query(sql, (error, result) => {
    if (error) {
      throw error;
    } else {
      res.redirect("/users");
    }
  });
});

// Updation Surfing Table

app.get("/update-surf", (req, res) => {
  const sql = "select * from surfing where surfing_id=?;";
  const surfingID = req.query.surfing_id;
  db.query(sql, [surfingID], (error, result) => {
    if (error) {
      throw error;
    } else {
      res.render(__dirname + "/update-surf", { surfingdata: result });
    }
  });
});

app.post("/update-surf", (req, res) => {
  const surfingID = req.body.surfingID;
  const locationID = req.body.locationID;
  const type = req.body.type;
  const name = req.body.name;
  const swellHeights = req.body.swellHeights;
  const swellPeriod = req.body.swellPeriod;
  const waterTemperature = req.body.waterTemperature;
  const surfRating = req.body.surfRating;
  const sql =
    "update surfing set location_id = '" +
    locationID +
    "', surfing_type = '" +
    type +
    "', surfing_name = '" +
    name +
    "', swell_heights = '" +
    swellHeights +
    "', swell_period = '" +
    swellPeriod +
    "', water_temperature = '" +
    waterTemperature +
    "', surf_rating = '" +
    surfRating +
    "' where surfing_id = '" +
    surfingID +
    "';";
  db.query(sql, (error, result) => {
    if (error) {
      throw error;
    } else {
      res.redirect("/surfingdata");
    }
  });
});

// Updation forecast Table

app.get("/update-forecast", (req, res) => {
  const sql = "select * from forecast where forecast_id=?;";
  const forecastID = req.query.forecast_id;
  db.query(sql, [forecastID], (error, result) => {
    if (error) {
      throw error;
    } else {
      res.render(__dirname + "/update-forecast", { forecastdata: result });
    }
  });
});

app.post("/update-forecast", (req, res) => {
  const forecastID = req.body.forecastID;
  const date = req.body.forecastDate;
  const temperature = req.body.temperature;
  const feelsLike = req.body.feelsLike;
  const precipitation = req.body.precipitation;
  const field = req.body.field;
  const uvIndex = req.body.uvIndex;
  const humidity = req.body.humidity;
  const windSpeed = req.body.windSpeed;
  const windDirection = req.body.windDirection;
  const airQuality = req.body.airQuality;
  const locationID = req.body.locationID;
  const sql =
    "update forecast set forecast_date = '" +
    date +
    "', temperature = '" +
    temperature +
    "', feels_like = '" +
    feelsLike +
    "', precipitation = '" +
    precipitation +
    "', field = '" +
    field +
    "', uv_index = '" +
    uvIndex +
    "', humidity = '" +
    humidity +
    "' , wind_speed = '" +
    windSpeed +
    "', wind_direction = '" +
    windDirection +
    "', air_quality = '" +
    airQuality +
    "', location_id = '" +
    locationID +
    "'  where forecast_id = '" +
    forecastID +
    "';";
  db.query(sql, (error, result) => {
    if (error) {
      throw error;
    } else {
      res.redirect("/forecastdata");
    }
  });
});

// Update Location

app.get("/update-location", (req, res) => {
  const sql = "select * from location where location_id=?;";
  const locationID = req.query.location_id;
  db.query(sql, [locationID], (error, result) => {
    if (error) {
      throw error;
    } else {
      res.render(__dirname + "/update-location", { locationdata: result });
    }
  });
});

app.post("/update-location", (req, res) => {
  const locationID = req.body.locationID;
  const city = req.body.city;
  const country = req.body.country;
  const latitude = req.body.latitude;
  const longitude = req.body.longitude;
  const state = req.body.state;
  const seaLevel = req.body.seaLevel;
  const timeZone = req.body.timeZone;
  const sql =
    "update location set city = '" +
    city +
    "', country = '" +
    country +
    "', latitude = '" +
    latitude +
    "', longitude = '" +
    longitude +
    "',  state = '" +
    state +
    "', sea_level = '" +
    seaLevel +
    "', time_zone = '" +
    timeZone +
    "' where location_id = '" +
    locationID +
    "';";
  db.query(sql, (error, result) => {
    if (error) {
      throw error;
    } else {
      res.redirect("/locationdata");
    }
  });
});

//Searching

// Searching in User table

app.get("/search-data", (req, res) => {
  const sql = "select * from users;";
  db.query(sql, (error, result) => {
    if (error) {
      throw error;
    } else {
      res.render(__dirname + "/search-data", { users: result });
    }
  });
});

app.get("/search", (req, res) => {
  const userID = req.query.user_id;
  const userName = req.query.username;
  const email = req.query.email;
  console.log(userName, email);
  const sql = "select * from users where user_id =?";
  db.query(sql, [userID], (error, result) => {
    if (error) {
      throw error;
    } else {
      res.render(__dirname + "/search-data", { users: result });
    }
  });
});

// searching surf table

app.get("/search-surf", (req, res) => {
  const sql = "select * from surfing;";
  db.query(sql, (error, result) => {
    if (error) {
      throw error;
    } else {
      res.render(__dirname + "/search-surf", { surfingdata: result });
    }
  });
});

app.post("/searchsurfing", (req, res) => {
  const surfingID = req.body.surfingID;
  const locationID = req.body.locationID;
  const type = req.body.type;
  const name = req.body.name;
  const swellHeights = req.body.swellHeights;
  const swellPeriod = req.body.swellPeriod;
  const waterTemperature = req.body.waterTemperature;
  const surfRating = req.body.surfRating;
  const sql = "select * from surfing where surfing_id =?;";
  db.query(sql, [surfingID], (error, result) => {
    if (error) {
      throw error;
    } else {
      res.render(__dirname + "/search-surf", { surfingdata: result });
    }
  });
});

app.listen(port);
