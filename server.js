const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.json());

app.get("/", (req, res) =>{
    res.sendFile(path.join(__dirname, "public/index.html")
    );
});
app.get("/notes", (req,res) =>{
    res.sendFile(path.join(__dirname, "public/notes.html"));
});

app.get("/data/notes", (req,res) => {
    fs.readFile(path.join(__dirname, "/db.json"), "utf8", (error,data) =>{
        if (error) throw(error);
        res.json(JSON.parse(data));
    });
});

app.post("/api/notes", (req, res) => {
    fs.readFile(path.join(__dirname, "/db.json"), "utf8", (error, data) =>{
        if(error) throw(error);
        const db = JSON.parse(data);
        const newDb = [];

        db.push(req.body);

        for(let i = 0; i < db.length; i++)
        {
            const newNote = {
                title: db[i].title,
                text: db[i].text,
                id: i
            };

            newDb.push(newNote);
        }

        fs.writeFile(path.join(__dirname, "/db.json"), JSON.stringify(newDB, null,2), (error) =>{
            if(error) throw error;
            res.json(req.body);    
        });
    });
});
app.delete("/api/notes/:id", (req, res) => {
    const id = parseInt(req.params.id);
    fs.readFile(path.join(__dirname, "/db.json"), "utf8", (err, data) => {
        if (err) throw err;
        const db = JSON.parse(data);
        const newDB = [];

        for(let i = 0; i < db.length; i++)
        {
            if (i !== id)
            {
                const newNote = {
                    title: db[i].title,
                    text: db[i].text,
                    id: newDB.length
                };

                newDB.push(newNote);
            }
        }

        fs.writeFile(path.join(__dirname, "/db.json"), JSON.stringify(newDB, null, 2), (err) => {
            if (err) throw err;
            res.json(req.body);
        });
    });
});


app.listen(PORT, () => {
    console.log(`app listening on port ${PORT}`);
});