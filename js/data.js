/* exported data */

var data = {
  view: 'entry-form',
  entries: [],
  favoriteEntries: [],
  editing: null,
  nextEntryId: 1
};

window.addEventListener('beforeunload', function (e) {
  var dataJSON = JSON.stringify(data);
  localStorage.setItem('code-journal', dataJSON);
});

var previousData = localStorage.getItem('code-journal');
if (previousData !== null) {
  data = JSON.parse(previousData);
}
