const router = require("express").Router();
const dataN = require("../data/notes")

router.get("/notes",function(req,res){
    notes.getNotes().then((note)=>
    res.json(note))
    .catch(error => res.status(500).json(error))
});

router.post("/notes",function(req,res){
    notes.addNote(req.body).then((note)=>
    res.json(note))
    .catch(error => res.status(500).json(error))
});

router.delete("/notes",function(req,res){
    notes.removeNote(req.params.id).then(()=>
    res.json({ok:true}))
    .catch(error => res.status(500).json(error))
});

module.exports = router;
