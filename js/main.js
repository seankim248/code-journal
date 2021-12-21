/* global data */
/* exported data */

var $photoUrl = document.querySelector('.photo-url');
var $photo = document.querySelector('.photo');
var $form = document.querySelector('form');
var $title = document.querySelector('.title');
var $notes = document.querySelector('.notes');
var $header = document.querySelector('header');
var $ul = document.querySelector('ul');
var $views = document.querySelectorAll('.view');

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

$header.addEventListener('click', function (e) {
  if (e.target.matches('.tab')) {
    var dataView = e.target.getAttribute('data-view');
    for (var i = 0; i < $views.length; i++) {
      if ($views[i].getAttribute('data-view') === dataView) {
        $views[i].className = 'view';
      } else {
        $views[i].className = 'view hidden';
      }
    }
  }
});

function createEntryDOMTree(obj) {
  var $li = document.createElement('li');

  var $row = document.createElement('div');
  $row.className = 'row margin-bottom';
  $li.appendChild($row);

  var $columnHalf = document.createElement('div');
  $columnHalf.className = 'column-half';
  $row.appendChild($columnHalf);

  var $img = document.createElement('img');
  $img.setAttribute('src', 'images/placeholder-image-square.jpg');
  $img.setAttribute('alt', 'placeholder');
  $columnHalf.appendChild($img);

  var $secondColumnHalf = document.createElement('div');
  $secondColumnHalf.className = 'column-half';
  $row.appendChild($secondColumnHalf);

  var $h3 = document.createElement('h3');
  $h3.textContent = 'Placeholder Image';
  $secondColumnHalf.appendChild($h3);

  var $p = document.createElement('p');
  $p.textContent = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore accusantium quaerat iure. Repudiandae magni, libero numquam reiciendis atque voluptates id fugit distinctio facilis asperiores at. Facilis corrupti, dolor sed assumenda laboriosam rerum iste fugit dolores vero nam earum placeat amet doloremque, magnam eaque unde, sint impedit iure officia minima magni!';
  $secondColumnHalf.appendChild($p);

  return $li;
}

for (var i = 0; i < data.entries.length; i++) {
  $ul.appendChild(createEntryDOMTree(data.entries[i]));
}
