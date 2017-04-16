window.addEventListener('load', function () {
  initialize();
});

function initialize() {
  // document.getElementById('generate-ipsum').addEventListener('click', function () {
  //   clearOutput();
  //   appendIpsumToDom(lotr, 5, 100);
  // });

  document.getElementById('generate-ipsum').addEventListener('click', function () {
    clearTextAreaOutput();
    addIpsumToTextArea(lotr, 5, 100);
  });  

  document.getElementById('select-ipsum').addEventListener('click', function () {
    document.getElementById('output').select();
  });
}

function clearTextAreaOutput() {
  document.getElementById('output').value = '';
}

function addIpsumToTextArea(arrayPool, paragraphs, words) {
  var ipsumText = getIpsumText(arrayPool, paragraphs, words);
  document.getElementById('output').value = ipsumText;
}

function getIpsumText(arrayPool, paragraphs, words) {
  var ipsumText = '';
  ipsumText += getFirstParagraphContent(arrayPool, words);

  //Handles the edge case of just 1 paragraph
  if (paragraphs > 1) ipsumText += '\n\n';

  for (var i = 1; i < paragraphs; i++) {
    ipsumText += capitalizeFirstWord(generateIpsum(arrayPool, words));

    //This makes it so the end won't have 2 linebreaks needlessly
    if (i < paragraphs - 1) ipsumText += "\n\n";
  }
  return ipsumText;
}

function generateIpsum(arrayPool, words) {
  words = checkWords(words);
  var ipsum = '';

  for (var j = 0; j < words; j++) {
    var poolIndex = Math.floor(Math.random() * arrayPool.length)
    var poolWord = arrayPool[poolIndex];

    ipsum += poolWord;

    //This is so the end of paragraphs don't have an innocuous space
    if (j < words - 1) ipsum += ' ';
    else ipsum += '.'
  }

  return ipsum;
}

function capitalizeFirstWord(content) {
  return content[0].toUpperCase() + content.substring(1);
}

function getFirstParagraphContent(arrayPool, words) {
  var start = '';
  if (false) {
    start = 'Lorem ipsum dolor ';
  }

  //Generate the first paragraph
  var firstParagraphContent = start 
  ? start + generateIpsum(arrayPool, words - 3) 
  : capitalizeFirstWord(generateIpsum(arrayPool, words));

  return firstParagraphContent;
}

function checkWords(words) {
  if (words == undefined) return 100;
  else return words;
}






//If we're doing paragraph tags, not a textarea. The reason for the shift was: I can't select a paragraph. Sad.

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

  var firstParagraphContent = getFirstParagraphContent(arrayPool, words);
  ipsumElements.appendChild(getIpsumParagraph(firstParagraphContent));

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