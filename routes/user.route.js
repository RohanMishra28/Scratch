const express = require('express')
const router = express.Router();

router.get('/',(req,res)=>{
  res.send('be focused!')

})

module.exports = router;