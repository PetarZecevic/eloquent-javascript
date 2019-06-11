What I learned:
	Dividing with zero is supported and expression returns "Infinity".
	Values that can't be evaluted or doesn't have meaningfull value are denoted with "null" or "undefined".
	Strings are immutable.
	Automatic type conversion will try to convert unmeaningfull expression into something meaningfull which can lead
	to uncertainty in result of operations where operands are not the same type.
	To defend from automatic type conversion in boolean expressions,  extended operators "===" and "!==" are used. 
	Arithmetic operations on NaN keep producing NaN.
	"", NaN and 0 evaluate to false in boolean expressions, while all other values to true.
	Short-circuiting of logical operators similair to C-like languages:
		expression "null || 'user'" returns 'user'.
		expression 'Karl' || 'user' returns 'Karl'.