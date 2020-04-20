var poetrys = {

    list: {
        author_id: "select   * from poetry where author_id = ? limit ?,?",
        author: "select   * from poetry where author like ? limit ?,?",
        title: "select   * from poetry where title like ? limit ?,?",
        content: "select  * from poetry where content like ? limit ?,?",
        all: "select  * from poetry limit ?,?",
    },
    listCount: {
        author_id: "select count(*) as total  from poetry where author_id = ?",
        author: "select count(*) as total  from poetry where author like ?",
        title: "select count(*) as total  from poetry where title like ?",
        content: "select count(*) as total  from poetry where content like ?",
        all: "select  count(*) as total  from poetry ",
    }
};



module.exports = poetrys;