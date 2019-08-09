What I learned:
	- Indexing array with negative numbers, or numbers bigger than array size
	returns undefined value.
	- Array has push,pop methods and length property.
	- Values of the type object are arbitrary collections of properties, and
	we can add or remove these properties as we please.
	- If we try to access property that object doesn't have, undefined value is
	returned.
	- Object properties are written in JSON(Java Script Object Notation) format.
	- Properties whose names are not valid variable names or valid numbers
	have to be quoted.
	- The binary 'in' operator, when applied to a string and an object, returns a
	Boolean value that indicates whether that object has that property.
	- Arrays are just a kind of object specialized for storing sequences
	of things.
	- If property names are numbers you must use operator [] instead object_name.property_name.
	- To access property with operator [] you must type object_name["property_name"], numbers are
	exceptions, example: myObject[1], myObject["name"].
	- Numbers,strings and Booleans are immutable.
	- Arrays have an indexOf method that tries to find a given value
	in the array and returns the index at which it was found or -1 if it wasn’t found.
	- Array method lastIndexOf works as indexOf with modification that
	it starts the search from the last element of the array.
	- Another arrays methods are: shift, unshift, slice and concat.
	- Whenever a function is called, a special variable named 'arguments' is added
	to the environment in which the function body runs. This variable refers
	to an object that holds all of the arguments passed to the function.
	- You can define variable with a name that is already taken, and JavaScript won't warn you.
	- Math.random() returns pseudorandom number between zero (inclusive) and one (exclusive).
	- In browsers, the global scope object is stored in the 'window' variable.
	- Methods are functions that live in properties and (usually) act on the value they are a property of.
