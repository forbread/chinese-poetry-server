const word = {

    list: {
        all: "select * from  word   limit ?,?",
        word: "select * from  word where  word like ?   limit ?,?",
        oldword: "select * from  word where  oldword like ?   limit ?,?",
        strokes: "select * from  word where  strokes = ?   limit ?,?",
       
    },
    listCount: {
        all: "select count(*) as total from word ",
        word: "select count(*) as total from  word where  word like ? ",
        oldword: "select count(*) as total from  word where  oldword like ? ",
        strokes: "select count(*) as total from  word where  strokes = ? ",
         
        },
     


}

module.exports = word;