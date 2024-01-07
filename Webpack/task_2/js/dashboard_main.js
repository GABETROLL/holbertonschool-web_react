import $ from 'jquery';
import _ from 'lodash';
import '../css/main.css';

$('body').append('<p>Holberton Dashboard</p>');
$('body').append('<p>Dashboard data for the students</p>');
$('body').append('<button>Click here to get started</button>');
$('body').append("<p id='count'></p>");
$('body').append('<p>Copyright - Holberton School</p>');

function updateCounter() {
  const count = ($('#count').text() || '').split(' ')[0] || 0;
  $('#count').text(`${count + 1} clicks on the button`);
}

$('#count').on('click', _.debounce(updateCounter, 500));
