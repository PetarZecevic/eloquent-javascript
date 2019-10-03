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

// Higher-order functions
function example2(){
    console.log('\nHigher-order functions\n')
    
    // Function used to create other function.
    function greaterThan(n){
        return function(m) { return m > n}
    }

    var greaterThan5 = greaterThan(5)
    console.log(greaterThan5(6))
    console.log(greaterThan5(4))
    console.log('\n')

    // Function that change other functions.
    function noisy(f){
        return function(arg){
            var val = f(arg)
            console.log('called with', arg, '- got ', val)
            return val;
        }
    }

    console.log(noisy(Boolean)(0))
    console.log(noisy(Boolean)(2))
    console.log(noisy(Number)('1'))
    console.log('\n')

    // Function that provide new types of control flow.
    function unless(test, then){
        if(!test){
            then()
        }
    }
    function repeat(times, body){
        for(var i = 0; i < times; i++){
            body(i)
        }
    }

    repeat(10, function(n){
        unless(n % 2, function(){
            console.log(n , 'is even')
        })
    })

}

// Passing along arguments.
function example3(){
    console.log('\nPassing along arguments\n')

    function transparentWrapping(f){
        return function(){
            // Passing all of given arguments to inner function.
            return f.apply(null, arguments)
        }
    }

    function argumentPrinter(){
        for(var i = 0; i < arguments.length; i++){
            console.log('Argument', i+1, ':', arguments[i])
        }
        console.log('\n')
    }

    transparentWrapping(argumentPrinter)(1, 2, 3, 4, 5)
    transparentWrapping(argumentPrinter)('a', 3, 4, 'magic function')
}