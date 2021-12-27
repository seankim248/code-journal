/* global data */
/* exported data */

var $photoUrl = document.querySelector('.photo-url');
var $photo = document.querySelector('.photo');
var $form = document.querySelector('form');
var $title = document.querySelector('.title');
var $notes = document.querySelector('.notes');
var $entriesTab = document.querySelector('.entries-tab');
var $favoritesTab = document.querySelector('.favorites-tab');
var $ul = document.querySelector('ul');
var $newBtn = document.querySelector('.new-btn');
var $noEntries = document.querySelector('.no-entries');
var $h1 = document.querySelector('h1');
var $h4 = document.querySelector('h4');
var $deleteEntry = document.querySelector('.delete-entry');
var $overlay = document.querySelector('.overlay');
var $modal = document.querySelector('.modal');
var $cancelBtn = document.querySelector('.cancel');
var $confirmBtn = document.querySelector('.confirm');
var $favoritesView = document.querySelector('.favorites-view');
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

$favoritesTab.addEventListener('click', function (e) {
  changeView('favorites');
});

$deleteEntry.addEventListener('click', function (e) {
  $overlay.classList.remove('hidden');
  $modal.classList.remove('hidden');
});

$cancelBtn.addEventListener('click', function (e) {
  $overlay.classList.add('hidden');
  $modal.classList.add('hidden');
});

$confirmBtn.addEventListener('click', function (e) {
  for (var i = 0; i < data.entries.length; i++) {
    if (data.editing === data.entries[i].entryId) {
      data.entries.splice(i, 1);
    }
  }
  var $lis = document.querySelectorAll('li');
  for (var j = 0; j < $lis.length; j++) {
    if (parseInt($lis[j].getAttribute('data-entry-id')) === data.editing) {
      $lis[j].remove();
    }
  }
  $overlay.classList.add('hidden');
  $modal.classList.add('hidden');
  changeView('entries');
  if (data.entries.length === 0) {
    $noEntries.classList.remove('hidden');
  }
});

$newBtn.addEventListener('click', function (e) {
  $h1.textContent = 'New Entry';
  changeView('entry-form');
  data.editing = null;
});

$ul.addEventListener('click', function (e) {
  var currentEdit = parseInt(e.target.closest('li').getAttribute('data-entry-id'));
  data.editing = currentEdit;
  if (e.target.className === 'fas fa-pen') {
    changeView('entry-form');
    for (var i = 0; i < data.entries.length; i++) {
      if (currentEdit === data.entries[i].entryId) {
        $title.value = data.entries[i].title;
        $photoUrl.value = data.entries[i].photoUrl;
        $notes.value = data.entries[i].notes;
      }
    }
    $photo.setAttribute('src', $photoUrl.value);
    $h1.textContent = 'Edit Entry';
    $h4.className = '';
  }
  if (e.target.className.includes('fa-star')) {
    if (e.target.className.includes('far')) {
      e.target.className = 'fas fa-star';
      for (var k = 0; k < data.entries.length; k++) {
        if (currentEdit === data.entries[k].entryId && data.favoriteEntries.includes(data.entries[k])) {
          data.favoriteEntries.unshift(data.entries[k]);
        }
        if (data.favoriteEntries.includes(data.entries[k])) {
          e.target.className = 'fas fa-star';
        }
      }
    } else if (e.target.className.includes('fas')) {
      e.target.className = 'far fa-star';
    }
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

  var $favoriteIcon = document.createElement('i');
  $favoriteIcon.className = 'far fa-star';
  $secondColumnHalf.appendChild($favoriteIcon);

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

for (var i = 0; i < data.favoriteEntries.length; i++) {
  $favoritesView.prepend(renderEntry(data.favoriteEntries[i]));
}
