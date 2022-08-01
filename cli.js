const fs = require('fs');
const path = require('path');
const csv = require('fast-csv');

fs.createReadStream(path.resolve(__dirname, 'testData', 'testData2.csv'))
    .pipe(csv.parse({ headers: true }))
    .on('error', error => console.error(error))
    .on('data', row => {
        try {
            processRow(JSON.parse(row.json))
        } catch (error) {
            console.log("error parsing row", error);
        }
      }
    )
    .on('end', rowCount => console.log(`Parsed ${rowCount} rows`));

function processRow(row){
  let n = row.length;
  if(n === 0 || Math.sqrt(n) % 1 !== 0 )
   {
    console.log("[]");
    return [];
   }
   const newArr = [];
   while(row.length) newArr.push(row.splice(0,Math.sqrt(n)));
   rotateArray(newArr)
}

function rotateArray(matrix){
    console.log(matrix);
    let n = matrix.length;
    displayMatrix(matrix)
    let carry = matrix[0][0];
    for(let i=0;i<n-1;i++){
        matrix[i][0]=matrix[i+1][0];
    }

    for(let i=0;i<n-1;i++){
        matrix[n-1][i]=matrix[n-1][i+1];
    }

    for(let i=0;i<n-1;i++){
        matrix[n-i-1][n-1]=matrix[n-i-2][n-1];
    }
    for(let i=0;i<n-1;i++){
        matrix[0][n-i-1]=matrix[0][n-i-2];
    }
    matrix[0][1] = carry;

    displayMatrix(matrix)

}

function displayMatrix(array){
    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array.length; j++) {
            process.stdout.write(array[i][j].toString()+"|")
        }
        console.log("")
    }
    console.log("-----")
}
