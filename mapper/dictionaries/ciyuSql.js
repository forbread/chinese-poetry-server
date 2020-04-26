const ciyu = {

    list: {
        all: "select * from  ciyu   limit ?,?",
        word: "select * from  ciyu where  ci like ?   limit ?,?",
       
    },
    listCount: {
        all: "select count(*) as total from ciyu ",
        word: "select count(*) as total from  ciyu where  ci like ? ",
         
        },
     


}

module.exports = ciyu;