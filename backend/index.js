require("dotenv").config();
const express = require("express");
const { Pool } = require("pg");

const app = express();

const pool = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
});


app.get("/", (req, res) => {
    res.send("Backend works!");
});

app.get("/health", (req, res) => {
    res.json({
        status: "ok",
        uptime: process.uptime()
    });
});

app.get("/users", async (req, res) => {
    try {
        const result = await pool.query(
            "SELECT * FROM users"
        );

        res.json(result.rows);

    } catch (error) {
        console.error(error);
        res.status(500).send("Database error");
    }
});

module.exports = app;
