var shijing = {

    list: {
        chapter: "select    * from shijing where chapter like ? limit ?,?",
        title: "select   * from shijing where title like ? limit ?,?",
        section: "select  * from shijing where section like ? limit ?,?",
        all: "select  * from shijing   limit ?,?"
    },
    listCount: {
        chapter: "select count(*) as total  from shijing where chapter like ?",
        title: "select count(*) as total  from shijing where title like ?",
        section: "select count(*) as total  from shijing where section like ?",
        all: "select count(*) as total  from shijing ",
    },
    chapter: "select distinct chapter from shijing ",
    section: "select distinct section from shijing ",
    sishuwujing: "select *  from sishuwujing where title = ?"


};



module.exports = shijing;