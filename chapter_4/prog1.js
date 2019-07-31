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
    console.log('\nMethods')

    var doh = 'Doh'
    console.log(typeof doh.toUpperCase())
    console.log(doh.toUpperCase())

    var mack = []
    mack.push('Mack')
    mack.push('the', 'knife')
    console.log(mack)
    console.log(mack.join(' '))
    console.log(mack.pop())
    console.log(mack)
}

// Objects
function example3()
{
    console.log('\nObjects')

    var day1 = {
        squirrel : false,
        events : ['events', 'touched tree', 'pizza', 'running', 'television']
    }
    
    console.log(day1.squirrel)
    console.log(day1.wolf)
    // Adding property to object.
    day1.wolf = false;
    
    console.log(day1.wolf)

    var descriptions = {
        work : 'Went to work',
        'touched tree' : 'Touched a tree'
    }

    var anObject = {left : 1, right : 2}
    var testObject = {1 : 'a', 2 : 'b', '3' : 'c'}

    console.log('\n')
    console.log(anObject.left, anObject.right)
    console.log(anObject['left'], anObject['right'])
    //console.log(anObject[left], anObject[right]) -> error.
    //console.log(testObject.1, testObject.2) -> error.
    // Remove property from object.
    delete anObject.left
    console.log(anObject.left)
    console.log('left' in anObject)
    console.log('right' in anObject)

    console.log(testObject[1], testObject['2'], testObject[3])
    console.log(1 in testObject)
    console.log('1' in testObject)
    console.log(3 in testObject)
    delete testObject[1]
    console.log(testObject[1])
    console.log(1 in testObject)
}

// Array of objects.
function example4()
{
    console.log('\nArray of objects')
    var journal = [
        {
            events : ['work', 'touched tree', 'pizza', 
                    'running', 'television'],
            squirrel : false
        },
        {
            events : ['work', 'ice cream', 'cauliflower', 'lasagna'],
            squirrel : false
        }
    ]

    console.log(journal[0])
    console.log(journal[1])
}

// Mutability.
function example5()
{
    console.log('\nMutability')

    var object1 = {value : 10}
    var object2 = object1
    var object3 = {value : 10}

    // Same references.
    console.log(object1 == object2)
    // Same values but not references.
    console.log(object1 == object3)

    object1.value = 0
    console.log(object2.value)
    console.log(object3.value)
}