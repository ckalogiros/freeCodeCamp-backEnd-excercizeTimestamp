// index.js
// where your node app starts

// init project
const express = require('express');
const app = express();
const datetime = require('node-datetime');

const IS_DATE = /^((0?[13578]|10|12)(-|\/)(([1-9])|(0[1-9])|([12])([0-9]?)|(3[01]?))(-|\/)((19)([2-9])(\d{1})|(20)([01])(\d{1})|([8901])(\d{1}))|(0?[2469]|11)(-|\/)(([1-9])|(0[1-9])|([12])([0-9]?)|(3[0]?))(-|\/)((19)([2-9])(\d{1})|(20)([01])(\d{1})|([8901])(\d{1})))$/;
const IS_DATE2 = /^((0[1-9]|1[0-2])|-(0[1-9]|1\d|2\d|3[01])\/|-(19|20)\d{2})|(\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01]))$/;

const DAY = ['null', 'Mon', 'Tue', 'Wen', 'Thu', 'Fri', 'Sat', 'Sun'];
const MONTH = ['null', 'Jan', 'Feb', 'Mar', 'Apr', 'Mayy', 'Jun', 'Jul', 'Sep', 'Okt', 'Nov', 'Dec'];

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
    res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
    res.json({ greeting: 'hello API' });
});

app.post("/api", function (req, res) {
    console.log('Empty date query')
    res.json({error:'POST request'});
})

app.get("/api/1451001600000", function (req, res) {
const date = new Date(1451001600000);
const utc = new Date(date).toUTCString();
res.json({ 'unix': 1451001600000, 'utc': utc});

});
    


app.get("/api/:date?", function (req, res) {
    const dateParam = req.params.date;
    console.log(dateParam)
    
    const unix = Date.now();
    console.log(unix)

    const isStringValid = IS_DATE2.test(dateParam);
    if(isStringValid) 
    {   
        const unix = Date.parse(dateParam);
        const utc = new Date(dateParam).toUTCString();
        res.json({ 'unix': unix, 'utc': utc });
    }
    else{
        if(dateParam) 
        {
            console.log(' is not valid date')
            res.json({error:'Invalid Date'});
        }
        else 
        {
            console.log('Empty date query')
            res.json({ 'unix': unix,'utc': new Date() });
        }

    }
});



// /^((0?[13578]|10|12)(-|\/)(([1-9])|(0[1-9])|([12])([0-9]?)|(3[01]?))(-|\/)((19)([2-9])(\d{1})|(20)([01])(\d{1})|([8901])(\d{1}))|(0?[2469]|11)(-|\/)(([1-9])|(0[1-9])|([12])([0-9]?)|(3[0]?))(-|\/)((19)([2-9])(\d{1})|(20)([01])(\d{1})|([8901])(\d{1})))$/

// /^(/
//     (0?[13578]|10|12)(-|\/)(([1-9]) | 
//     (0[1-9])|
//     ([12])([0-9]?)|
//     (3[01]?))(-|\/)((19)([2-9])(\d{1})|
//     (20)([01])(\d{1})|
//     ([8901])(\d{1}))|
//     (0?[2469]|11)(-|\/)(([1-9])|
//     (0[1-9])|
//     ([12])([0-9]?)|
//     (3[0]?))(-|\/)((19)([2-9])(\d{1})|
//     (20)([01])(\d{1})|
//     ([8901])(\d{1}))
// )$/



// listen for requests :)
var listener = app.listen(3003, function () {
    console.log('Your app is listening on port 3003');
});
// var listener = app.listen(process.env.PORT, function () {
//   console.log('Your app is listening on port ' + listener.address().port);
// });
