const notes = require("../data/notes");

function setAPIRoutes (app) {
    app.get("/api/notes", (req,res)=>{
        res.json(notes);
    });

    app.post("/api/notes", (req,res) =>{
        res.json(notes);
    });
}

module.exports = setAPIRoutes;