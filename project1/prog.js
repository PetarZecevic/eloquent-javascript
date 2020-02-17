function main(){
    console.log('\nProject: Electronic life')
}

var plan = [
    '############################', 
    '#        #   #   o        ##', 
    '#                          #', 
    '#          #####           #', 
    '##     #   #       ##      #', 
    '###   ##         #         #', 
    '#          ###  #          #', 
    '#     ####                 #', 
    '#      ##     o            #', 
    '# o    #        o      ### #', 
    '#      #                   #', 
    '############################'];

    // Representing space.
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


// Representing grid.
/**
 * Two-dimensional matrix(grid) where each element represents
 * one part of the world's space.
 * @param {number of columns} width 
 * @param {number of rows} height 
 */
function Grid(width, height){
    this.space = new Array(width * height)
    this.width = width
    this.height = height
}

/**
 * Check if a vector is located inside of grid.
 */
Grid.prototype.isInside = function(vector){
    return vector.x >= 0 && vector.x < this.width &&
        vector.y >= 0 && vector.y < this.height
}

/**
 * Get a value from the grid at vector location.
 */
Grid.prototype.get = function(vector){
    return this.space[vector.x + this.width * vector.y]
}

/**
 * Set a value in the grid at a vector location.
 */
Grid.prototype.set = function(vector, value){
    this.space[vector.x + this.width * vector.y] = value
}

function testGrid(){
    console.log('\nTesting Grid class')
    var grid = new Grid(5, 5)
    
    console.log('Test "set" and "get" methods')
    console.log(grid.get(new Vector(1,1)))
    grid.set(new Vector(1,1), '#')
    console.log(grid.get(new Vector(1,1)))
    
    console.log('Test "isInside" method')
    console.log(grid.isInside(new Vector(1,1)))
    console.log(grid.isInside(new Vector(0,-1)))
    console.log(grid.isInside(new Vector(5,3)))
}

// Critter's programming interface //

var directions = {
    "n" : new Vector(0, -1),
    "ne" : new Vector(1, -1),
    "e" : new Vector(1, 0),
    "se" : new Vector(1, 1),
    "s" : new Vector(0, 1),
    "w" : new Vector(-1, 0),
    "nw" : new Vector(-1, -1),
    "sw" : new Vector(-1, 1)
}

function randomElement(array){
    return array[Math.floor(Math.random() * array.length)]
}

var directionNames = 'n ne e se s w nw sw'.split(' ')

/**
 * Dummy critter that just follows its nose until it hits
 * an obstacle and then bounces off in a random open direction.
 */
function BouncingCritter() {
    this.direction = randomElement(directionNames)
}

/**
 * Returns an action based on the inspection of it's surroundings.
 * @param {represents critter's vision} view
 */
BouncingCritter.prototype.act = function(view) {
    if (view.look(this.direction) != ' ')
        this.direction = view.find(' ') || 's'
    return {type: 'move', direction: this.direction}
}

// The world object //

/**
 * Creating map element(character) object based on the {legend}.
 * The {legend} object contains constructor for every character.
 * @param {object that tells us what each characted in the map means} legend 
 * @param {character from the map} ch 
 */
function elementFromChar(legend, ch) {
    if(ch == ' ')
        return null
    var element = new legend[ch]()
    element.originChar = ch
    return element
}

/**
 * Object represnting world where critters live.
 * World is build based on the array of strings representing
 * the world's grid.
 * Assumptions is that {map} is in form of matrix, precisely said
 * each string has same width.
 * @param {array of strings} map
 * @param {described earlier} legend
 */
function World(map, legend) {
    var grid = new Grid(map[0].length, map.length)
    this.grid = grid
    this.legend = legend

    map.forEach(function(line, y){
        for(var x = 0; x < line.length; x++){
            grid.set(new Vector(x, y), elementFromChar(legend, line[x]))
        }
    })
}

function charFromElement(element) {
    if(element == null)
        return " "
    else 
        return element.originChar
}

/**
 * Build a maplike string from the world's current state 
 * by performing a two-dimensional loop over the squares
 * on the grid.
 */
World.prototype.toString = function() {
    var output = ""
    for(var y = 0; y < this.grid.height; y++){
        for(var x = 0; x < this.grid.width; x++){
            var element = this.grid.get(new Vector(x, y))
            output += charFromElement(element)
        }
        output += '\n'
    }
    return output
}

// A simple object that is used for taking up space and has no 'act' method.
function Wall() {}

function testWorld(){
    console.log('\nTesting World class\n')
    console.log('Test "toString" method')
    var world = new World(plan, {'#' : Wall,
                                'o': BouncingCritter})
    console.log(world.toString())    
}

// This and it's scope
var testScopeObject = {
    prop: 10,
    addPropTo: function(array){
        return array.map(function(elt){
            return this.prop + elt
        }.bind(this))
    }
}

function testScope(){
    console.log('Testing scope: ' + testScopeObject.addPropTo([5]))
}

// Our own higher-order function.
Grid.prototype.forEach = function(f, context){
    for(var y = 0; y < this.height; y++){
        for(var x = 0; x < this.width; x++){
            var value = this.space[x + y * this.width]
            if(value != null){
                f.call(context, value, new Vector(x, y))
            }
        }
    }
}

// Animating life.
/**
 * Method that goes over the grid using for each method
 * that we defined, looking for objects with an act method.
 * When it finds one, it calls that method to get an action object
 * and carries out the action when it is valid.
 */
World.prototype.turn = function() {
    // Helper variable to remember which critters already acted. 
    var acted = [] 
    this.grid.forEach(function(critter , vector) { 
        if (critter.act && acted.indexOf(critter) == -1) { 
            acted.push(critter) 
            this.letAct(critter , vector) 
        } 
    }, this)
}

/**
 * Contains the actual logic that allows the critters to move.
 * @param {} critter
 * @param {} vector
 */
World.prototype.letAct = function(critter, vector){
    var action = critter.act(new View(this, vector))
    if(action && action.type == 'move'){
        var dest = this.checkDestination(action, vector)
        if(dest && this.grid.get(dest) == null){
            this.grid.set(vector, null)
            this.grid.set(dest, critter)
        }
    }
}

/**
 * Checking whether action is valid and
 * next move is inside of the grid.
 * @param {} action
 * @param {} vector
 */
World.prototype.checkDestination = function(action, vector){
    if(directions.hasOwnProperty(action.direction)){
        var dest = vector.plus(directions[action.direction])
        if(this.grid.isInside(dest))
            return dest
    }
}

// View object

function View(world, vector){
    this.world = world
    this.vector = vector
}

/**
 * Figures out the coordinates that we are trying to look at and, 
 * if they are inside the grid, finds the character corresponding to 
 * the element that sits there. 
 * For coordinates outside the grid, look simply pretends that there 
 * is a wall there so that if you define a world that isn’t walled in, 
 * the critters still won’t be tempted to try to walk off the edges.
 * @param {} dir
 */
View.prototype.look = function(dir) {
    var target = this.vector.plus(directions[dir])
    if (this.world.grid.isInside(target)) 
        return charFromElement(this.world.grid.get(target))
    else 
        return "#"
}

/**
 * Find all directions where the character is located.
 * @param {} ch
 */
View.prototype.findAll = function(ch){
    var found = []
    for (var dir in directions) 
        if (this.look(dir) == ch) 
            found.push(dir)
    return found
}

/**
 * Finds and pick one random directions for the directions
 * where the character is located.
 * @param {} ch
 */
View.prototype.find = function(ch) {
    var found = this.findAll(ch)
    if(found.length == 0)
        return null
    return randomElement(found)
}

function firstLife(){
    console.log('First simulation of bouncing critters')
    var world = new World(plan, 
            {'#' : Wall,
            'o': BouncingCritter})
    for(var i = 0; i < 5; i++){
        world.turn()
        console.log(world.toString())
    }
}