function variables()
{
    console.log('\nVariables')
    var num = 10
    console.log(num*num)
    num = "MyName"
    console.log(num)
    
    var payment;
    console.log(payment)

    num1 = 5
    console.log(num1)
}

function keyWords()
{
    console.log('\nKeywords and reserved words')
    console.log('break case catch class const continue debugger')
    console.log('default delete do else enum export extends false')
    console.log('finally for function if implements import in')
    console.log('instanceof interface let new null package private')
    console.log('protected public return static super switch this')
    console.log('throw true try typeof var void while with yield')
}

function functions()
{
    console.log('\nFunctions')
    //alert('Hello JavaScript') // Browser function for displaying notifications.
    console.log('max(5,10) : ', Math.max(5,10))
    confirm('Ready for interview?') // Browser function for yes/no dialog.
    prompt('What is your name?', '...') // Browser function for user input.

    var theNumber = Number(prompt('Pick a number', ''))
    alert('Your number is the square root of ' + theNumber * theNumber)
}

function conditionalExecution()
{
    console.log('\nConditional execution')
    // Advanced control over input.
    var number = Number(prompt('Enter any number', ''))
    if(!isNaN(number))
        alert('Number is the square root of ' + number*number)
    else
        alert('Number not entered')
}

function loops()
{
    console.log('\nWhile and do loops')
    
    console.log('First 10 even numbers:')
    var num = 0
    while(num <= 10)
    {
        console.log(num)
        num += 2
    }
    
    console.log('First 10 odd numbers')
    num = 1
    while(num <= 9)
    {
        console.log(num)
        num += 2
    }

    console.log('Calculate 3^10 with while loop:')
    var result = 1
    var counter = 0
    while(counter < 10)
    {
        result *= 3
        counter += 1
    }
    console.log(result)

    do{
        yourName = prompt('Who are you?')
    }while(!yourName)
    console.log(yourName)

    // Calculate 2^10 with for loop.
    var result = 1
    for(var counter = 0; counter < 10; counter++)
        result *= 2
    console.log(result)

    // Break statement test.
    for(var current = 20; ;current++)
    {
        if(current % 7 == 0)
            break
    }
    console.log(current)

    // Switch statement.
    switch (prompt('What is weather like?'))
    {
        case 'rainy':
            console.log('Remember to bring an umbrella.')
            break
        case 'sunny':
            console.log('Dress lightly')
            break
        case 'cloudy':
            console.log('Go outside.')
            break
        default:
            console.log('Unknown weather type!')
            break
    }
}

// Exercises.
function LoopTriangle()
{
    str = '#'
    for (var counter = 0; counter < 7; counter++)
    {
        console.log(str)
        str += '#'
    }
}

function FizzBuzz()
{
    for (var number = 1; number < 101; number++)
    {
        if(number % 3 == 0)
        {
            if(number % 5 == 0)
                console.log("FizzBuzz")
            else
                console.log('Fizz')
        }
        else if(number % 5 == 0)
            console.log('Buzz')
        else
            console.log(number)
    }
}

function ChessBoard(boardSize)
{
    boardString = ''
    blackField = '#'
    whiteField = '_'

    if(!isNaN(boardSize))
    {
        if(boardSize <= 0)
            console.log('Not a positive number')
        else
        {
            for(var row = 0; row < boardSize; row++)
            {
                var currentField
                // Set starting field for this row.
                if(row % 2 != 0)
                    currentField = blackField
                else
                    currentField = whiteField

                for(var column = 0; column < boardSize; column++)
                {
                    boardString += currentField
                    // Change field.
                    if(currentField == blackField)
                        currentField = whiteField
                    else
                        currentField = blackField
                }
                // Place for next row.
                boardString += '\n'
            }
        }
    }
    else
        console.log('Not a number')
    
    return boardString
}