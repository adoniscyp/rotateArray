const fs = require('fs');
const path = require('path');
const csv = require('fast-csv');
const matriX = require('./lib/matrix.js');

function parseJSON(row){
    try {
      return JSON.parse(row);
    } catch(ex){
      return [];
    }
}
function readStream(dataPath){
    console.log("id,json,is_valid");
    fs.createReadStream(path.resolve(__dirname, '.', dataPath))
    .pipe(csv.parse({ headers: true }))
    .on('error', error => console.error(error))
    .on('data', row => {
        try {
            let res = processRow(parseJSON(row.json))
            if(res.length === 0){
                console.log(row.id + ",\"[]\",false" )
            }
            else{
                console.log(row.id+ ",\""+JSON.stringify(res)+"\",true")
            }
        } catch (error) {
            console.log("error parsing row", error);
        }
      }
    )
    .on('end', rowCount =>{});
}

function processRow(row){
  let n = row.length;
  // Empty table or unequal number of columns and rows is invalid input  
  if(n === 0 || Math.sqrt(n) % 1 !== 0 )
   {
    return [];
   }
   const matrix2D = [];
   // Converting flat array to 2D array   
   while(row.length) matrix2D.push(row.splice(0,Math.sqrt(n)));
   // Rotating the array converting back to 1D   
   return rotateAll(matrix2D).flat();
}

// Rotating the outmost square, then the square inside the outmost square until no more squares left
// All squares are rotated and merged back together into a single square
function rotateAll(matrix){
    let rotatedMatrix = matrix;
    let stack=[];
    let merged;
    var subMatrix = matriX.rotateArray(matrix)
    stack.push(rotatedMatrix);

    while(true){
        subMatrix = matriX.rotateArray(matriX.createSubMatrix(subMatrix))
        stack.push(subMatrix);
        // We reached the innermost square
        if(subMatrix.length === 0){
            let pop1 = stack.pop()
            let pop2 = stack.pop()
            merged = matriX.mergeMatrices(pop1, pop2);
            while(stack.length >0){
                let pop = stack.pop()
                merged = matriX.mergeMatrices(merged, pop);
            }
            break;
        }
    }

    return merged;
}


const myArgs = process.argv.slice(2);
if(myArgs.length === 0){
    console.log("You need to provide input .csv via args. Try: $node cli.js testData/testData1.csv")
}
else{
    readStream(myArgs[0]);
}

