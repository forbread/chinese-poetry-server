const poemCollection = {

    list: {
        all: "select * from  wudaici   limit ?,?",
        author: "select * from  wudaici where  author like ?   limit ?,?",
        rhythmic: "select * from  wudaici where  rhythmic like ?  limit ?,?",
        type: "select * from  wudaici where   type like ? limit ?,?",
    },
    listCount: {
        all: "select count(*) as total from wudaici ",
        author: "select count(*) as total from  wudaici where  author like ? ",
        rhythmic: "select count(*) as total from  wudaici where  rhythmic like ?  ",
        type:  "select count(*) as total from  wudaici where  type like ? ",
        },
    poets: "select distinct author from wudaici ",
    rhythmic: "select distinct rhythmic from wudaici  ;"


}

module.exports = poemCollection;