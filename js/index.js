/* 
 * WebGL Earth Examples
 * Klokan Technologies GmbH 2014, Dalibor Janák
 */

$(document).ready(function() {

  //load hello world by default
  loadCode('examples/helloworld.html');

  //event for swithing examples
  $('.link').each(function() {
    $(this).on('click', function() {
      var name = $(this).text();
      var link = $(this).attr('href');
      var desc = $(this).data('desc');

      $('.view-example').each(function() {
        $(this).attr('href', link);
      });
      $('.active').attr('class', '');
      $(this).attr('class', 'active');

      //fill page attributes
      $('#subtitle').text(name);
      $('#view').attr('src', link);
      $('#desc').html('<p>' + desc + '</p>');

      loadCode(link);

      return false;
    });
  });

  //load file with AJAX
  function loadCode(link) {
    $.ajax({
      url: link
    }).done(function(results) {
      $('#source').text(results);
    });
  }
});