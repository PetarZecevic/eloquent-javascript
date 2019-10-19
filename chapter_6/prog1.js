// Methods.
function example1(){
    console.log('\nMethods\n')

    var rabbit = {}
    rabbit.speak = function(line){
        console.log('The rabbit says "' + line + '"')
    }
    rabbit.speak("I'm alive.")

    function speak(line){
        console.log('The ' + this.type + ' rabbit says "' + line + '"')
    }

    var whiteRabbit = {type: 'white', speak: speak}
    var fatRabbit = {type: 'fat', speak: speak}

    whiteRabbit.speak(' Oh my ears and whiskers , ' + ' how late it\'s getting !')
    fatRabbit.speak('I could sure use a carrot right now.')
    speak('Bye!')

    // Function methods: 'call', 'apply' and 'bind'.
    // Takes array of arguments.
    speak.apply(fatRabbit, ['Burp!'])
    // Takes aguments normally.
    speak.call({type: 'old'}, 'Oh my.')
    // Fix function arguments.
    speakFixed = speak.bind({type: 'fast'}, 'I am athlete.')
    speakFixed()
}