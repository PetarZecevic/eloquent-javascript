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
    console.log('\n\nExample 2')
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
    console.log('\n\nExample 3')

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