What I learned:
    + The idea is that the interface is relatively simple and all the complex things
    going on inside the object can be ignored when working with it.
    + Methods are simply properties that hold function values.
    + When a function is called as a method the special variable this in
    its body will point to the object that it was called on.
    + 'apply', 'call' and 'bind' are methods that functions have, that means function is treated as object.
    + A prototype is another object that is used as a fallback source of properties. When an object gets
    a request for a property that it does not have, its prototype will be searched for the property, 
    then the prototype’s prototype, and so on.
    + Object.prototype is base prototype of all objects.
    + Object.getPrototypeOf() returns prototype of an object.
    + In JavaScript, calling a function with the new keyword in front of it causes it to be treated as a constructor.
    + The constructor will have its this variable bound to a fresh object, and
    unless it explicitly returns another object value, this new object will be
    returned from the call.
    + A prototype can be used at any time to add new properties and methods
    to all objects based on it.
    + JavaScript distinguishes between enumerable and nonenumerable properties.
    + All properties that we create by simply assigning to them are enumerable.
    + The standard properties in Object.prototype are all nonenumerable,
    which is why they do not show up in such a for/in loop.
    + It is possible to define our own nonenumerable properties by using
    the Object.defineProperty function.
    + The object’s hasOwnProperty method checks if our object has the property, without checking the prototypes.
    + The second parameter in 'map' higher order function can be used to know ordinal numbers of the items 
    we are iterating through.