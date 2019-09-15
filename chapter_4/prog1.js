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

// Strings and their properties.
function example9()
{
    console.log('\nStrings')
    var myString = 'Fido'
    myString.myProperty = 'value'
    console.log(myString.myProperty) // Not an object.
    
    console.log('aba bba dabra hello'.indexOf('da')) // okay.
    console.log('aba bba dabra hello'.indexOf('dad')) // not in string, -1 returned.
    
    console.log('aba bba dabra hello'.trim()) // remove white spaces from the beginning to the end of string.

    console.log('aba bba dabra hello'.charAt(5))
    console.log('aba bba dabra hello'[5])

}

// The arguments object.
function example10()
{
    console.log('\nThe arguments object')

    function argumentCounter(){
        console.log('You gave me', arguments.length, 'arguments.')
    }

    argumentCounter('A', 'B', 'C', 'D')
    argumentCounter()

    function operatorBox(init, operator){
        var result = init
        if(arguments.length > 2)
        {
            // i = 1, because first argument is operator!
            for(var i = 2; i < arguments.length; i++)
            {
                result = operator(result, arguments[i])
            }
        }
        return result
    }

    function sum(a, b){
        return a+b
    }
    function product(a, b){
        return a*b
    }

    console.log(operatorBox(0, sum, 1, 2, 3, 4, 5))
    console.log(operatorBox(0, sum, 1, 2, 3))
    console.log(operatorBox(1, product, 1, 2, 3, 4, 5))
}

// The Math object.
function example11()
{
    console.log('\nMath object')

    function randomPointOnCircle(radius){
        var angle = Math.random() * 2 * Math.PI
        return {x : radius * Math.cos(angle),
                y : radius * Math.sin(angle)}
    }

    console.log(randomPointOnCircle(1))
    
    // Scale random numbers.
    console.log(Math.random() * 10)
    console.log(Math.floor(Math.random() * 100))
    console.log(Math.ceil(Math.random() * 5))
    console.log(Math.round(Math.random() * 2))
}

var myVar = 10
// The global object.
function example12()
{
    console.log('\nThe global object')
    console.log('myVar' in window)
    console.log(window.myVar)
}

// The sum of range.
function exercise1()
{
    console.log('\nThe sum of range')

    function range(start, end){
        var r = []
        var step = 1 // Default step.
        var comparison = function(a,b) {return a <= b} // Default comparison.
        if(arguments.length != 2)
        {
            if(arguments.length == 3)
            {
                // Step defined.
                step = arguments[2]
                if(step < 0)
                    comparison = function(a,b) {return a >= b} // Descend.
            }
            else
                // Wrong number of arguments.
                return r
        }
        for(var i = start; comparison(i,end); i += step)
            r.push(i)
        return r
    }

    function sum(array){
        var s = 0
        for(var i = 0; i < array.length; i++)
            s += array[i]
        return s
    }

    console.log(sum(range(1, 10)))
    console.log(sum(range(1, 5, 2)))
    console.log(sum(range(1, 5, 3)))
    console.log(sum(range(5, -1, -2)))
}

// Reversing an array.
function exercise2()
{
    console.log('\nReversing an array')

    function reverseArray(array){
        var newArray = []
        for(var i = array.length-1; i >= 0; i--){
            newArray.push(array[i])
        }
        return newArray
    }

    function reverseArrayInPlace(array){
        for(var i = 0; i < Math.floor(array.length / 2); i++)
        {
            var tmp = array[i]
            array[i] = array[array.length-i-1]
            array[array.length-i-1] = tmp
        }
    }
    
    console.log(reverseArray([1, 2, 3, 4, 5]))
    console.log(reverseArray([1, 2, 3, 4]))
    var arr = [1, 2, 3, 4, 5]
    reverseArrayInPlace(arr)
    console.log(arr)
    arr = [1, 2, 3, 4]
    reverseArrayInPlace(arr)
    console.log(arr)
}

// A list.
function exercise3()
{
    console.log('\nA list')

    function arrayToList(array){
        if(array.length >= 1)
            return {
                value: array[0],
                rest: arrayToList(array.slice(1))
            }
        else
            return null
    }

    function arrayToListIterative(array){
        if(array.length >= 1)
        {
            var list = {value: array[0], rest: null}
            var curr = list
            for(var i = 1; i < array.length; i++)
            {
                var tmp = {value: array[i], rest: null}
                curr.rest = tmp
                curr = tmp
            }
            return list
        }
        else
            return null
    }

    function listToArray(list){
        arr = []
        function recursive(l){
            if(!l)
                return
            arr.push(l.value)
            recursive(l.rest)
        }
        recursive(list)
        return arr
    }

    function listToArrayIterative(list){
        arr = []
        while(list)
        {
            arr.push(list.value)
            list = list.rest
        }
        return arr
    }

    function prepend(element, list)
    {
        return {value: element, rest: list}
    }

    function nth(list, position)
    {
        if(!list)
            return undefined
        else if(position < 0)
            return undefined
        else if(position == 0)
            return list.value
        else
            return nth(list.rest, position-1)
    }

    var l1 = arrayToList([1, 2, 3])
    var l2 = arrayToListIterative([1, 2, 3])
    
    console.log(l1)
    console.log(l2)

    var arr1 = listToArray(l1)
    var arr2 = listToArrayIterative(l2)

    console.log(arr1)
    console.log(arr2)

    console.log(prepend(10, l1))
    console.log(nth(l1, 2))
    console.log(nth(l1, 3))
    console.log(nth(l1, 0))
}

// Deep comparison.
function exercise4()
{
    console.log('\nDeep comparison')
    function deepEqual(left, right){
        // Guard against null case.
        if(left == null && right == null){
            return true
        }
        if(left == null || right == null){
            return false
        }
        
        var leftType = typeof left
        var rightType = typeof right

        if(leftType == rightType){
            if(leftType == 'object'){
                // Compare objects.
                var result = true
                for(property in left){
                    if(!(property in right))
                        return false
                    else
                        result = result && deepEqual(left[property], right[property])                    
                }
                // Check if right has properties that left doesn't.
                for(property in right){
                    if(!(property in left))
                        return false
                }
                return result
            }
            else{
                // Compare values.
                return left === right
            }
        }
        else
            return false
    }

    console.log(deepEqual(1, 2))
    console.log(deepEqual(1, null))
    console.log(deepEqual(null, 2))
    console.log(deepEqual(null, null))
    console.log(deepEqual({a: 1}, {b: 1}))
    console.log(deepEqual({a: 1}, {a: 1}))
    console.log(deepEqual({a: 1}, {a: 1, b: 2}))
    console.log(deepEqual({a: 1}, {a: 2}))
    console.log(deepEqual({a: 1, b: 3}, {a: 1}))
    console.log(deepEqual({a: {c : 1}}, {a: 1}))
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