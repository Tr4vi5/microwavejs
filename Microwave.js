export default class Microwave {
    constructor(){
        this.enterDigit = this.enterDigit.bind(this)
        this.start = this.start.bind(this)
        // Should be private properties (Ran out of time fighting babel)
        this.timerArray = [ 0, 0, 0, 0 ]
        this.inputAmount = 0
        this.tensOfMinutes
        this.minutes
        this.tensOfSeconds
        this.seconds
        this.canCook = false
        this.cook = this.cook.bind(this)
        this.done = this.done.bind(this)
    }

    enterDigit(digit) {
        // Return if input fails some light validation
        if (digit.toString().length > 1  || isNaN(digit) || Math.sign(digit) === -1 ) {
            console.log("Ignoring last input, please enter a positive single digit")
            return null
        } else if (this.inputAmount >= 4){
            console.log("Ignoring last input, can't enter more than 4 digits")
            return null
        }
        this.inputAmount += 1 
        console.log("Entering number *Beep*")
        // Get rid of the first elementy in the timer array and push the digit
        this.timerArray.shift()
        this.timerArray.push(digit)
        // Set our time values from the timerArray
        this.tensOfMinutes = this.timerArray[0]
        this.minutes = this.timerArray[1];
        this.tensOfSeconds = this.timerArray[2]
        this.seconds = this.timerArray[3]
        // Display the digits as they are entered, for fun
        console.log(`${(this.tensOfMinutes) + "" + (this.minutes) + ":" + (this.tensOfSeconds) + "" + (this.seconds)}`)
        this.canCook = true
    }

    start(){
        if (this.canCook && this.tensOfMinutes + this.minutes + this.tensOfSeconds + this.seconds > 0){
            console.log("Starting the cook!")
            this.cook()
        } else {
            console.log("Please enter a cooking time")
            return null
        }
        
    }

    // Should be private Methods (Ran out of time fighting babel)

    cook(){
        // Display time and decrement seconds
        console.log(`${(this.tensOfMinutes) + "" + (this.minutes) + ":" + (this.tensOfSeconds) + "" + (this.seconds--)}`)
        // This is pretty ugly and I would normally avoid this sort of thing, but short on time here.
        // Convert tens of seconds to seconds
        if (this.tensOfSeconds > 0 && this.seconds < 0){
            this.tensOfSeconds --
            this.seconds = 9
            setTimeout(this.cook, 1000)
        } 
        else if (this.tensOfSeconds === 0 && this.seconds < 0) {
            // Convert minutes to seconds
            if (this.minutes > 0){
                this.minutes--
                this.tensOfSeconds = 5
                this.seconds = 9
                setTimeout(this.cook, 1000)
            }
            // Convert tens of minutes to minutes and seconds
            else if (this.minutes === 0 && this.tensOfMinutes > 0){
                this.tensOfMinutes--
                this.minutes = 9
                this.tensOfSeconds = 5
                this.seconds = 9
                setTimeout(this.cook, 1000)
            }
            // If we're all out of time
            else if (this.minutes === 0 && this.tensOfMinutes === 0){
                this.done()
            }
        } 
        else {
            setTimeout(this.cook, 1000)
        }
    }
        
    done(){
        this.timerArray = [0, 0, 0, 0]
        this.tensOfMinutes = this.timerArray[0]
        this.minutes = this.timerArray[1]
        this.tensOfSeconds = this.timerArray[2]
        this.seconds = this.timerArray[3]
        console.log("Your food has been nuked!")
    }
}
