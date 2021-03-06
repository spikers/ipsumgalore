window.addEventListener('load', function () {
  initialize();
});

function initialize() {
  checkMobile();
  handleSelectIpsum();
  applyHandlersToSelectParagraphs();

  document.getElementById('generate-ipsum').addEventListener('click', function () {
    clearTextAreaOutput();
    handleIpsumChange();
  });  

  document.getElementById('copy-ipsum').addEventListener('click', function () {
    copyIpsum();
  });
}

function checkMobile() {
  // If the screen width is small, use the mobile version (The second check is to see if it exists)
  if (screen.width > 450 && document.getElementById('contribute')) {
    document.getElementById('contribute').setAttribute('src', './assets/img/contribute.png');
  }
}

function handleSelectIpsum() {
  var selectIpsum = document.getElementById('select-ipsum');
  
  // Writes in all the ipsums we have
  populateSelectIpsum(selectIpsum);
  applyHandlersToSelectPools(selectIpsum);
}

function populateSelectIpsum(selectIpsum) {
  var pools = Object.keys(ipsum);

  var selectIpsumFragment = document.createDocumentFragment();

  for (var n = 0; n < pools.length; n++) {
    var option = document.createElement('option');
    var tn = document.createTextNode(pools[n]);
    option.appendChild(tn);
    selectIpsumFragment.appendChild(option);
  }

  selectIpsum.appendChild(selectIpsumFragment);
  
  handleIpsumChange();
}

function handleIpsumChange() {
  changeParagraphText();
  addIpsumToTextArea();
  changeOutputTitle();
}

function changeParagraphText() {
  if (document.getElementById('select-paragraphs').value === '1') {
    document.getElementById('paragraph-text').textContent = 'paragraph.';
  } else {
    document.getElementById('paragraph-text').textContent = 'paragraphs.';
  }
  
}

function applyHandlersToSelectPools(selectIpsum) {
  selectIpsum.addEventListener('change', function () {
    handleIpsumChange();
  });
}

function changeOutputTitle() {
  var span = document.createElement('span');
  var tn = document.createTextNode(ipsum[document.getElementById('select-ipsum').value].name + ' Ipsum');
  span.appendChild(tn);
  
  var outputTitle;
  outputTitle = document.getElementById('output-title');

  outputTitle.innerHTML = '';
  outputTitle.appendChild(span);
}

function applyHandlersToSelectParagraphs() {
  var paragraphs = document.getElementById('select-paragraphs');
  paragraphs.addEventListener('change', function () {
    handleIpsumChange();
  });
}

function copyIpsum() {
  var output = document.getElementById('output');
  //output.focus();
  output.select();
  document.execCommand('copy');
}

function clearTextAreaOutput() {
  document.getElementById('output').value = '';
}

function addIpsumToTextArea() {
  var words = 100;
  var arrayPool;
  var paragraphs;

  arrayPool = ipsum[document.getElementById('select-ipsum').value].pool;
  paragraphs = document.getElementById('select-paragraphs').value;

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

    j += countSpacesInWord(poolWord);
    //This is so the end of paragraphs don't have an innocuous space
    if (j < words - 1) ipsum += ' ';
    else ipsum += '.'
  }

  return ipsum;
}

function countSpacesInWord(word) {
  var count = 0;
  for (var k = 0; k < word.length; k++) {
    if (word[k] === ' ') count++;
  }
  return count;
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