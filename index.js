var http = require('http');
var url = require('url');
var port = process.env.PORT || 3000;


 http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
   res.write(req.url + "<br>");
    var obj = url.parse(req.url, true).query;
    var name = obj.company_name;
    var ticker = obj.ticker;
    res.write("Name: " + name + " <br> Ticker: " + ticker);
    
    //connect to MongoDB
     const MongoClient = require('mongodb').MongoClient;

     const uri = "mongodb+srv://spencergallant:<inkheart3115>@cluster0-avmpy.mongodb.net/test?retryWrites=true&w=majority";

     MongoClient.connect(uri, function(err,db){
      if(err) {
       console.log("ERROR");
       return console.log(err)
      }
      var dbo = db.db("homework13");
      var collection = dbo.collection("companies");
      console.log("Success!");
     });
//      const client = new MongoClient(uri, { useUnifiedTopology: true });
    
//      connect(client, name, ticker, res);
  //res.end();
//   var test = qobj.x;
   res.end();
 }).listen(port);

async function connect(client, name, ticker, res) {
    res.write("<br> connect");
//     client.connect(err){
//      res.write("error connecting: " + err + "<br>");
//     }
    const collection = client.db("homework13").collection("companies");
    res.write("<br> success connecting!");
//     client.connect(err => {
//         res.write("<br> moving");
        

//         collection.find().toArray(function (err, items) {
//             if (err) {
//                 res.write("<br> error");
//                 console.log("Error: " + err);
//                 return;
//             }
//             else {
//                 found = false;

//                 for (i = 0; i < items.length; i++) {
//                     console.log("in for loop");
//                     if (items[i].Company == name) {
//                         res.write(name + "'s ticker is: " + items[i].Ticker);
//                         found = true;
//                         break;
//                     }
//                     if (items[i].Ticker == ticker) {
//                         res.write(ticker + " represents " + items[i].Company);
//                         found = true;
//                         break;
//                     }
//                 }

//                 if (!found) {
//                     res.write("The company or ticker you are looking for is not in our database. Sorry!");
//                 }
//             }
//         });  //end find
//     });
}
