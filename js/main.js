/* global data */
/* exported data */

var $photoUrl = document.querySelector('.photo-url');
var $photo = document.querySelector('.photo');
var $form = document.querySelector('form');
var $title = document.querySelector('.title');
var $notes = document.querySelector('.notes');
var $entriesTab = document.querySelector('a');
var $ul = document.querySelector('ul');
var $newBtn = document.querySelector('.new-btn');
var $noEntries = document.querySelector('.no-entries');
var $h1 = document.querySelector('h1');
var $views = document.querySelectorAll('.view');

$photoUrl.addEventListener('input', function (e) {
  $photo.setAttribute('src', e.target.value);
});

$form.addEventListener('submit', function (e) {
  e.preventDefault();
  if (data.editing === null) {
    var obj = {
      title: $title.value,
      photoUrl: $photoUrl.value,
      notes: $notes.value,
      entryId: data.nextEntryId
    };
    data.nextEntryId++;
    data.entries.unshift(obj);
    $ul.prepend(renderEntry(obj));
  } else {
    var editedObj = {
      title: $title.value,
      photoUrl: $photoUrl.value,
      notes: $notes.value,
      entryId: data.editing
    };
    for (var i = 0; i < data.entries.length; i++) {
      if (data.editing === data.entries[i].entryId) {
        data.entries[i] = editedObj;
        break;
      }
    }
    var $lis = document.querySelectorAll('li');
    var editedObjTree = renderEntry(editedObj);
    for (var j = 0; j < $lis.length; j++) {
      if (parseInt($lis[j].getAttribute('data-entry-id')) === data.editing) {
        $lis[j].replaceWith(editedObjTree);
      }
    }
  }
  $noEntries.className = 'text-align-center no-entries hidden';
  $photo.setAttribute('src', 'images/placeholder-image-square.jpg');
  $form.reset();
  changeView('entries');
});

$entriesTab.addEventListener('click', function (e) {
  changeView('entries');
});

$newBtn.addEventListener('click', function (e) {
  $h1.textContent = 'New Entry';
  changeView('entry-form');
  data.editing = null;
});

$ul.addEventListener('click', function (e) {
  if (e.target.nodeName === 'I') {
    changeView('entry-form');
    var currentEdit = parseInt(e.target.closest('li').getAttribute('data-entry-id'));
    data.editing = currentEdit;
    for (var i = 0; i < data.entries.length; i++) {
      if (currentEdit === data.entries[i].entryId) {
        $title.value = data.entries[i].title;
        $photoUrl.value = data.entries[i].photoUrl;
        $notes.value = data.entries[i].notes;
      }
    }
    $photo.setAttribute('src', $photoUrl.value);
    $h1.textContent = 'Edit Entry';
  }
});

document.addEventListener('DOMContentLoaded', function (e) {
  changeView(data.view);
  for (var i = 0; i < data.entries.length; i++) {
    $ul.appendChild(renderEntry(data.entries[i]));
  }
  if (data.entries.length !== 0) {
    $noEntries.className = 'text-align-center no-entries hidden';
  }
});

function renderEntry(obj) {
  var $li = document.createElement('li');
  $li.setAttribute('data-entry-id', obj.entryId);

  var $row = document.createElement('div');
  $row.className = 'row margin-bottom';
  $li.appendChild($row);

  var $columnHalf = document.createElement('div');
  $columnHalf.className = 'column-half';
  $row.appendChild($columnHalf);

  var $img = document.createElement('img');
  $img.setAttribute('src', obj.photoUrl);
  $img.setAttribute('alt', 'placeholder');
  $columnHalf.appendChild($img);

  var $secondColumnHalf = document.createElement('div');
  $secondColumnHalf.className = 'column-half';
  $row.appendChild($secondColumnHalf);

  var $h3 = document.createElement('h3');
  $h3.textContent = obj.title;
  $secondColumnHalf.appendChild($h3);

  var $editIcon = document.createElement('i');
  $editIcon.className = 'fas fa-pen';
  $secondColumnHalf.appendChild($editIcon);

  var $p = document.createElement('p');
  $p.textContent = obj.notes;
  $secondColumnHalf.appendChild($p);

  return $li;
}

function changeView(view) {
  for (var i = 0; i < $views.length; i++) {
    if ($views[i].getAttribute('data-view') === view) {
      $views[i].className = '';
    } else {
      $views[i].className = 'hidden';
    }
  }
  data.view = view;
}
