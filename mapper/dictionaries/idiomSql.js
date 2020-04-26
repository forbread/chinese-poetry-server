const idiom = {

    list: {
        all: "select * from  idiom   limit ?,?",
        word: "select * from  idiom where  word like ?   limit ?,?",
       
    },
    listCount: {
        all: "select count(*) as total from idiom ",
        word: "select count(*) as total from  idiom where  word like ? ",
         
        },
     


}

module.exports = idiom;