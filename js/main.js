/* global data */
/* exported data */

var $photoUrl = document.querySelector('.photo-url');
var $photo = document.querySelector('.photo');
var $form = document.querySelector('form');
var $inputs = document.querySelector('form').elements;

$photoUrl.addEventListener('input', function (e) {
  $photo.setAttribute('src', e.target.value);
});

$form.addEventListener('submit', function (e) {
  e.preventDefault();
  var obj = {};
  for (var i = 0; i < $inputs.length; i++) {
    obj[$inputs[i].name] = $inputs[i].value;
  }
  obj.entryId = data.nextEntryId;
  data.nextEntryId++;
  data.entries.unshift(obj);
  $photo.setAttribute('src', 'images/placeholder-image-square.jpg');
  $form.reset();
});
