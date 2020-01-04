function main(){
    console.log('\nProject: Electronic life')
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