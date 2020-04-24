var http = require('http');
var url = require('url');
var port = process.env.PORT || 3000;

http.createServer(function (req, res) {

    res.writeHead(200, {'Content-Type': 'text/html'});
    var obj = url.parse(req.url, true).query;
    var name = obj.company_name;
    var ticker = obj.ticker;
    
    res.write("Name: " + name + " <br> Ticker: " + ticker);
    
    // connect to MongoDB
    const MongoClient = require('mongodb').MongoClient;

    const uri = "mongodb+srv://colinjames1:jamescolin1@cluster0-ztasy.mongodb.net/test?retryWrites=true&w=majority";
    res.write("HERE");
    const client = new MongoClient(uri, { useUnifiedTopology: true });
    res.write("HELP 0");
    const collection = client.db("companies").collection("companies");
    res.write("HELP 1");

    //connect(client, name, ticker, res);
    //res.end();

}).listen(port);

async function connect(client, name, ticker, res) {
    
    console.log("success connecting!");

    collection.find().toArray(function (err, items) {
            if (err) {
                res.write("HELP 1");
                console.log("Error: " + err);
                return;
            }
            else {
                res.write("HELP 2");
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
}
