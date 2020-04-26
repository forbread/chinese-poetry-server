const xiehouyu = {

    list: {
        all: "select * from  xiehouyu   limit ?,?",
        word: "select * from  xiehouyu where  riddle like ?   limit ?,?",
       
    },
    listCount: {
        all: "select count(*) as total from xiehouyu ",
        word: "select count(*) as total from  xiehouyu where  riddle like ? ",
         
        },
     


}

module.exports = xiehouyu;