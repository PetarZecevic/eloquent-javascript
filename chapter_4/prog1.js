// Array.
function example1()
{
    console.log('Array')
    // Elements go in [] brackets.
    var listOfNumbers = [2, 3, 5, 7, 11]
    console.log(listOfNumbers)
    console.log(listOfNumbers[2])
    console.log(listOfNumbers[-1]) // undefined.
    console.log(listOfNumbers[listOfNumbers.length]) // undefined.
    console.log(listOfNumbers[listOfNumbers.length-1])
}

// Methods
function example2()
{
    console.log('Methods')
    var doh = "Doh"
    console.log(typeof doh.toUpperCase())
    console.log(doh.toUpperCase())

    var mack = []
    mack.push("Mack")
    mack.push("the", "knife")
    console.log(mack)
    console.log(mack.join(' '))
    console.log(mack.pop())
    console.log(mack)
}