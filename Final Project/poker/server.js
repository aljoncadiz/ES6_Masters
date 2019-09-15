// server.js
import express from 'express';
import PokerDemoController from './src/controllers/poker-demo-controller';
import PokerController from './src/controllers/poker-controller';

const app = express()

app.use(express.json())

app.get('/', (req, res) => {
  return res.status(200).send({'message': 'YAY! Congratulations! Your first endpoint is working'});
})

app.listen(3000)
console.log('app running on port ', 3000);

app.post('/api/poker-demo', PokerDemoController.getAllCombinations);
app.post('/api/poker', PokerController.getAllCombinations);
app.post('/api/poker/win', PokerController.getWinner);