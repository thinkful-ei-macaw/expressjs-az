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


app.listen(8000, () => {
  console.log('Express server is listening on port 8000!');
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


// 3. name
