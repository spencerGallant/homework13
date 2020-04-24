var client = require('mongodb').MongoClient;
  var url = "mongodb+srv://spencergallant:<Inkheart3115>@cluster0-avmpy.mongodb.net/test?retryWrites=true&w=majority";
  const csv = require('csv-parser');
  const fs = require('fs');

  client.connect(url, function(err, db) {
    if (err) throw err;

    var dbo = db.db("homework13");
    fs.createReadStream('companies.csv')
      .pipe(csv())
      .on('data', (row) => {
        var obj = row;
        dbo.collection("companies").insertOne(obj, function(err, res) {
          if (err) throw err;
          console.log("Company inserted");
          db.close();
        });
      })
  });