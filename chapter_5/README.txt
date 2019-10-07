What I learned:
    + Functions that operate on other functions, either by taking them as
    arguments or by returning them, are called higher-order functions.
    + JavaScript functions have an 'apply' method.
    You pass it an array (or array-like object) of arguments, and it will call
    the function with those arguments.
    + JSON rules: All property names have to be surrounded
    by double quotes, and only simple data expressions are allowed—no
    function calls, variables, or anything that involves actual computation.
    Comments are not allowed in JSON.
    + Standard higher-order functions on arrays: filter, map, reduce.
    + The bind method, which all functions have, creates a new function that
    will call the original function but with some of the arguments already
    fixed.
    + Array method concat() is analogous to concatenation method on strings, it returns new array 
    because function is pure.
    + Every variable has method type() which returns it's type. 