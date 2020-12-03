var sql = {
   
  list:{
       
      all:"select  * from shenglvqimeng  limit ?,?",
     
  },
  listCount:{
      
      all:"select  count(*) as total from shenglvqimeng ",
      
  } 
};

module.exports = sql