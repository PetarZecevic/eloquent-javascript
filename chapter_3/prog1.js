function example1()
{
    console.log('Example 1')
    var square = function(x) {
        return x*x
    }
    console.log('12^2 = ', String(square(12)))

    var makeNoise = function(){
        console.log('Pling!')
    }

    var power = function(base, exponent){
        var result = 1
        for(var count = 0; count < exponent; count++)
        {
            result *= base
        }
        return result
    }

    makeNoise()
    console.log('2^10 = ', power(2, 10))
}

// Difference between local and global variables in functions.
function example2()
{
    console.log('\n\nLocal and global variables')
    var x = 'outside'
    var f1 = function(){
        var x = 'inside f1'
    }
    f1()
    console.log(x)

    var f2 = function(){
        x = 'inside f2'
    }
    f2()
    console.log(x)
}

// Creating functions inside function.
function example3()
{
    console.log('\n\nFunctions inside functions')

    var landscape = function(){
        var result = ''
        var flat = function(size){
            for(var count = 0; count < size; count++)
                result += "_"
        }
        var mountain = function(size){
            result += '/'
            for(var count = 0; count < size; count++)
                result += "'"
            result += '\\'
        }

        flat(3)
        mountain(4)
        flat(6)
        mountain(1)
        flat(1)

        return result
    }

    console.log(landscape())
}

// Function declaration.
function example4()
{
    console.log('\n\nFunction declarations')
    console.log('The future says:', future())
    function future()
    {
        return 'we STILL have no flying cars.'
    }
}

// Stack overflow.
function example5()
{
    console.log('\n\nStack overflow')
    function chicken()
    {
        return egg()
    }

    function egg()
    {
        return chicken()
    }

    console.log(chicken() + ' came first.')
}

// Optional number of arguments.
function example6()
{
    console.log('\n\nOptional number of arguments')
    
    function power(base, exponent)
    {
        if(exponent == undefined)
            exponent = 2
        var result = 1
        for(var count = 0; count < exponent; count++)
            result *= base
        return result
    }

    console.log(power(2))
    console.log(power(5, 3))
    console.log(power(3,3,10))
}

// Closure.
function example7()
{
    console.log('\n\nClosure')
    function wrapValue(n)
    {
        var localVariable = n
        return function(){ return localVariable}
    }

    var wrap1 = wrapValue(1)
    var wrap2 = wrapValue(2)

    console.log(wrap1())
    console.log(wrap2())

    function multiplier(factor)
    {
        return function(number){
            return number * factor
        }
    }

    var twice = multiplier(2)
    console.log(twice(5))
}

// Recursion.
function example8()
{
    console.log('\n\nRecursion')

    function power(base, exponent){
        if (exponent == 0)
            return 1
        else
            return base * power(base, exponent-1)
    }

    console.log(power(2, 10))

    function findSolution(target){
        function find(current, history){
            if(current == target)
                return history
            else if(current > target)
                return null
            else
                return find(current + 5, '( ' + history + ' + 5 )') ||
                        find(current * 3, '( ' + history + ' * 3 )')
        }
        return find(1, '1')
    }

    console.log(findSolution(24))
    console.log(findSolution(22))
}

// Growing functions.
// Making functions out of repeatable code.
function example9()
{
    console.log('\n\nGrowing functions')
    // Number of cows and chickens are zero padded to length of 3.
    function printFarmInventory(cows, chickens)
    {
        var cowString = String(cows)
        while(cowString.length < 3)
            cowString = '0' + cowString
        console.log(cowString + ' Cows')
        
        var chickenString = String(chickens)
        while(chickenString.length < 3)
            chickenString = '0' + chickenString
        console.log(chickenString + ' Chickens')
    }

    printFarmInventory(7, 11)
    console.log('\n')

    // One type of improvement.
    function printZeroPaddedWithLabel(number, label)
    {
        var numberString = String(number)
        while(numberString.length < 3)
            numberString = '0' + numberString
        console.log(numberString + ' ' + label)
    }

    function printFarmInventory1(cows, chickens, pigs)
    {
        printZeroPaddedWithLabel(cows, 'Cows')
        printZeroPaddedWithLabel(chickens, 'Chickens')
        printZeroPaddedWithLabel(pigs, 'Pigs')
    }

    printFarmInventory1(7, 11, 3)
    console.log('\n')

    // Another type of improvement.
    function zeroPad(number, width)
    {
        var string = String(number)
        while(string.length < width)
            string = '0' + string
        return string
    }

    function printFarmInventory2(cows, chickens, pigs)
    {
        console.log(zeroPad(cows, 3) + ' Cows')
        console.log(zeroPad(chickens, 3) + ' Chickens')
        console.log(zeroPad(pigs, 3) + ' Pigs')
    }

    printFarmInventory2(7, 16, 3)
    console.log('\n')
}

function exercise1()
{
    console.log('\n\nExercise 1 - Minimum')
    function minimum(a, b)
    {
        if(a < b)
            return a
        else
            return b
    }

    console.log('Min(5, null) = ', minimum(5, null))
    console.log('Min(-1, 1) = ', minimum(-1,1))
}

function exercise2()
{
    console.log('\n\nExercise 2 - Recursion')
    // If number is even, function returns True otherwise False or
    // undefined if argument is not a number.
    function isEven(number)
    {
        // Depends on sign of a number.
        var addConstant = -2

        // Recursive subfunction.
        function recursive(num)
        {
            if(num == 0)
                return true
            else if(num == 1)
                return false
            else
                return recursive(num + addConstant)
        }

        // Guarding from invalid argument values.
        if(!isNaN(number))
        {
            var num = Number(number)
            if(num < 0)
                addConstant = 2
            return recursive(num)   
        }
    }

    console.log('Even(50) = ', isEven(50))
    console.log('Even(75) = ', isEven(75))
    console.log('Even("8") = ', isEven('8'))
    console.log('Even("8a") = ', isEven('8a'))
    console.log('Even(7) = ', isEven(7))
    console.log('Even(-10) = ', isEven(-10))
    console.log('Even(-3) = ', isEven(-3))
    console.log('Even("-5") = ', isEven('-5'))
}

function exercise3()
{
    console.log('\n\nExercise 3 - Bean counting')

    // Count number of B's occurences in string parameter.
    function countBs(string)
    {
        var counter = 0
        for(var index = 0; index < string.length; index++)
        {
            if(string[index] == 'B')
                counter++
        }
        return counter
    }

    console.log('Bs("BaghjkBhashB") = ', countBs("BaghjkBhashB"))
    console.log('Bs("asa") = ', countBs("asa"))

    // Function that count number of occurences of passed char argument.
    function countChar(string, char)
    {
        var counter = 0
        for(var index = 0; index < string.length; index++)
        {
            if(string[index] == char)
                counter++
        }
        return counter
    }   

    function countBsImproved(string)
    {
        return countChar(string, 'B')
    }

    console.log('BsImproved("BaghjkBhashB") = ', countBsImproved("BaghjkBhashB"))
    console.log('BsImproved("asa") = ', countBsImproved("asa"))
}