const mongoose = require('mongoose');
const config = require('./mongodb-config.json');

console.log(config.dbuser);
console.log(config.dbpsw);
console.log(encodeURIComponent(config.dbpsw));

let URI = `mongodb+srv://${config.dbuser}:${encodeURIComponent(config.dbpsw)}@${config.dbcluster}-kngtn.mongodb.net/${config.dbname}?retryWrites=true&w=majority`;
console.log(URI);
mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>{
    console.log("Connected to database");
}).catch((err)=>{
    console.log("Not connected to database", err);
});

module.exports = mongoose;