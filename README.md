# aoc2021

Solutions for the Advent of Code 2021 in Typescript with custom React calendar.  
Includes a web app and a console runner. Check out the web app at <https://sanraith.github.com/aoc2021>

## Local repository setup

Run `git clone https://github.com/sanraith/aoc2021` to clone the repository.  
Run `npm install` to download dependencies.

## Running the web app

Run `npm run web` to run the React web app locally.

## Running solutions in the console

Run `npm start` to solve all days.  
Run `npm start -- --day 2 3` to solve day 2 and 3.  
Run `npm start -- --last` to solve the last available day.  
Run `npm start -- --help` to display all available options.

## Debugging

Visual Studio Code configuration is set up to attach to the latest solution on debug.  
You can also run `npm run dev` to start a nodemon process for the latest solution.

## Scaffolding

This project only contacts [adventofcode.com](https://adventofcode.com) when the you
explicitly issue one of the below commands. It makes exactly the same amount of requests
as one would do manually within a browser.  
Provide your session key in `util/session.json` if you want to fetch the puzzle title and input.

```json
// util/session.json
{
    "sessionKey": "YOUR_SESSION_KEY_HERE"
}
```

Run `npm run scaffold` to scaffold code for the next available day.  
Run `npm run scaffold -- 11` to scaffold code for the day 11.  
Run `npm run scaffold -- 2 3 4 --year 2019` to scaffold code for the day 2, 3 and 4 from year 2019.  
Run `npm run scaffold -- --help` to display all available options.
