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