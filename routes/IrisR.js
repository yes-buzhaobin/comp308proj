const express = require('express');
const iriss = express.Router();
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

iriss.use(cors());

process.env.SECRET_KEY = 'password';

const tf = require('@tensorflow/tfjs');
require('@tensorflow/tfjs-node');

//loading iris training and testing data
const iris = require('../iris.json');
var irisTesting = require('../iris-testing.json');

// build neural network using a sequential model
const model = tf.sequential();


iriss.post('/train', (req, res) => {
    console.log("training...");

const trainingData = tf.tensor2d(iris.map(item => [
  item.sepal_length, item.sepal_width, item.petal_length, item.petal_width,
]))

const outputData = tf.tensor2d(iris.map(item => [
  item.species === "setosa" ? 1 : 0,
  item.species === "virginica" ? 1 : 0,
  item.species === "versicolor" ? 1 : 0,
]))
 //   console.log(trainingData.dataSyn());


//add the first layer
model.add(tf.layers.dense({
  inputShape: [4],  //four input neurons
  activation: "sigmoid",
  units: 5,   //dimension of output space (first hidden layer)
}))

//add the hidden layer
model.add(tf.layers.dense({
  inputShape: [5],  //dimension of hidden layer
  activation: "sigmoid",
  units: 3, //dimension of final output  (setosa, virginica, versicolor)
}))

////add output layer
model.add(tf.layers.dense({
  activation: "sigmoid",
  units: 3,  //dimension of final output  (setosa, virginica, versicolor)
}))

//compile the model with an MSE loss function and Adam algorithm
model.compile({
  loss: "meanSquaredError",
  optimizer: tf.train.adam(.06),
})
console.log(model.summary());
console.log(trainingData);
console.log(outputData);

//train the model and predict the results for testing data
//
//train/fit the model for the fixed number of epochs
async function run(){

    // train/fit our network
//const startTime = Date.now();
//console.log(trainingData);
await model.fit(trainingData, outputData, 
    {
        epochs: 100,
        callbacks: {
            onEpochEnd: async (epoch, log) =>{
                //lossValue = log.loss;
                //console.log (`Epoch ${epoch}: lossValue = ${log.loss}`);
                //elapsedTime =Date.now() -startTime;
                //console.log ("elapsed time: "+ elapsedTime);
            }
        }
    }).then(res => {
      res.json({ status: 'Trained!'});
    }).catch(err => {
        console.log("Training error. " + err);
        res.send('Fitting error: ' + err);
    })
}; //end of run function

run();

});

iriss.get('/predict', (req, res, next) => {
  console.log(req.query);
  console.log(req.body);
  console.log("predict....");
  irisTesting[0].sepal_length = parseFloat(req.query.sepal_length);
  irisTesting[0].sepal_width = parseFloat(req.query.sepal_width);
  irisTesting[0].petal_length = parseFloat(req.query.petal_length);
  irisTesting[0].petal_width = parseFloat(req.query.petal_width);

  const testingData = tf.tensor2d(irisTesting.map(item => [
    item.sepal_length, item.sepal_width,
    item.petal_length, item.petal_width,
  ]));

  //console.log("irisTesting ="+ irisTesting[0].sepal_length);
  console.log("testingData " + testingData);
  const results = model.predict(testingData);
  console.log('prediction results: ', results.dataSync());
  var temp = results.dataSync();
  var retunrValue = '';
  if(temp[0] > 0.5) 
    retunrValue = "setosa";
  if(temp[1] > 0.5) 
    retunrValue = "virginica";
  if(temp[2] > 0.5) 
    retunrValue = "versicolor";
  res.send(retunrValue);
  //results.print();
 
});

module.exports = iriss;