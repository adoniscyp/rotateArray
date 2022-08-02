var fs = require('fs');
let rows = 100;
var writeStream = fs.createWriteStream('./bigData.csv');

writeStream.write("id,json\n");

writeStream.write("1,\"[");
for (let index = 0; index < rows*rows; index++) {
    writeStream.write(index+",");
}
writeStream.write("]\"");
