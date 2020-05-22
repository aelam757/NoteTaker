const util = require("util");
const fs = require("fs");
const uuidv1 = require("uuid/v1");

const readFileAsync = util.promisify(fs.readFile)
const writeFileAsync = util.promisify(fs.writeFile)

class Note {
    read(){
        return readFileAsync("data/db.json", "utf8")
    }
    write(note){
        return writeFileAsync("data/db.json", JSON.stringify(note))
    }
    getNotes(){
        return this.read().then(notes =>{
            let parseNotes; 
            try{
                parseNotes = [].concat(JSON.parse(notes))
            }
            catch(error){parseNotes=[]
            }
            return parseNotes
        }
    )}
    addNote(note){
        const {title,text} = note 
        if (!title || !text){
            throw new Error("Can't be blank")
        }
        const newNote = {title,text,id:uuidv1()}
        return this.getNotes().then(notes =>
            [...notes,newNote]).then(uNotes => this.write(uNotes)).then(()=> newNote)
    }
    removeNote(id){
        return this.getNotes().then(notes=>
            notes.filter(note => note.id!==id)).then(fNotes => this.write(fNotes))
    }
};

module.exports = new Note;