function numbers()
{
    console.log('\nNumbers')
    console.log('9.81 : ', 9.81)
    console.log('Infinity : ', Infinity)
    console.log('-Infinity : ', -Infinity)
    console.log('2.08e5 : ', 2.08e5)
    console.log('1/0 : ', 1/0)
    console.log('4 % 2 : ', 4 % 2)
}

function strings()
{
    console.log('\nStrings')
    console.log("First String")
    console.log('Second String')
    console.log('My name is James Bond\n')
    console.log('A newline character is written as \"\\n\"')
    console.log("'con' + 'ca' + 'te' + 'nate' : ", 'con' + 'ca' + 'te' + 'nate')
}

function unaryOperators()
{
    console.log('\nUnary operators')
    console.log('typeof 5 :', typeof 5)
    console.log('typeof 5.55 :', typeof 5.55)
    console.log("typeof 'x' : ", typeof 'x')
    console.log('typeof "y" : ', typeof "y")
    console.log('typeof Infinity : ', typeof Infinity)
    console.log('-(4**2) : ', -(4**2))
}

function booleans()
{
    console.log('\nBooleans')
    console.log('3 > 2 : ', 3 > 2)
    console.log('3 <= 2 : ', 3 <= 2)
    console.log('!true : ', !true)
    console.log("'abc' > 'bbc' : ", 'abc' > 'bbc')
    console.log ("'Itchy' != 'Scratchy' : ", 'Itchy' != 'Scratchy')
    console.log('NaN == NaN : ', NaN == NaN)
}

function ternaryOperator()
{
    console.log('\nTernary operators')
    console.log('true ? 1 : 2 => ', true ? 1 : 2)
    console.log('false? 1 : 2 => ', false? 1 : 2)
}

function undefinedValues()
{
    console.log('\nUndefined Values')
    console.log('null : ', null)
    console.log('undefined : ', undefined)
}

function automaticTypeConversion()
{
    console.log('\nAutomatic type conversion')
    console.log('8 * null : ', 8 * null)
    console.log('"5" - 1 : ', "5" - 1)
    console.log('"5" + 1 : ', "5" + 1)
    console.log('"five" * 2 : ', "five" * 2)
    console.log('false == 0 : ', false == 0)
    console.log('null == undefined : ', null == undefined)
    console.log('null == 0 : ', null == 0)
    console.log('To defend from automatic type conversion use "===" or "!=="')
    console.log('false === 0 : ', null === 0)
    console.log('"" != 0 : ', "" != 0)
    console.log('"" !== 0 : ', "" !== 0)
}

function logicalOperators()
{
    console.log('\nLogical Operators')
    console.log("null || 'user' : ", null || 'user')
    console.log("'Karl' || 'user' : ", 'Karl' || 'user')
}