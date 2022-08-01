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
   rotateAll(newArr)

  
}

function rotateAll(matrix){
    let rotatedMatrix = matrix;
    let stack=[];
    let merged;
    var subMatrix = rotateArray(matrix)
    stack.push(rotatedMatrix);

    while(true){
        subMatrix = rotateArray(createSubMatrix(subMatrix))
        stack.push(subMatrix);
        if(subMatrix.length === 0){
            let pop1 = stack.pop()
            let pop2 = stack.pop()
            merged = mergeMatrices(pop1, pop2);
            while(stack.length >0){
                let pop = stack.pop()
                merged = mergeMatrices(merged, pop);
                console.log(merged)
            }
            break;
        }
 }

    displayMatrix(merged);
}

function mergeMatrices(subMatrix,matrix){
    // subMatrix = [[10,6],[11,7]];
    // subMatrix = [[12,7,8],[17,13,9],[18,19,14]];

    // displayMatrix(subMatrix);
    for (let i = 1; i < matrix.length-1; i++) {
        for (let j = 1; j < matrix.length-1; j++) {
            matrix[i][j]=subMatrix[i-1][j-1];
        }
    }
    // displayMatrix(matrix);
    return matrix;

}

function createSubMatrix(matrix){
    let subMatrix = [];
    for (let i = 1; i < matrix.length-1; i++) {
        let subMatrixEntry = [];
        for (let j = 1; j < matrix.length-1; j++) {
            subMatrixEntry.push(matrix[i][j]);
        }
        subMatrix.push(subMatrixEntry)
    }
    // console.log(subMatrix)
    return subMatrix;
}

function rotateArray(matrix){
    if(matrix.length <=1 ){
        return matrix;
    }

    let n = matrix.length;
    
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

    return matrix
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
