function main(){
    console.log('\nProject: Electronic life')
    console.log(directionNames)
}

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
 * Returns an action based on the ispection of it's surroundings.
 * @param {reprents critter vision} view
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
        line.forEach(function(ch, x){
            grid.set(new Vector(x, y), elementFromChar(legend, ch))
        })
    })
}
