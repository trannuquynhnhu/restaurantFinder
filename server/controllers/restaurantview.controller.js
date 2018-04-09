var express = require("express");
var router = express.Router();
var fs = require("fs");

router.get("/images/:filename", readImage);

function readImage(req, res){       
   
    var fileName = req.params.filename + "_1.jpg";
    fs.readFile('./public/images/' + fileName, (err, data) => {
        console.log(fileName);
        if(err) throw err;        
        res.writeHead(200, {'Content-Type': 'image/jpeg'});
        res.end(data); 
    });       
};


module.exports = router;