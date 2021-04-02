# Start Steps
1. Clone the repository with `git clone https://github.com/palmerigarrett/bowl-flight.git`
2. Change your working directory to */bowling*
3. Run `yarn` or `npm install` to install dependencies depending on your preferred package manager.
4. Run `yarn start` or `npm start` to start the application depending on your preferred package manager.

# Testing
1. Check to make sure your working directory is in */bowling*.
2. Depending on your package manager, run `yarn test` or `npm run test`.

The test checks that 'Strike' is a valid input, is clicked, and is returned in the first frame's output.

# TODOs
1. Update model to calculate the total score when a non open frame (a strike in the first roll or a spare in the first 2 rolls) is the input for the 10th frame. Currently, the final score is calculated only if the first 2 rolls of the 10th frame end in an open frame.
2. Update cumulative score on the first roll following a closed frame when necessary instead of waiting until the frame is completed.
