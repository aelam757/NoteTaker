const express = require("express");
const path = require("path");

const app = express();

const PORT = process.env.PORT || 3080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));


app.listen(PORT, () => {
    console.log(`app listening on port ${PORT}`);
});