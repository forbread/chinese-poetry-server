var poems = {
   
    list:{
        author:"select   id,title,content,author_id,author from poems where author like ? limit ?,?",
        title:"select   id,title,content,author_id,author from poems where title like ? limit ?,?",
        content:"select  id,title,content,author_id,author from poems where content like ? limit ?,?",
        all:"select  * from poems  limit ?,?",
        author_id:"select * from poems where author_id = ? limit ?,?",
        poemsNmae: "select distinct title from poems limit ?,?"
    },
    listCount:{
        author:"select count(*) as total  from poems where author like ?",
        title:"select count(*) as total  from poems where title like ?",
        content:"select count(*) as total  from poems where content like ?",
        all:"select  count(*) as total from poems ",
        author_id:"select count(*) as total from poems where author_id = ?",
        poemsNmae: "select count(distinct title) as total  from poems "
    } 
};

module.exports = poems