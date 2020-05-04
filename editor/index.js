/* ##EVENTBUS## */

console = Logger;

function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}
const WORDS = shuffleArray(
  JSON.parse(
    UrlFetchApp.fetch(
      'https://gist.githubusercontent.com/yasintz/f3ac157625723c12dd27037b33d2b2df/raw/f729b64109436621e8b7272793f2a00abd636a0a/wods.json'
    ).getContentText()
  )
);

var SHEET = SpreadsheetApp.getActive();

function setWords() {
  EventBus.dispatch('setWords');
}

function createTemplates() {
  EventBus.dispatch('createTemplates');
}

/* ##BUNDLE## */
