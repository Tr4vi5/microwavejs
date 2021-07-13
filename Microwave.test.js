import Microwave from "./Microwave.js"

let microwave

beforeEach(() => {
    microwave = new Microwave()
})

test("microwave can cook and displays decrementing time", async () => {
    console.log = jest.fn()
    microwave.enterDigit(3)
    microwave.start()
    // Give it some time to run (not ideal)
    await new Promise((r) => setTimeout(r, 4000))

    expect(console.log.mock.calls[0][0]).toBe("Entering number *Beep*")
    expect(console.log.mock.calls[1][0]).toBe("00:03")
    expect(console.log.mock.calls[2][0]).toBe("Starting the cook!")
    expect(console.log.mock.calls[3][0]).toBe("00:03")
    expect(console.log.mock.calls[4][0]).toBe("00:02")
    expect(console.log.mock.calls[5][0]).toBe("00:01")
    expect(console.log.mock.calls[6][0]).toBe("00:00")
    expect(console.log.mock.calls[7][0]).toBe("Your food has been nuked!")
})

test("enterDigit validation", async () => {
    console.log = jest.fn()
    // NaN
    microwave.enterDigit("Word")
    // Negative
    microwave.enterDigit(-1)
    // Multiple digits
    microwave.enterDigit(999)
    microwave.start()
    // More than 4 inputs, 0s to keep the test as short as possible
    microwave.enterDigit(0)
    microwave.enterDigit(0)
    microwave.enterDigit(0)
    microwave.enterDigit(1)
    microwave.enterDigit(9)
    microwave.start()

    // Give it some time to run (not ideal)
    await new Promise((r) => setTimeout(r, 3000))
    // This is long, but it hits all the handled exceptions for enterDigit
    // NaN
    expect(console.log.mock.calls[0][0]).toBe("Ignoring last input, please enter a positive single digit")
    // Negative
    expect(console.log.mock.calls[1][0]).toBe("Ignoring last input, please enter a positive single digit")
    // Multiple Digits
    expect(console.log.mock.calls[2][0]).toBe("Ignoring last input, please enter a positive single digit")
    expect(console.log.mock.calls[3][0]).toBe("Please enter a cooking time")
    // More than 4 inputs
    expect(console.log.mock.calls[4][0]).toBe("Entering number *Beep*")
    expect(console.log.mock.calls[5][0]).toBe("00:00")
    expect(console.log.mock.calls[6][0]).toBe("Entering number *Beep*")
    expect(console.log.mock.calls[7][0]).toBe("00:00")
    expect(console.log.mock.calls[8][0]).toBe("Entering number *Beep*")
    expect(console.log.mock.calls[9][0]).toBe("00:00")
    expect(console.log.mock.calls[10][0]).toBe("Entering number *Beep*")
    expect(console.log.mock.calls[11][0]).toBe("00:01")
    expect(console.log.mock.calls[12][0]).toBe("Ignoring last input, can't enter more than 4 digits")
    expect(console.log.mock.calls[13][0]).toBe("Starting the cook!")
    expect(console.log.mock.calls[14][0]).toBe("00:01")
})
