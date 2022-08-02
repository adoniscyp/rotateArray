
module.exports = {
    displayMatrix: function (array){
        for (let i = 0; i < array.length; i++) {
            for (let j = 0; j < array.length; j++) {
                process.stdout.write(array[i][j].toString()+"|")
            }
            console.log("")
        }
        console.log("-----")
    },

    rotateArray: function(matrix){
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
    },

    createSubMatrix: function(matrix){
        let subMatrix = [];
        for (let i = 1; i < matrix.length-1; i++) {
            let subMatrixEntry = [];
            for (let j = 1; j < matrix.length-1; j++) {
                subMatrixEntry.push(matrix[i][j]);
            }
            subMatrix.push(subMatrixEntry)
        }
        return subMatrix;
    },

    mergeMatrices: function(subMatrix,matrix){
        for (let i = 1; i < matrix.length-1; i++) {
            for (let j = 1; j < matrix.length-1; j++) {
                matrix[i][j]=subMatrix[i-1][j-1];
            }
        }
        return matrix;
    }
};