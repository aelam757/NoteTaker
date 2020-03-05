const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();

const PORT = process.env.PORT || 3080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get

app.listen(PORT, () => {
    console.log(`app listening on port ${PORT}`);
})