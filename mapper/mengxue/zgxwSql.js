var sql = {
   
  list:{
       
      all:"select  * from zengguangxianwen  limit ?,?",
     
  },
  listCount:{
      
      all:"select  count(*) as total from zengguangxianwen ",
      
  } 
};

module.exports = sql