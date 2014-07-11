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
      $('.active').prop('class', '');
      $(this).prop('class', 'active');

      //fill page attributes
      $('#subtitle').text(name);
      $('#view').prop('src', link);
      $('#desc').html('<p>' + desc + '</p>');

      //reset copybutton
      $('#btn-copy').html('Copy');
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
      $('#btn-copy').attr('data-clipboard-text', results);
    });
  }



  //copy to clipboard
  ZeroClipboard.config({swfPath: 'http://wmts.maptiler.com/swf/ZeroClipboard.swf'});

  var btnCopy = new ZeroClipboard(document.getElementById('btn-copy'));
  btnCopy.on('ready', function(readyEvent) {
    btnCopy.on('aftercopy', function(event) {
      document.getElementById('btn-copy').innerText = 'Copied!';
    });
  });

});