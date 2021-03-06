var http = require('http');
var url = require('url');
var port = process.env.PORT || 3000;

// https://www.oreilly.com/library/view/mastering-nodejs-/9781785888960/e00d3fc1-c435-488c-9aab-d81f377ffe69.xhtml
// https://gist.github.com/kentbrew/763822
// https://stackoverflow.com/questions/35408729/express-js-

http.createServer(function (req, res) {

    if (req.url === '/favicon.ico') {
        console.log("MAKES IT HERE");	
        res.writeHead(200, {'Content-pe': 'image/x-icon'});
        // return;
    }  

    res.writeHead(200, {'Content-Type': 'text/html'});
    var obj = url.parse(req.url, true).query;
    var name = obj.company_name;
    var ticker = obj.ticker;
    
    // res.write("Name: " + name + " <br> Ticker: " + ticker);
    
    // connect to MongoDB
    const MongoClient = require('mongodb').MongoClient;

    const uri = "mongodb+srv://spencergallant:inkheart3115@cluster0-avmpy.mongodb.net/test?retryWrites=true&w=majority";
        res.write("YAY<br>");

    const client = new MongoClient(uri, { useUnifiedTopology: true });
            res.write("Super YAY<br>");

    connect(client, name, ticker, res);
    //res.end();

}).listen(port);

async function connect(client, name, ticker, res) {
    res.write("just testing<br>");
        res.write("WELL HERE NOW<br>");
        const collection = client.db("VolunteerData").collection("volunteers");
        res.write("SUPER YAY");
        console.log("success connecting!");

        collection.find().toArray(function (err, items) {
            if (err) {
                console.log("Error: " + err);
                return;
            }
            else {
                found = false;

                for (i = 0; i < items.length; i++) {
                    console.log("in for loop");
                    if (items[i].Company == name) {
                        res.write("This ticker is: " + items[i].Ticker);
                        found = true;
                        break;
                    }
                    if (items[i].Ticker == ticker) {
                        res.write("This company is: " + items[i].Company);
                        found = true;
                        break;
                    }
                }

                if (!found) {
                    res.write("This company/ticker isn't in our database.");
                }
            }
     });
}
