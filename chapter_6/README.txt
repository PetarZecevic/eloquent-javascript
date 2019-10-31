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