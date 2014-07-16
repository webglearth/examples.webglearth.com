/* 
 * WebGL Earth Examples
 * Klokan Technologies GmbH 2014, Dalibor Janák
 */

$(document).ready(function() {

//event for swithing examples
  $('.link').each(function() {
    $(this).on('click', function() {
      var name = $(this).text();
      var link = $(this).attr('href');
      var desc = $(this).data('desc');
      updateContent(this, name, link, desc);
      return false;
    });
  });

  function updateContent(elem, name, link, desc) {
    $('.view-example').each(function() {
      $(this).prop('href', link);
    });
    //add link to example
    var url = $(location).prop('href');
    var urlParts = link.split('/');
    window.location.hash = urlParts[1].slice(0,-5);
    //select active
    $('.active').prop('class', '');
    $(elem).prop('class', 'active');
    //fill page attributes
    $('#subtitle').text(name);
    $('#view').prop('src', link);
    $('#desc').html('<p>' + desc + '</p>');
    //reset copybutton
    $('#btn-copy').html('Copy');
    loadCode(link);
  }


  //load file with AJAX
  function loadCode(link) {
    $.ajax({
      url: link
    }).done(function(results) {
      $('#source').text(results);
      $('#btn-copy').attr('data-clipboard-text', results);
    }).fail(function() {
      alert('Can\'t load file ' + link);
    });
  }

  //init content
  var url = $(location).prop('href');
  var path = url.split('#');
  if (path[1] !== undefined) {
    var link = 'examples/' + path[1] + '.html';
    var elem = $('.link[href="' + link + '"]');
    var name = $(elem).text();
    var desc = $(elem).data('desc');
    updateContent(elem, name, link, desc);
    loadCode(link);
  } else {
    loadCode('examples/satellite.html');
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