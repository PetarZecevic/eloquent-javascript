// Abstracting array traversal.
function example1(){
    console.log('Abstracting array traversal')
    console.log('\n')
    function forEach(array, action){
        for(var i = 0; i < array.length; i++){
            action(array[i])
        }
    }

    forEach(['basketball', 'football', 'volleyball', 'rugby', 'cricket'], console.log)
    var numbers = [1, 2, 3, 4, 5], sum = 0
    forEach(numbers, function(number){
        sum += number
    })
    console.log(sum)

    // Printing matrix values.
    // Classical.
    printMatrix = function(matrix){
        for(var rowIndex = 0; rowIndex < matrix.length; rowIndex++){
            row = matrix[rowIndex]
            for(var rowElementIndex = 0; rowElementIndex < row.length; rowElementIndex++){
                console.log(row[rowElementIndex])
            }
        }
    }

    printMatrix([[1, 2, 3],[4, 5, 6]])
    console.log('\n')
    
    // Using built-in array function forEach.
    printMatrix = function(matrix){
        matrix.forEach(function(row){
            row.forEach(function(element){
                console.log(element)
            })
        })
    }

    printMatrix([[1, 2, 3],[4, 5, 6]])
}