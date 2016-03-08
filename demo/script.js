// Code goes here


$(function () {

  $.plugin('button.click', function () {
    var jBtn = $(this),
        alt = false;

    jBtn.click(function () {
      alt = !alt;
      if( alt ) {
        jBtn.text('it works!');
      } else {
        jBtn.text('Click Me');
      }

    });
  });

  $.widget('test', function () {
    console.log('widget', this);

    $(this).find('li').hover(function() {
        this.style.fontWeight = 'bold';
      }, function() {
        this.style.fontWeight = 'normal';
      });
  });

  setTimeout(function () {

    $('.async-content').html('<button class="click">Click Me</button>'+
  '<div data-widget="test">'+
    '<ul>'+
      '<li>Item 1</li>'+
      '<li>Item 2</li>'+
      '<li>Item 3</li>'+
    '</ul>'+
  '</div>');

  }, 2000);

});
