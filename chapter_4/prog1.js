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


// Computing correlation with array that has 4 elements.
// Matrix 2x2 is represented by array of 4 elements.
function phi(table){
    var phi = table[3] * table[0] - table[1] * table[2] // determinant.
    phi /= Math.sqrt((table[3] + table[1]) * 
                    (table[3] + table[2]) * 
                    (table[0] + table[2]) * 
                    (table[0] + table[1]))
    return phi
}


// Check if element event is present in entry array.
function hasEvent(event, entry){
    return (entry.events.indexOf(event) != -1)
}

// Compute correlation matrix for one event.
// index is binary two digit where most significant digit tells if he turned into a squirrel that day,
// and second digit tells if event happened that day.
function tableFor(event, journal){
    var table = [0, 0, 0, 0]
    for(var i = 0; i < journal.length; i++){
        var entry = journal[i], index = 0
        if(hasEvent(event, entry))
            index += 1
        if(entry.squirrel)
            index += 2
        table[index] += 1;
    }
    return table
}

// Computing correlation.
function example6()
{
    console.log('\nComputing correlation')

    var journal = []
    // Function to add information about every day.
    function addEntry(events, didITurnIntoSquirrel){
        journal.push({
            events : event,
            squirrel : didITurnIntoSquirrel
        })
    }

    addEntry(["work", "touched tree", "pizza", "running", "television"], false)
    addEntry(["work", "ice cream", "cauliflower", "lasagna", "touched tree", "brushed teeth"], false)
    addEntry(["weekend", "cycling", "break", "peanuts", "beer"], true)

    console.log(phi([1, 2, 3]))
    console.log(phi([76, 9, 4, 1]))
    console.log(tableFor("pizza", JOURNAL))
}

// Objects as maps
function example7()
{
    console.log('\nObjects as maps')

    map = {}

    function storePhi(event, phi){
        map[event] = phi
    }

    function storeCorrelation(event){
        storePhi(event, phi(tableFor(event, JOURNAL)))
    }

    storeCorrelation("pizza")
    storeCorrelation("work")
    storeCorrelation("cycling")
    storeCorrelation("break")
    storeCorrelation("candy")

    console.log(map)

    // For each loop.
    for(var event in map)
        console.log('The correlation for "' + event + '" is ' + map[event])

    function gatherCorrelations(journal)
    {
        var phis = {}
        for(var index = 0; index < journal.length; index++)
        {
            var entry = journal[index].events
            for(var i = 0; i < entry.length; i++)
            {
                var event = entry[i]
                if(!(event in phis))
                    phis[event] = phi(tableFor(event, journal))
            }
        }
        return phis
    }

    var correlations = gatherCorrelations(JOURNAL)
    console.log(correlations)

    // Filtering results.
    for(var event in correlations)
    {
        var correlation = correlations[event]
        if(correlation > 0.1 || correlation < - 0.1)
            console.log(event + ': ' + correlation)
    }

    // Final analysis.
    for(var i = 0; i < JOURNAL.length; i++)
    {
        var entry = JOURNAL[i]
        if(hasEvent("peanuts", entry) && !hasEvent("brushed teeth", entry))
            entry.events.push("peanut teeth")
    }
    
    // Correlation should be 1.
    console.log(phi(tableFor("peanut teeth", JOURNAL)))
}

// Arrayology
function example8()
{
    console.log('\nArrayology')

    var todoList = []

    function rememberTo(task){
        // Append element at the end of array.
        todoList.push(task)
    }

    function whatIsNext(){
        // Get first element from array and remove it.
        return todoList.shift()
    }

    function urgentlyRememberTo(urgentTask){
        // Append element at the beggining of array.
        todoList.unshift(urgentTask)
    }

    rememberTo('Wash dishes')
    rememberTo('Training')

    console.log(whatIsNext())
    urgentlyRememberTo('Take medicine')
    console.log(whatIsNext())
    console.log(whatIsNext())

    // Difference between indexOf and lastIndexOf.
    console.log([1, 2, 3, 2, 1].indexOf(2))
    console.log([1, 2, 3, 2, 1].lastIndexOf(2))

    // Get subarray from array.
    console.log([0, 1, 2, 3, 4].slice(2, 4))
    console.log([0, 1, 2, 3, 4].slice(2))
    
    // Remove element in array at given index.
    function remove(array, index){
        var leftHalf = array.slice(0, index)
        var rightHalf = array.slice(index+1)
        return leftHalf.concat(rightHalf) // Merge two arrays.
    }

    console.log(remove([1, 2, 3, 4, 5], 2))
}

// Journal from the website of this book.
var JOURNAL = [
    {"events":["carrot","exercise","weekend"],"squirrel":false},
    {"events":["bread","pudding","brushed teeth","weekend","touched tree"],"squirrel":false},
    {"events":["carrot","nachos","brushed teeth","cycling","weekend"],"squirrel":false},
    {"events":["brussel sprouts","ice cream","brushed teeth","computer","weekend"],"squirrel":false},
    {"events":["potatoes","candy","brushed teeth","exercise","weekend","dentist"],"squirrel":false},
    {"events":["brussel sprouts","pudding","brushed teeth","running","weekend"],"squirrel":false},
    {"events":["pizza","brushed teeth","computer","work","touched tree"],"squirrel":false},
    {"events":["bread","beer","brushed teeth","cycling","work"],"squirrel":false},
    {"events":["cauliflower","brushed teeth","work"],"squirrel":false},
    {"events":["pizza","brushed teeth","cycling","work"],"squirrel":false},
    {"events":["lasagna","nachos","brushed teeth","work"],"squirrel":false},
    {"events":["brushed teeth","weekend","touched tree"],"squirrel":false},
    {"events":["lettuce","brushed teeth","television","weekend"],"squirrel":false},
    {"events":["spaghetti","brushed teeth","work"],"squirrel":false},
    {"events":["brushed teeth","computer","work"],"squirrel":false},
    {"events":["lettuce","nachos","brushed teeth","work"],"squirrel":false},
    {"events":["carrot","brushed teeth","running","work"],"squirrel":false},
    {"events":["brushed teeth","work"],"squirrel":false},
    {"events":["cauliflower","reading","weekend"],"squirrel":false},
    {"events":["bread","brushed teeth","weekend"],"squirrel":false},
    {"events":["lasagna","brushed teeth","exercise","work"],"squirrel":false},
    {"events":["spaghetti","brushed teeth","reading","work"],"squirrel":false},
    {"events":["carrot","ice cream","brushed teeth","television","work"],"squirrel":false},
    {"events":["spaghetti","nachos","work"],"squirrel":false},
    {"events":["cauliflower","ice cream","brushed teeth","cycling","work"],"squirrel":false},
    {"events":["spaghetti","peanuts","computer","weekend"],"squirrel":true},
    {"events":["potatoes","ice cream","brushed teeth","computer","weekend"],"squirrel":false},
    {"events":["potatoes","ice cream","brushed teeth","work"],"squirrel":false},
    {"events":["peanuts","brushed teeth","running","work"],"squirrel":false},
    {"events":["potatoes","exercise","work"],"squirrel":false},
    {"events":["pizza","ice cream","computer","work"],"squirrel":false},
    {"events":["lasagna","ice cream","work"],"squirrel":false},
    {"events":["cauliflower","candy","reading","weekend"],"squirrel":false},
    {"events":["lasagna","nachos","brushed teeth","running","weekend"],"squirrel":false},
    {"events":["potatoes","brushed teeth","work"],"squirrel":false},
    {"events":["carrot","work"],"squirrel":false},
    {"events":["pizza","beer","work","dentist"],"squirrel":false},
    {"events":["lasagna","pudding","cycling","work"],"squirrel":false},
    {"events":["spaghetti","brushed teeth","reading","work"],"squirrel":false},
    {"events":["spaghetti","pudding","television","weekend"],"squirrel":false},
    {"events":["bread","brushed teeth","exercise","weekend"],"squirrel":false},
    {"events":["lasagna","peanuts","work"],"squirrel":true},
    {"events":["pizza","work"],"squirrel":false},
    {"events":["potatoes","exercise","work"],"squirrel":false},
    {"events":["brushed teeth","exercise","work"],"squirrel":false},
    {"events":["spaghetti","brushed teeth","television","work"],"squirrel":false},
    {"events":["pizza","cycling","weekend"],"squirrel":false},
    {"events":["carrot","brushed teeth","weekend"],"squirrel":false},
    {"events":["carrot","beer","brushed teeth","work"],"squirrel":false},
    {"events":["pizza","peanuts","candy","work"],"squirrel":true},
    {"events":["carrot","peanuts","brushed teeth","reading","work"],"squirrel":false},
    {"events":["potatoes","peanuts","brushed teeth","work"],"squirrel":false},
    {"events":["carrot","nachos","brushed teeth","exercise","work"],"squirrel":false},
    {"events":["pizza","peanuts","brushed teeth","television","weekend"],"squirrel":false},
    {"events":["lasagna","brushed teeth","cycling","weekend"],"squirrel":false},
    {"events":["cauliflower","peanuts","brushed teeth","computer","work","touched tree"],"squirrel":false},
    {"events":["lettuce","brushed teeth","television","work"],"squirrel":false},
    {"events":["potatoes","brushed teeth","computer","work"],"squirrel":false},
    {"events":["bread","candy","work"],"squirrel":false},
    {"events":["potatoes","nachos","work"],"squirrel":false},
    {"events":["carrot","pudding","brushed teeth","weekend"],"squirrel":false},
    {"events":["carrot","brushed teeth","exercise","weekend","touched tree"],"squirrel":false},
    {"events":["brussel sprouts","running","work"],"squirrel":false},
    {"events":["brushed teeth","work"],"squirrel":false},
    {"events":["lettuce","brushed teeth","running","work"],"squirrel":false},
    {"events":["candy","brushed teeth","work"],"squirrel":false},
    {"events":["brussel sprouts","brushed teeth","computer","work"],"squirrel":false},
    {"events":["bread","brushed teeth","weekend"],"squirrel":false},
    {"events":["cauliflower","brushed teeth","weekend"],"squirrel":false},
    {"events":["spaghetti","candy","television","work","touched tree"],"squirrel":false},
    {"events":["carrot","pudding","brushed teeth","work"],"squirrel":false},
    {"events":["lettuce","brushed teeth","work"],"squirrel":false},
    {"events":["carrot","ice cream","brushed teeth","cycling","work"],"squirrel":false},
    {"events":["pizza","brushed teeth","work"],"squirrel":false},
    {"events":["spaghetti","peanuts","exercise","weekend"],"squirrel":true},
    {"events":["bread","beer","computer","weekend","touched tree"],"squirrel":false},
    {"events":["brushed teeth","running","work"],"squirrel":false},
    {"events":["lettuce","peanuts","brushed teeth","work","touched tree"],"squirrel":false},
    {"events":["lasagna","brushed teeth","television","work"],"squirrel":false},
    {"events":["cauliflower","brushed teeth","running","work"],"squirrel":false},
    {"events":["carrot","brushed teeth","running","work"],"squirrel":false},
    {"events":["carrot","reading","weekend"],"squirrel":false},
    {"events":["carrot","peanuts","reading","weekend"],"squirrel":true},
    {"events":["potatoes","brushed teeth","running","work"],"squirrel":false},
    {"events":["lasagna","ice cream","work","touched tree"],"squirrel":false},
    {"events":["cauliflower","peanuts","brushed teeth","cycling","work"],"squirrel":false},
    {"events":["pizza","brushed teeth","running","work"],"squirrel":false},
    {"events":["lettuce","brushed teeth","work"],"squirrel":false},
    {"events":["bread","brushed teeth","television","weekend"],"squirrel":false},
    {"events":["cauliflower","peanuts","brushed teeth","weekend"],"squirrel":false}
  ];