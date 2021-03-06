// Methods.
function example1(){
    console.log('\nMethods\n')

    var rabbit = {}
    rabbit.speak = function(line){
        console.log('The rabbit says "' + line + '"')
    }
    rabbit.speak("I'm alive.")

    function speak(line){
        console.log('The ' + this.type + ' rabbit says "' + line + '"')
    }

    var whiteRabbit = {type: 'white', speak: speak}
    var fatRabbit = {type: 'fat', speak: speak}

    whiteRabbit.speak(' Oh my ears and whiskers , ' + ' how late it\'s getting !')
    fatRabbit.speak('I could sure use a carrot right now.')
    speak('Bye!')

    // Function methods: 'call', 'apply' and 'bind'.
    // Takes array of arguments.
    speak.apply(fatRabbit, ['Burp!'])
    // Takes aguments normally.
    speak.call({type: 'old'}, 'Oh my.')
    // Fix function arguments.
    speakFixed = speak.bind({type: 'fast'}, 'I am athlete.')
    speakFixed()
}

// Prototypes.
function example2(){
    console.log('\nPrototypes\n')
    var empty = {}
    console.log(empty.toString)
    console.log(empty.toString())
    // Prototype for all objects.
    console.log(Object.getPrototypeOf({}) == Object.prototype)
    console.log(Object.getPrototypeOf(isNaN) == Function.prototype)
    console.log(Object.getPrototypeOf(Function.prototype) == Object.prototype)
    console.log(Object.getPrototypeOf([]) == Array.prototype)
    console.log(Object.getPrototypeOf(Array.prototype) == Object.prototype)

    var protoRabbit = {
        speak: function(line){
            console.log('The ' + this.type + ' rabbit says "' + line + "'")
        }
    }

    var killerRabbit = Object.create(protoRabbit)
    killerRabbit.type = 'Killer'
    killerRabbit.speak('Ready for action!')
    console.log(Object.getPrototypeOf(killerRabbit) == protoRabbit)
}

// Constructors.
function example3(){
    console.log('\nConstructors')

    function Rabbit(type){
        this.type = type
    }

    var killerRabbit = new Rabbit("killer")
    var blackRabbit = new Rabbit("black rabbit")

    console.log(killerRabbit.type)
    console.log(blackRabbit.type)

    // Add method to class, by defining method.
    Rabbit.prototype.speak = function(line){
        console.log('The ' + this.type + ' rabbit says ' + line + '!')
    }

    blackRabbit.speak('Doom...')
}

// Overriding derived properties
function example4(){
    console.log('\nOveriding derived properties')

    function Car(type){
        this.type = type
    }

    var bmwCar = new Car('BMW')
    var audiCar = new Car('AUDI')

    Car.prototype.price = 20000
    console.log('BMW price: ' + bmwCar.price)
    bmwCar.speedLimit = 50000
    console.log('BMW speed limit: ' + bmwCar.speedLimit)
    console.log('Audi speed limit: ' + audiCar.speedLimit)

    console.log(Array.prototype.toString == Object.prototype.toString)
    console.log([1,2,3].toString())
    console.log(Object.getPrototypeOf([1,2,3]).toString.call([1,2]))
    console.log(Object.prototype.toString.call([1,2]))
}

// Prototype interference
function example5(){
    console.log('\nPrototype interference')

    // Class.
    function Rabbit(type){
        this.type = type
    }

    Rabbit.prototype.speak = function(line){
        console.log('The ' + this.type + ' rabbit says ' + line + '!')
    }

    // Instance of the class.
    whiteRabbit = new Rabbit('White')
    whiteRabbit.speak()

    // Adding new method to the class.
    Rabbit.prototype.dance = function(){
        console.log('The ' + this.type + ' rabbit dances a jig.')
    }
    whiteRabbit.dance()

    // Prototype fields gettting in a way.
    console.log('\n')
    var map = {}
    function storeEvent(event, probability){
        map[event] = probability
    }

    storeEvent('A', 0.1)
    storeEvent('B', 0.3)

    // Enumerable property.
    Object.prototype.nonsense = 0.3
    for(var event in map){
        console.log(event)
    }
    console.log('nonsense' in map)
    console.log('toString' in map)
    delete Object.prototype.nonsense

    // Define nonenumerable property so that it doesn't show up in the for/in loop.
    console.log('\n')
    Object.defineProperty(Object.prototype, 'hiddenNonsense', {enumerable: false, value: 'hi'})
    console.log(Object.prototype.hiddenNonsense)
    for(event in map){
        console.log(event)
    }
    console.log(map.hiddenNonsense)

    // Check if our object has the property, without checking the prototypes.
    console.log(map.hasOwnProperty('hiddenNonsense'))
    console.log(map.hasOwnProperty('toString'))

    // Recommended way of writing for/in loops.
    console.log('\n')
    Object.prototype.p1 = '1'
    Object.prototype.p2 = '2'
    for(var name in map){
        if(map.hasOwnProperty(name)){
            console.log(name)
        }
    }
}

// Prototype-less objects
function example6(){
    console.log('\nPrototype-less objects')

    // Creating the object without the prototype.
    var map = Object.create(null)
    map['pizza'] = 500
    map['cake'] = 1000
    console.log('toString' in map)
    console.log('pizza' in map)
}

// Polymorphism
function example7(){
    console.log('\nPolymorphism - Example of laying out a table')

    /**
     * Calculates the list of the values that represent,
     * a minimum height required to draw each of the rows. 
     * @param {matrix of cells} rows 
     */
    function rowHeights(rows){
        return rows.map(function(row){
            return row.reduce(function(max, cell){
                return Math.max(max, cell.minHeight())
            }, 0)
        })
    }

    /**
     * Calculates the list of the values that represent,
     * a minimum width required to draw each of the columns. 
     * @param {A matrix of cells} rows 
     */
    function colWidths(rows){
        /**
         * Using a variable name starting with an underscore (_) or consisting
         * entirely of a single underscore is a way to indicate (to human readers)
         * that this argument is not going to be used.
         */
        return rows[0].map(function(_, i){
            // The second argument 'i' represents the index of the current element. 
            return rows.reduce(function(max, row){
                return Math.max(max, row[i].minWidth())
            }, 0)    
        })
    }

    /**
     * Draws a complete table by drawing each cell.
     * @param {A matrix of cells} rows 
     */
    function drawTable(rows){
        var heights = rowHeights(rows) 
        var widths = colWidths(rows)

        function drawLine(blocks, lineNo){
            return blocks.map(function(block){
                return block[lineNo]
            }).join(" ")
        }

        function drawRow(row, rowNum){
            var blocks = row.map(function(cell, colNum){
                return cell.draw(widths[colNum], heights[rowNum])
            })
            /**
             * Blocks that are in the same row have equal height,
             * which means they have the same number of lines.
             */
            return blocks[0].map(function(_, lineNo){
                return drawLine(blocks, lineNo)
            }).join("\n")     
        }
        return rows.map(drawRow).join("\n")
    }

    /**
     * Builds a string whose value is the {string} argument 
     * repeated {times} number of times.
     * @param {base string} string 
     * @param {determines how many times to concatenate} times 
     */
    function repeat(string, times){
        var result = ''
        for(let i = 0; i < times; i++){
            result += string
        }
        return result
    }

    /**
     * Constructor for cells that contain text, which implements 
     * the interface for table cells.
     * @param {text that will be diplayed inside of the cell} text 
     */
    function TextCell(text){
        this.text = text.split("\n")
    }

    /**
     * Returns a number representing this cell's minimum width 
     * (in characters).
     */
    TextCell.prototype.minWidth = function minWidth(){
        return this.text.reduce(function(max, line){
            return Math.max(max, line.length)
        }, 0)
    }

    /**
     * Returns a number representing the minimum height this cell 
     * requires (in lines).
     */
    TextCell.prototype.minHeight = function (){
        return this.text.length
    }

    /**
     * Return an array of length {height}, which contatins a series of strings
     * that are each {width} character wide.
     * This array represents the content of the cell.
     * @param {width of each row-string inside of cell} width 
     * @param {number of cell rows} height 
     */
    TextCell.prototype.draw = function(width, height){
        var result = []
        for(let i = 0; i < height; i++){
            // For the case wheere there are no required lines in text.
            var line = this.text[i] || ""
            // Function {repeat} is used to add padding if it is required.
            result.push(line + repeat(" ", width - line.length))
        }
        return result
    }

    // Example of 5x5 checkerboard.
    console.log('Test #2')
    var rows = []
    for(let i = 0; i < 5; i++){
        var row = []
        for(let j = 0; j < 5; j++){
            if((j + i) % 2 == 0)
                row.push(new TextCell('##'))
            else
                row.push(new TextCell('  '))
        }
        rows.push(row)
    }
    console.log(drawTable(rows))

    /**
     * Cell that underlines {TextCell} text.
     * This cell is intented for table headers.
     * @param {TextCell that represents text that will be underlined} inner
     */
    function UnderlinedCell(inner){
        this.inner = inner
    }

    UnderlinedCell.prototype.minWidth = function(){
        return this.inner.minWidth()
    }

    UnderlinedCell.prototype.minHeight = function(){
        return this.inner.minHeight() + 1
    }

    UnderlinedCell.prototype.draw = function(width, height){
        return this.inner.draw(width, height - 1)
            .concat([repeat('-', width)])
    }

    console.log('Test #1')
    testUnderlindedCell = new UnderlinedCell(new TextCell('AAAAA'))
    console.log('underlinned cell', testUnderlindedCell.minHeight(), testUnderlindedCell.minWidth())
    testTable1 = [[testUnderlindedCell]] 
    console.log('table', rowHeights(testTable1), colWidths(testTable1))

    console.log('Test #3')
    table = []
    // Header.
    headerTitle = ['City', 'Population']
    header = []
    for(let i = 0; i < headerTitle.length; i++)
        header.push(new UnderlinedCell(new TextCell(headerTitle[i])))
    table.push(header)
    // Cities paired with their population number.
    city_map = {
        'Novi Sad' : '289128',
        'Beograd' : '1374000',
        'Sabac' : '53155',
        'Kragujevac' : '150850',
        'Loznica' : '8967'
    }
    for(city in city_map){
        if(city_map.hasOwnProperty(city)){
            table.push([new TextCell(city), new TextCell(city_map[city])])
        }
    }
    console.log(drawTable(table))    
}

// Getters and setters.
function example8(){
    console.log('\nGetters and setters')

    pilePrototype = {
        elements: ['egshell', 'orange peel', 'worm'],
        get height() {
            return this.elements.length
        },
        set height(value) {
            console.log('Ignoring attempt to set height to', value)
        }
    }

    var pile = Object.create(pilePrototype)
    console.log(pile.height)
    pile.height = 0
    console.log(pile.height)

    Object.defineProperty(Object.getPrototypeOf(pile), "fitProp", {
        get: function() {return this.elements[0]}
    })
    
    console.log(pile.fitProp)
}

// Inheritance.
function example9(){
    console.log('\nInheritance')

    /**
     * Base class that represents one subject in school.
     * @param {name of the subject} name 
     */
    function Subject(name){
        this.name = name
    }

    Subject.prototype.description = function(){
        console.log('This subject is ' + this.name)
    }

    baseSubject = new Subject('History')
    baseSubject.description()

    /**
     * Subject from math science.
     * @param {represent math department} category 
     */
    function MathSubject(category){
        Subject.call(this, 'Math')
        this.category = category
    }

    MathSubject.prototype = Object.create(Subject.prototype)
    // Overriding base class method.
    MathSubject.prototype.description = function(){
        Subject.prototype.description.call(this)
        console.log('Category : ' + this.category)
    }

    mathSubject = new MathSubject('Algebra')
    mathSubject.description()
}

// The instanceof operator.
function example10(){
    console.log('\nThe instanceof operator')

    console.log([1] instanceof Array)
    console.log('baba' instanceof String)

    var s = new String('baba')
    
    console.log(s instanceof String)

    function DummyClass(){
        this.prop = 'dummy'
    }
    var dummy = new DummyClass()

    console.log(dummy instanceof Array)
    console.log(dummy instanceof DummyClass)
    console.log(dummy instanceof Object)
}

// Vector.
function exercise1(){
    console.log('\nVector - exercise 1')

    /**
     * Class representing 2D vector.
     * @param {first value(coordinate)} x 
     * @param {second value(coordinate)} y 
     */
    function Vector(x, y){
        this.x = x
        this.y = y
    }

    /**
     * Method used to add one vector to another by adding correspodent values
     * and storing them in the new vector.
     * Return value is the new vector.
     */
    Vector.prototype.plus = function(vector){
        return new Vector(this.x + vector.x, this.y + vector.y)
    }

    /**
     * Method used to subtract one vector from another by subtracting correspodent values
     * and storing them in the new vector.
     * The return value is the new vector.
     */
    Vector.prototype.minus = function(vector){
        return new Vector(this.x - vector.x, this.y - vector.y)
    }

    /**
     * Calculates the euclidean vector distance from the origin point of the same dimension the vector.
     */
    Object.defineProperty(Vector.prototype, 'length', {
        get: function(){
            return Math.sqrt(this.x**2 + this.y**2)
        }
    })

    /**
     * Method used to pretty print vector properties.
     */
    Vector.prototype.print = function(){
        console.log('[', this.x, this.y, ']', 'length:', this.length)
    }

    var vec = new Vector(1,2)
    vec.print()

    var result = vec.plus(new Vector(2,2))
    result.print()

    result = vec.minus(new Vector(0, 5))
    result.print()
    
}

// Another cell.
function exercise2(){
    console.log('\nAnother cell - exercise 2')

    /**
     * Calculates the list of the values that represent,
     * a minimum height required to draw each of the rows. 
     * @param {matrix of cells} rows 
     */
    function rowHeights(rows){
        return rows.map(function(row){
            return row.reduce(function(max, cell){
                return Math.max(max, cell.minHeight())
            }, 0)
        })
    }

    /**
     * Calculates the list of the values that represent,
     * a minimum width required to draw each of the columns. 
     * @param {A matrix of cells} rows 
     */
    function colWidths(rows){
        /**
         * Using a variable name starting with an underscore (_) or consisting
         * entirely of a single underscore is a way to indicate (to human readers)
         * that this argument is not going to be used.
         */
        return rows[0].map(function(_, i){
            // The second argument 'i' represents the index of the current element. 
            return rows.reduce(function(max, row){
                return Math.max(max, row[i].minWidth())
            }, 0)    
        })
    }

    /**
     * Builds a string whose value is the {string} argument 
     * repeated {times} number of times.
     * @param {base string} string 
     * @param {determines how many times to concatenate} times 
     */
    function repeat(string, times){
        var result = ''
        for(let i = 0; i < times; i++){
            result += string
        }
        return result
    }

    /**
     * Draws a complete table by drawing each cell.
     * @param {A matrix of cells} rows 
     */
    function drawTable(rows){
        var heights = rowHeights(rows) 
        var widths = colWidths(rows)

        function drawLine(blocks, lineNo){
            return blocks.map(function(block){
                return block[lineNo]
            }).join(" ")
        }

        function drawRow(row, rowNum){
            var blocks = row.map(function(cell, colNum){
                return cell.draw(widths[colNum], heights[rowNum])
            })
            /**
             * Blocks that are in the same row have equal height,
             * which means they have the same number of lines.
             */
            return blocks[0].map(function(_, lineNo){
                return drawLine(blocks, lineNo)
            }).join("\n")     
        }
        return rows.map(drawRow).join("\n")
    }

    /**
     * Constructor for cells that contain text, which implements 
     * the interface for table cells.
     * @param {text that will be diplayed inside of the cell} text 
     */
    function TextCell(text){
        this.text = text.split("\n")
    }

    /**
     * Returns a number representing this cell's minimum width 
     * (in characters).
     */
    TextCell.prototype.minWidth = function minWidth(){
        return this.text.reduce(function(max, line){
            return Math.max(max, line.length)
        }, 0)
    }

    /**
     * Returns a number representing the minimum height this cell 
     * requires (in lines).
     */
    TextCell.prototype.minHeight = function (){
        return this.text.length
    }

    /**
     * Return an array of length {height}, which contatins a series of strings
     * that are each {width} character wide.
     * This array represents the content of the cell.
     * @param {width of each row-string inside of cell} width 
     * @param {number of cell rows} height 
     */
    TextCell.prototype.draw = function(width, height){
        var result = []
        for(let i = 0; i < height; i++){
            // For the case wheere there are no required lines in text.
            var line = this.text[i] || ""
            // Function {repeat} is used to add padding if it is required.
            result.push(line + repeat(" ", width - line.length))
        }
        return result
    }

    /**
     * Cell that wraps around another cell and ensure that the resulting cell
     * has at least the given {width} and {height}, even if the inner cell would
     * naturally be smaller.
     * @param {cell to wrap around} inner 
     * @param {stretching width} width 
     * @param {stretching height} height 
     */
    function StretchCell(inner, width, height){
        this.inner = inner
        this.width = Math.max(this.inner.minWidth(), width)
        this.height = Math.max(this.inner.minHeight(), height)
    }

    StretchCell.prototype.minWidth = function(){
        return this.width
    }

    StretchCell.prototype.minHeight = function(){
        return this.height
    }

    StretchCell.prototype.draw = function(width, height){
        return this.inner.draw(width, height)
    }

    var table = []
    table.push([new StretchCell(new TextCell("1"), 2, 2), new TextCell("2"), new TextCell("3")])
    table.push([new TextCell("4"), new StretchCell(new TextCell("5"), 3, 1), new TextCell("6")])
    console.log('Test table #1')
    console.log(drawTable(table))

    table = []
    table.push([new TextCell("1"), new StretchCell(new TextCell("222"), 2, 1)])
    table.push([new TextCell("3"), new TextCell("4")])
    console.log('Test table #2')
    console.log(drawTable(table))
}

// Sequence interface.
function exercise3(){
    console.log('\nSequence interface - exercise 3')

    /**
     * Requirements for the process of iteration: 
     *  - beginning of the sequence
     *  - value of the current element in the sequence
     *  - next element in the sequence
     *  - end of the sequence
     */

    /**
     * Interface used to abstract the element of the Sequence. 
     */
    function SequenceElement(){}
    SequenceElement.prototype.getValue = function(){}
    SequenceElement.prototype.next = function(){}
    SequenceElement.prototype.equal = function(iterator){}
    
    /**
     * Interface that abstracts iteration over a collection of values.
     */
    function Sequence(){}
    Sequence.prototype.begin = function(){}
    Sequence.prototype.end = function(){}

    /**
     * Function that calls console.log on the first five elements of the sequence
     * or fewer, if the sequence has fewer than five elements.
     * @param {Object that implements the Sequence interface} sequence 
     */
    function logFive(sequence){
        var counter = 0
        for(var element = sequence.begin(); 
            !element.equal(sequence.end()) && counter < 5;
            element = element.next(), counter += 1){
                console.log(element.getValue())
        }
    }

    /**
     * Wraps an array and allows iteration over the array
     * using the Sequence interface.
     * @param {Array object} array 
     */
    function ArraySeq(array){
        Sequence.call(this)

        /**
         * Represenation of the one element in the array.
         * 
         * @param {Position of the element in the original array} index 
         */
        function ArrayElement(index){
            SequenceElement.call(this)
            this.index = index
        }
        
        ArrayElement.prototype = Object.create(SequenceElement.prototype)
        
        ArrayElement.prototype.getValue = function(){
            return array[this.index]
        }
        
        ArrayElement.prototype.next = function(){
            return new ArrayElement(this.index+1)
        }
        
        ArrayElement.prototype.equal = function(element){
            return this.index == element.index
        }
        
        this.firstElement = new ArrayElement(0)
        this.endElement = new ArrayElement(array.length)
    }

    ArraySeq.prototype = Object.create(Sequence.prototype)

    ArraySeq.prototype.begin = function(){
        return this.firstElement   
    }

    ArraySeq.prototype.end = function(){
        return this.endElement
    }

    function RangeSeq(from, to){
        Sequence.call(this)

        /**
         * Representation of the one element in the range.
         * @param {Value from the range} value 
         */
        function RangeElement(value){
           SequenceElement.call(this)
           this.value = value 
        }

        RangeElement.prototype = Object.create(SequenceElement.prototype)

        RangeElement.prototype.getValue = function(){
            return this.value
        }

        RangeElement.prototype.next = function(){
            return new RangeElement(this.value+1)
        }

        RangeElement.prototype.equal = function(element){
            return this.value == element.value
        }

        this.firstInRange = new RangeElement(from) 
        this.endOfRange = new RangeElement(to+1)
    }

    RangeSeq.prototype = Object.create(Sequence.prototype)

    RangeSeq.prototype.begin = function(){
        return this.firstInRange
    }

    RangeSeq.prototype.end = function(){
        return this.endOfRange
    }

    // Testing
    console.log('Test ArraySeq')
    console.log('Test #1')
    logFive(new ArraySeq([1, 2, 3, 4, 5]))
    console.log('Test #2')
    logFive(new ArraySeq([1, 2, 3, 4]))
    console.log('Test #3')
    logFive(new ArraySeq([1, 2, 3]))
    console.log('Test #4')
    logFive(new ArraySeq([1, 2, 3, 4, 5, 6, 7, 8]))

    console.log('Test RangeSeq')
    console.log('Test #1')
    logFive(new RangeSeq(1, 3))
    console.log('Test #2')
    logFive(new RangeSeq(0, 5))
    console.log('Test #3')
    logFive(new RangeSeq(-2, 2))
    console.log('Test #4')
    logFive(new RangeSeq(1, 10))
}