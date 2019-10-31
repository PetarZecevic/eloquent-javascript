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

// Higher-order functions.
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

// JSON.
function example4(){
    console.log('\nJSON\n')

    var string = JSON.stringify({name: "Marko", born: 1990})
    console.log(string)

    var person = JSON.parse('{"name" : "Marko", "born" : 1990}')
    console.log('Name: ', person.name)
    console.log('Born: ', person.born)
}

// Filtering an array.
function example5(){
    console.log('\nFiltering an array\n')
    
    var numArray = [-10 , -5, -2, -1, 0, 3, 4, 5, 6, 7, 90, 1000]

    // Custom filter.
    function filter(array, test){
        var passed = []
        for(var i = 0; i < array.length; i++){
            if(test(array[i]))
                passed.push(array[i])
        }
        return passed
    }
    console.log('Custom filter: ', filter(numArray, function(num){
        return num > -5 && num < 10 && !(num % 2)
    }))
    
    // Standard filter.
    console.log('Standard filter: ', numArray.filter(function(num){
        return num > -5 && num < 10 && !(num % 2)
    }))
}   

// Transforming with map.
function example6(){
    console.log('\nTransforming with map\n')

    var data = [{name: 'Petar', age: 22}, {name: 'Milan', age: 20}, {name: 'Jovan', age: 30}]
    // Custom map.
    function map(array, transform){
        var mapped = []
        for(var i = 0; i < array.length; i++){
            mapped.push(transform(array[i]))
        }
        return mapped
    }
    console.log('Custom map: ', map(data, function(element){
        return element.name
    }))
    // Standard map.
    console.log('Standard map: ', data.map(function(element){
        return element.name
    }))
}

// Summarizing with reduce
function example7(){
    console.log('\nSummarizing with reduce\n')

    var numArray = [27, 100, 4, 5, 10, 10]
    // Custom reduce.
    function reduce(array, combine, start){
        if(start){
            var current = start
            var startIndex = 0            
        }
        else{
            // Take first element in array as the start value.
            var current = array[0]
            var startIndex = 1
        }
        for(var i = startIndex; i < array.length; i++){
            current = combine(current, array[i])
        }
        return current
    }
    console.log('Custom')
    console.log('Sum: ', reduce(numArray, function(a, b){
        return a + b}, 0))
    console.log('Minimum: ', reduce(numArray, function(a, b){
        if(a < b)
            return a
        else
            return b}))
    // Standard reduce.
    console.log('Standard')
    console.log('Sum: ', numArray.reduce(function(a,b){return a+b}, 0))
    console.log('Sum: ', numArray.reduce(function(a,b){
        if(a < b) 
            return a 
        else
            return b}))
}

// Composability
function example8(){
    console.log('\nComposability\n')

    function createPerson(name, age, sex){
        return {name: name, age: age, sex: sex}
    }
    var data = []
    // Male.
    data.push(createPerson('Milos', 33, 'm'))
    data.push(createPerson('Bogdan', 11, 'm'))
    data.push(createPerson('Nikola', 20, 'm'))
    data.push(createPerson('Stefan', 15, 'm'))
    data.push(createPerson('Luka', 18, 'm'))
    // Female.
    data.push(createPerson('Nikolina', 22, 'f'))
    data.push(createPerson('Jovana', 26, 'f'))
    data.push(createPerson('Lea', 35, 'f'))
    data.push(createPerson('Andrea', 40, 'f'))
    
    function average(array){
        if(array.length != 0){    
            function plus(a, b){
                return a+b
            }
            return array.reduce(plus) / array.length
        }
    }
    function age(person){
        return person.age
    }
    function male(person){
        return person.sex == 'm'
    }
    function female(person){
        return person.sex == 'f'
    }
    
    console.log('Average male age: ', average(data.filter(male).map(age)))
    console.log('Average female age: ', average(data.filter(female).map(age)))
    console.log('Average age: ', average(data.map(age)))
}

// Great-great-great-great ...
function example9(){
    console.log('\nCalculate percentage of DNA shared with most ancient ancestor.\n')

    var ancestors = JSON.parse(ANCESTRY_FILE)

    // Object that associates names with people.
    var byName = {}
    ancestors.forEach(function(person){
        byName[person.name] = person
    })
    console.log(byName['Philibert Haverbeke'])

    function reduceAncestors(person, operator, defaultValue){
        function valueFor(person){
            if(person == null){
                return defaultValue
            }
            else{
                return operator(person, valueFor(byName[person.father]), 
                                valueFor(byName[person.mother]))
            }
        }
        return valueFor(person)
    }

    // Perform calculation of common DNA percentage with ancestor.
    function sharedDNA(person, fromFather, fromMother){
        if(person.name == 'Pauwels van Haverbeke'){
            return 1
        }
        else{
            return (fromFather + fromMother) / 2
        }
    }

    var ph = byName['Philibert Haverbeke']
    // Divide by 4 because this person is grandfather.
    console.log('Common DNA percentage: ', reduceAncestors(ph, sharedDNA, 0) / 4)

    console.log('Counting percentage of ancestors that lived past 70 years.')
    function countAncestors(person, predicate){
        function combine(current, fromFather, fromMother){
            var thisOneCounts = current.name != person.name && predicate(current)
            return fromFather + fromMother + (thisOneCounts ? 1 : 0)
        }
        return reduceAncestors(person, combine, 0)
    }
    function longLivingPercentage(person){
        var all = countAncestors(person, function(p){return true})
        var longLiving = countAncestors(person, function(p){
            return (p.died - p.born) >= 70
        })
        return longLiving / all
    }
    console.log(longLivingPercentage(ph))
}

// Binding.
function example10(){
    console.log('\nBinding\n')

    var theSet = ['Carel Haverbeke', 'Maria van Brussel', 'Donald Duck']
    
    function isInSet(set, person){
        return set.indexOf(person.name) > -1
    }
    var ancestors = JSON.parse(ANCESTRY_FILE)
    // Without bind.
    console.log(ancestors.filter(function(person){
        return isInSet(theSet, person)
    }))
    // With bind.
    console.log(ancestors.filter(isInSet.bind(null, theSet)))
}

// Flattening.
function exercise1(){
    console.log('\nFlattening\n')
    function flatten(array2D){
        return array2D.reduce(function(baseArray, array){
            return baseArray.concat(array)
        }, [])
    }

    console.log(flatten([[1, 2, 3], [4, 5, 6], [7]]))

    function flattenRecursive(arrayTree){
        function merge(baseArray, array){
            function quantify(arr){
                // Check if parameter is array.
                if(arr.length){
                    return arr.reduce(merge, [])
                }   
                else{
                    return arr
                }
            }
            return baseArray.concat(quantify(array))
        }
        return arrayTree.reduce(merge, [])
    }

    var tree = [[1, 2, [3, 4, [5]]], 6, 7, [8, 9], [[[10]]]]
    console.log(flattenRecursive(tree))
}

// Mother-child age difference. 
function exercise2(){
    console.log('\nMother-child age difference\n')

    function average(array){
        if(array.length != 0){    
            function plus(a, b){
                return a+b
            }
            return array.reduce(plus) / array.length
        }
    }

    var byName = {}
    var ancestors = JSON.parse(ANCESTRY_FILE)
    ancestors.forEach(function(person){
        byName[person.name] = person
    })
    
    var ageDifferenceArray = ancestors.map(function(person){ 
        if(byName[person.mother])
            return person.born - byName[person.mother].born
        else
            return 0}).filter(function(ageDifference){ return ageDifference > 0})
    console.log(average(ageDifferenceArray))
}

// Historical life expectancy.
function exercise3(){
    console.log('\nHistorical life expectancy\n')

    function average(array){
        if(array.length != 0){    
            function plus(a, b){
                return a+b
            }
            return array.reduce(plus) / array.length
        }
    }

    var centuries = {}
    var ancestors = JSON.parse(ANCESTRY_FILE)
    ancestors.forEach(function(person){
        century = Math.ceil(person.died / 100)
        if(century in centuries)
            centuries[century].push(person.died - person.born)
        else
            centuries[century] = [person.died - person.born]
    })
    for(var century in centuries){
        centuries[century] = average(centuries[century])
    }
    console.log(centuries)

    function groupBy(array, groupingOperation){
        groups = {}
        array.forEach(function(element){
            groupName = groupingOperation(element)
            if(groupName in groups)
                groups[groupName].push(element)
            else
                groups[groupName] = [element]
        })
        return groups
    }

    var centuryGroups = groupBy(ancestors, function(person){
        return Math.ceil(person.died / 100)
    })

    for(var century in centuryGroups){
        centuryGroups[century] = average(centuryGroups[century].map(function(person){
            return person.died - person.born
        })) 
    }

    console.log(centuryGroups)
}

// Every and then some.
function exercise4(){
    console.log('\nEvery and then some\n')

    // Not optimised
    function every(array, predicate){
        return array.reduce(function(a, b){
            return a && predicate(b)}, true)
    }
    function some(array, predicate){
        return array.reduce(function(a, b){
            return a || predicate(b)}, false)
    }

    console.log(every([NaN, NaN, NaN], isNaN))
    console.log(every([NaN, NaN, 4], isNaN))
    console.log(some([NaN, 3, 4], isNaN))
    console.log(some([2, 3, 4], isNaN))
    console.log(every([1, 2, 3], function(num){return num > 0}))
    console.log(every([1, 2, 0], function(num){return num > 0}))
    console.log(some([0, 0, 0], function(num){return num > 0}))
    console.log(some([1, -1, -1], function(num){return num > 0}))

    // Optimised.
    function everyOptim(array, predicate){
        for(var i = 0; i < array.length; i++){
            if(!predicate(array[i]))
                return false
        }
        return true
    }

    function someOptim(array, predicate){
        for(var i = 0; i < array.length; i++){
            if(predicate(array[i]))
                return true
        }
        return false
    }

    console.log('\n')
    console.log(everyOptim([NaN, NaN, NaN], isNaN))
    console.log(everyOptim([NaN, NaN, 4], isNaN))
    console.log(someOptim([NaN, 3, 4], isNaN))
    console.log(someOptim([2, 3, 4], isNaN))
    console.log(everyOptim([1, 2, 3], function(num){return num > 0}))
    console.log(everyOptim([1, 2, 0], function(num){return num > 0}))
    console.log(someOptim([0, 0, 0], function(num){return num > 0}))
    console.log(someOptim([1, -1, -1], function(num){return num > 0}))
}
// Data for this chapter downloaded from the book's website.
var ANCESTRY_FILE = JSON.stringify([
    {"name": "Carolus Haverbeke", "sex": "m", "born": 1832, "died": 1905, "father": "Carel Haverbeke", "mother": "Maria van Brussel"},
    {"name": "Emma de Milliano", "sex": "f", "born": 1876, "died": 1956, "father": "Petrus de Milliano", "mother": "Sophia van Damme"},
    {"name": "Maria de Rycke", "sex": "f", "born": 1683, "died": 1724, "father": "Frederik de Rycke", "mother": "Laurentia van Vlaenderen"},
    {"name": "Jan van Brussel", "sex": "m", "born": 1714, "died": 1748, "father": "Jacobus van Brussel", "mother": "Joanna van Rooten"},
    {"name": "Philibert Haverbeke", "sex": "m", "born": 1907, "died": 1997, "father": "Emile Haverbeke", "mother": "Emma de Milliano"},
    {"name": "Jan Frans van Brussel", "sex": "m", "born": 1761, "died": 1833, "father": "Jacobus Bernardus van Brussel", "mother":null},
    {"name": "Pauwels van Haverbeke", "sex": "m", "born": 1535, "died": 1582, "father": "N. van Haverbeke", "mother":null},
    {"name": "Clara Aernoudts", "sex": "f", "born": 1918, "died": 2012, "father": "Henry Aernoudts", "mother": "Sidonie Coene"},
    {"name": "Emile Haverbeke", "sex": "m", "born": 1877, "died": 1968, "father": "Carolus Haverbeke", "mother": "Maria Sturm"},
    {"name": "Lieven de Causmaecker", "sex": "m", "born": 1696, "died": 1724, "father": "Carel de Causmaecker", "mother": "Joanna Claes"},
    {"name": "Pieter Haverbeke", "sex": "m", "born": 1602, "died": 1642, "father": "Lieven van Haverbeke", "mother":null},
    {"name": "Livina Haverbeke", "sex": "f", "born": 1692, "died": 1743, "father": "Daniel Haverbeke", "mother": "Joanna de Pape"},
    {"name": "Pieter Bernard Haverbeke", "sex": "m", "born": 1695, "died": 1762, "father": "Willem Haverbeke", "mother": "Petronella Wauters"},
    {"name": "Lieven van Haverbeke", "sex": "m", "born": 1570, "died": 1636, "father": "Pauwels van Haverbeke", "mother": "Lievijne Jans"},
    {"name": "Joanna de Causmaecker", "sex": "f", "born": 1762, "died": 1807, "father": "Bernardus de Causmaecker", "mother":null},
    {"name": "Willem Haverbeke", "sex": "m", "born": 1668, "died": 1731, "father": "Lieven Haverbeke", "mother": "Elisabeth Hercke"},
    {"name": "Pieter Antone Haverbeke", "sex": "m", "born": 1753, "died": 1798, "father": "Jan Francies Haverbeke", "mother": "Petronella de Decker"},
    {"name": "Maria van Brussel", "sex": "f", "born": 1801, "died": 1834, "father": "Jan Frans van Brussel", "mother": "Joanna de Causmaecker"},
    {"name": "Angela Haverbeke", "sex": "f", "born": 1728, "died": 1734, "father": "Pieter Bernard Haverbeke", "mother": "Livina de Vrieze"},
    {"name": "Elisabeth Haverbeke", "sex": "f", "born": 1711, "died": 1754, "father": "Jan Haverbeke", "mother": "Maria de Rycke"},
    {"name": "Lievijne Jans", "sex": "f", "born": 1542, "died": 1582, "father":null, "mother":null},
    {"name": "Bernardus de Causmaecker", "sex": "m", "born": 1721, "died": 1789, "father": "Lieven de Causmaecker", "mother": "Livina Haverbeke"},
    {"name": "Jacoba Lammens", "sex": "f", "born": 1699, "died": 1740, "father": "Lieven Lammens", "mother": "Livina de Vrieze"},
    {"name": "Pieter de Decker", "sex": "m", "born": 1705, "died": 1780, "father": "Joos de Decker", "mother": "Petronella van de Steene"},
    {"name": "Joanna de Pape", "sex": "f", "born": 1654, "died": 1723, "father": "Vincent de Pape", "mother": "Petronella Wauters"},
    {"name": "Daniel Haverbeke", "sex": "m", "born": 1652, "died": 1723, "father": "Lieven Haverbeke", "mother": "Elisabeth Hercke"},
    {"name": "Lieven Haverbeke", "sex": "m", "born": 1631, "died": 1676, "father": "Pieter Haverbeke", "mother": "Anna van Hecke"},
    {"name": "Martina de Pape", "sex": "f", "born": 1666, "died": 1727, "father": "Vincent de Pape", "mother": "Petronella Wauters"},
    {"name": "Jan Francies Haverbeke", "sex": "m", "born": 1725, "died": 1779, "father": "Pieter Bernard Haverbeke", "mother": "Livina de Vrieze"},
    {"name": "Maria Haverbeke", "sex": "m", "born": 1905, "died": 1997, "father": "Emile Haverbeke", "mother": "Emma de Milliano"},
    {"name": "Petronella de Decker", "sex": "f", "born": 1731, "died": 1781, "father": "Pieter de Decker", "mother": "Livina Haverbeke"},
    {"name": "Livina Sierens", "sex": "f", "born": 1761, "died": 1826, "father": "Jan Sierens", "mother": "Maria van Waes"},
    {"name": "Laurentia Haverbeke", "sex": "f", "born": 1710, "died": 1786, "father": "Jan Haverbeke", "mother": "Maria de Rycke"},
    {"name": "Carel Haverbeke", "sex": "m", "born": 1796, "died": 1837, "father": "Pieter Antone Haverbeke", "mother": "Livina Sierens"},
    {"name": "Elisabeth Hercke", "sex": "f", "born": 1632, "died": 1674, "father": "Willem Hercke", "mother": "Margriet de Brabander"},
    {"name": "Jan Haverbeke", "sex": "m", "born": 1671, "died": 1731, "father": "Lieven Haverbeke", "mother": "Elisabeth Hercke"},
    {"name": "Anna van Hecke", "sex": "f", "born": 1607, "died": 1670, "father": "Paschasius van Hecke", "mother": "Martijntken Beelaert"},
    {"name": "Maria Sturm", "sex": "f", "born": 1835, "died": 1917, "father": "Charles Sturm", "mother": "Seraphina Spelier"},
    {"name": "Jacobus Bernardus van Brussel", "sex": "m", "born": 1736, "died": 1809, "father": "Jan van Brussel", "mother": "Elisabeth Haverbeke"}
  ])