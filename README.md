# Microwave Simulator!
This is a small command line microwave simulator written in JavaScript!

![I promise this is a real microwave](https://gfycat.com/esteemedsaltycommongonolek)

## Features
* Can accept four inputs and will ignore subsequent inputs with a message to the user
* Displays a decrementing counter
* Tells you when cooking starts and finishes!

## Setup
Install node >= 15 (Using [nodenv](https://github.com/nodenv/nodenv) or [nvm](https://github.com/nvm-sh/nvm) is recommended)
Install yarn `npm install --global yarn`

Install packages `yarn install`

## Run
You can see it in action with the default values entered in index.js by running `node index.js`
You can also edit the inputs there if you'd like to test other behaviors

## Test
Run the tests with `yarn test`

## Known issues
* There are methods and properties that should be private, the only public properties should be the methods `enterDigit` and `start`.
* You can start the microwave while it's already running, and due to the recursive nature of the timer I couldn't quickly think of an elegant way to prevent that from happening. I'm probably just short on sleep at the moment