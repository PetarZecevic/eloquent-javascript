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
}