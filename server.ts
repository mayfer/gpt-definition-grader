
import express from 'express';
import cors from 'cors';
import axios from 'axios';
import { GPT3Request, GPT3Response } from './interfaces';

import { createServer } from 'http';
import { Server, Socket } from 'socket.io';
import http from 'http';

const app = express();

const server = http.createServer(app);

const io = require('socket.io')(server);


const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());




// serve static /client under /client
app.use('/client', express.static('client'));

app.get('/', (req: express.Request, res: express.Response) => {
  // render client/defintions.html
  res.sendFile('client/definition.html', { root: __dirname });
});



app.post('/api/gpt_grader', async (req: express.Request, res: express.Response) => {
  const requestBody: GPT3Request = req.body;
  const { topic, text } = requestBody;

  const GPT_3_API_KEY = "xxxxxxxxxxxxxxxxxxxxxxxxxx";
  const model = 'gpt-4'

  const lines = [{
    name: 'system',
    text: `You are a tutor that determines if a student's definition of a concept in their own words is accurate or not.

    It's okay if the student's definition isn't exact, as long as it grasps the general idea. Do not expect the student to use fancy or accurate language.
    
    Respond to each definition with GOOD or TRY_AGAIN, and provide a score out of 10 for the accuracy. Example: "TRY_AGAIN: 2/10" After that, you can provide a one sentence follow-up on the student's definition asking a thought-provoking question about the topic.`
    },
    {
      name: 'user',
      text: `${topic}: "${text}"`
    }
  ]
  try {
    const response = await axios.post('https://api.openai.com/v1/chat/completions', {
      model,
      messages: lines.map((line: Line) => {
        return {
          role: line.name,
          content: line.text
        };
      }),
      max_tokens: 250,
      n: 1,
      stop: null,
      temperature: 0,
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${GPT_3_API_KEY}`
      }
    });

    const gpt3Response: GPT3Response = {
      data: response.data
    };

    const textresponse = response.data.choices[0].message.content;
    res.json({raw: gpt3Response, text: textresponse, request: {topic, text}});
    
    io.emit('message', {raw: gpt3Response, text: textresponse, request: {topic, text}});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while processing the request.' });
  }
});

io.on('connection', (socket: Socket) => {
  console.log('a user connected');
  // socket.emit('message','Welcome to the server!');
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
