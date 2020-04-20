const poets={
    poetry:{
        list:"select * from poetry_author  limit ?,?",
        listCount:"select count(*) as total from poetry_author",
        id:"select * from poetry_author where id = ?",
        dynasty:"select * from poetry_author where dynasty = ? limit ?,?",
        dynastyCount:"select count(*) as total from poetry_author where dynasty = ?"
    },
    poem:{
        list:"select * from poems_author  limit ?,?",
        id:"select * from poems_author where id = ?",
        count:"select count(*) as total from poems_author "
    }
}

module.exports =poets