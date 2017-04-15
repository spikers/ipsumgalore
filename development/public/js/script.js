window.addEventListener('load', function () {
  initialize();
});

function initialize() {
  document.getElementById('generate-ipsum').addEventListener('click', function () {
    clearOutput();
    appendIpsumToDom(hp, 5);
  });
}

function clearOutput() {
  document.getElementById('output').innerHTML = '';
}

function appendIpsumToDom(arrayPool, paragraphs, words) {

  var documentFragment = getIpsumDocumentFragment(arrayPool, paragraphs, words);
  document.getElementById('output').appendChild(documentFragment);
}

function getIpsumDocumentFragment(arrayPool, paragraphs, words) {
  var ipsumElements = document.createDocumentFragment();

  for (var i = 0; i < paragraphs; i++) {
    var generatedIpsum = generateIpsum(arrayPool, paragraphs, words);

    var pElement = document.createElement('p');
    var tn = document.createTextNode(generatedIpsum);

    pElement.appendChild(tn);

    ipsumElements.appendChild(pElement);
  }

  return ipsumElements;
}

function generateIpsum(arrayPool, paragraphs, words) {
  if (words == undefined) words = 100;
  var ipsum = '';

  for (let j = 0; j < words; j++) {
    var poolIndex = Math.floor(Math.random() * arrayPool.length)
    var poolWord = arrayPool[poolIndex];

    //First word of a paragraph is capitalized
    if (j == 0) poolWord = capitalizeWord(poolWord);

    ipsum += poolWord;

    //This is so the end of paragraphs don't have an innocuous space
    if (j < words - 1) ipsum += ' ';

  }

  return ipsum;
}

function capitalizeWord(word) {
  return word[0].toUpperCase() + word.substring(1);
}

function appendToParagraphElement(stringToAppend) {
  var output = document.getElementById('output');
  
  var tn = document.createTextNode(stringToAppend);
  var pElement = document.createElement('p');
  
  pElement.appendChild(tn);
  output.appendChild(pElement);
  return;
}