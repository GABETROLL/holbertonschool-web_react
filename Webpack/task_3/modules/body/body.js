import $ from 'jquery';
import _ from 'lodash';
import './body.css';

$('body').append('<p>Dashboard data for the students</p>');
$('body').append('<button>Click here to get started</button>');
$('body').append("<p id='count'></p>");

function updateCounter() {
  const count = parseInt(($('#count').text() || '').split(' ')[0] || '0');
  $('#count').text(`${count + 1} clicks on the button`);
}

$('button').on('click', _.debounce(updateCounter, 500));
