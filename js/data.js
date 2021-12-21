/* exported data */

var data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1
};

var previousData = localStorage.getItem('code-journal');

window.addEventListener('beforeunload', function (e) {
  var dataJSON = JSON.stringify(data);
  localStorage.setItem('code-journal', dataJSON);
});

if (previousData !== null) {
  data = JSON.parse(previousData);
}
