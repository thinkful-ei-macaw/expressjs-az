const express = require('express');
const morgan = require('morgan');

const app = express();
app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.send('Hello Hello!');
});

app.get('/burgers', (req, res) => {
  res.send('We have juicy bacon cheese burgers!');
});

app.get('/echo', (req, res) => {
  const responseText = `Here are some details of your request:
    IP: ${req.ip}
    Params: ${req.params}
    Path: ${req.path}
  `;
  res.send(responseText);
});

app.get('/queryViewer', (req, res) => {
  console.log(req.query);
  res.end(); //do not send any data back to the client
});

app.get('/greetings', (req, res) => {
  //1. get values from the request
  const name = req.query.name;
  const race = req.query.race;

  //2. validate the values
  if(!name) {
    //3. name was not provided
    return res.status(400).send('Please provide a name');
  }

  if(!race) {
    //3. race was not provided
    return res.status(400).send('Please provide a race');
  }

  //4. and 5. both name and race are valid so do the processing.
  const greeting = `Greetings ${name} the ${race}, welcome to our kingdom.`;

  //6. send the response 
  res.send(greeting);
});





// ***** ASSIGNMENT *****

// 1. 
app.get('/sum', (req, res) => {
  const numA = req.query.a;
  const numB = req.query.b;

  const sum = parseInt(numA) + parseInt(numB);

  const statement = `The sum of ${numA} and ${numB} is ${sum}.`;

  res.send(statement);

});


// 2. 

app.get('/cipher', (req, res) => {
  const { text, shift } = req.query;
  
  if(!text) {
    return res
      .status(400)
      .send('text is required');
  }

  if(!shift) {
    return res
      .status(400)
      .send('shift is required');
  }

  const numShift = parseFloat(shift);

  if(Number.isNaN(numShift)) {
    return res
      .status(400)
      .send('shift must be a number');
  }

  // Everything is valid so now we can perform task
  const changeToCharCode = text.split('').map(letter => {
    return letter.toLowerCase().charCodeAt(0) + Number(shift);
  });

  const cipherString = changeToCharCode.map(number => {
    if (number > 122) {
      let diff = number - 123;
      return String.fromCharCode(97 + diff);
    } else {
      return String.fromCharCode(number);
    }
  });

  res.send(cipherString.join(''));
});


// 3. Lotto end point

app.get('/lotto', (req, res) => {
  const { numbers } = req.query;
  // console.log(numbers);
  if(!numbers) {
    return res
      .status(400)
      .send('numbers is required');
  }

  if(!Array.isArray(numbers)) {
    return res
      .status(400)
      .send('numbers must be an array');
  }

  const verifiedNumbers = numbers
    .map(n => parseInt(n))
    .filter(n => !Number.isNaN(n) && (n >= 1 && n<= 20));
  // console.log(verifiedNumbers);
  
  if(verifiedNumbers.length !== 6) {
    return res
      .status(400)
      .send('numbers must contain 6 integers between 1 and 20');
  }

  // number entries are now Validated
  let winningNumbers = [];

  while (winningNumbers.length <= 6) {
    winningNumbers.push(Math.floor(Math.random() * 20));
  }

  // compare the two arrays of numbers
  let matchingNumbers = winningNumbers.filter(n => verifiedNumbers.includes(n));

  let responseStatement;

  matchingNumbers.length < 4 ? responseStatement = 'Sorry you lose.' : 
    matchingNumbers.length === 4 ? responseStatement = 'Congrats, you won a free ticket.' : 
      matchingNumbers.length === 5 ? responseStatement = 'Congrats! You won $100!' : responseStatement = 'Wow! Unbelievable! You could have won the mega millions!';



  res.send(responseStatement);
});


app.listen(8000, () => {
  console.log('Express server is listening on port 8000!');
});