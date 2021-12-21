/* global data */
/* exported data */

var $photoUrl = document.querySelector('.photo-url');
var $photo = document.querySelector('.photo');
var $form = document.querySelector('form');
var $title = document.querySelector('.title');
var $notes = document.querySelector('.notes');
var $entry = document.querySelector('a');
var $entryInfo = document.querySelector('.entryInfo');

$photoUrl.addEventListener('input', function (e) {
  $photo.setAttribute('src', e.target.value);
});

$form.addEventListener('submit', function (e) {
  e.preventDefault();
  var obj = {
    title: $title.value,
    photoUrl: $photoUrl.value,
    notes: $notes.value,
    entryId: data.nextEntryId
  };
  obj.entryId = data.nextEntryId;
  data.nextEntryId++;
  data.entries.unshift(obj);
  $photo.setAttribute('src', 'images/placeholder-image-square.jpg');
  $form.reset();
});

$entry.addEventListener('click', function (e) {
  $form.classList.add('hidden');
  $entryInfo.classList.remove('hidden');
});
