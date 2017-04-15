window.addEventListener('load', function () {
  initialize();
});

function initialize() {
  document.getElementById('generate-ipsum').addEventListener('click', function () {
    clearOutput();
    appendIpsumToDom(lotr, 5);
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
  words = checkWords(words);

  var ipsumElements = document.createDocumentFragment();

  var firstParagraphTextNode = getFirstParagraphTextNode(arrayPool, words);
  ipsumElements.appendChild(firstParagraphTextNode);

  for (var i = 1; i < paragraphs; i++) {
    var generatedIpsum = '';
    generatedIpsum += generateIpsum(arrayPool, words);
    generatedIpsum = capitalizeFirstWord(generatedIpsum);

    var pElement = getIpsumParagraph(generatedIpsum);
    
    ipsumElements.appendChild(pElement);
  }

  return ipsumElements;
}

function getIpsumParagraph(content) {
  var pElement = document.createElement('p');
  var tn = document.createTextNode(content);
  pElement.appendChild(tn);
  return pElement;
}

function generateIpsum(arrayPool, words) {
  words = checkWords(words);
  var ipsum = '';

  for (let j = 0; j < words; j++) {
    var poolIndex = Math.floor(Math.random() * arrayPool.length)
    var poolWord = arrayPool[poolIndex];

    ipsum += poolWord;

    //This is so the end of paragraphs don't have an innocuous space
    if (j < words - 1) ipsum += ' ';
    else ipsum += '.'
  }

  return ipsum;
}

function capitalizeFirstWord(word) {
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

function getFirstParagraphTextNode(arrayPool, words) {
  var start = '';
  if (true) {
    start = 'Lorem ipsum dolor ';
  }

  //Generate the first paragraph
  var firstParagraph = start 
  ? start + generateIpsum(arrayPool, words - 3) 
  : capitalizeFirstWord(generateIpsum(arrayPool, words));

  return document.createTextNode(firstParagraph);
}

function checkWords(words) {
  if (words == undefined) return 100;
  else return words;
}