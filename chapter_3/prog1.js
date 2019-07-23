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