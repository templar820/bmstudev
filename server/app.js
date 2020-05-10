var express = require('express');
var path = require('path');
var app = express();

app.use('/', express.static(path.join(__dirname, '../build')));
app.get('/*', (req, res, next) => {
    if(!(req.headers['authorization'] && req.headers['authorization'].length)){
        res.sendFile(path.join(__dirname, '../build', 'index.html')); 
    }
});
const PORT = process.env.PORT || 5000

app.listen(PORT, () =>{
    console.log(`server start on ${PORT} port`)
})