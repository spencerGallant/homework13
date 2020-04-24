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

    const uri = "mongodb+srv://sgallant:inkheart3115@cluster0-6ztc8.mongodb.net/test?retryWrites=true&w=majority";

    const client = new MongoClient(uri, { useUnifiedTopology: true });
    
    connect(client, name, ticker, res);
    //res.end();

}).listen(port);

async function connect(client, name, ticker, res) {
    client.connect(err => {
        res.write("hero");
        const collection = client.db("Company_Tickers").collection("Company Tickers");
        res.write("hero nope");
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
                        res.write(name + "'s ticker is: " + items[i].Ticker);
                        found = true;
                        break;
                    }
                    if (items[i].Ticker == ticker) {
                        res.write(ticker + " represents " + items[i].Company);
                        found = true;
                        break;
                    }
                }

                if (!found) {
                    res.write("The company or ticker you are looking for is not in our database. Sorry!");
                }
            }
        });  //end find
    });
}
