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