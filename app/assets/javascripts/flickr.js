$(function(){
  $('#flickr').click(search_flickr);
  $('#clear').click(clear_photos);
});

var timer;
var index;
var photos;
var page = 1;

function search_flickr()
{
  var search = $('#search').val();
  $.getJSON('http://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=e50aa8cdd88235846eb314a79f4bf96e&text=' + search + '&per_page=10&page=' + page + '&format=json&jsoncallback=?', results);
}

function  results(data)
{
  var sec = parseInt($('#duration').val());
  var msec = sec * 1000;
  index = 0;
  timer = setInterval(add_photo, msec);
  photos = data.photos.photo;
}


function add_photo(photo)
{
  photo = photos[index];
  var width = $('#input_width').val();
  var length = $('#input_length').val();
  var url = "url(http://farm"+ photo.farm +".static.flickr.com/"+ photo.server +"/"+ photo.id +"_"+ photo.secret +"_m.jpg)";
  var image = $('<div>');
  image.addClass('image');
  image.css({'length' : length, 'width' : width, 'background-image' : url});
  $('#images').prepend(image);

  if(index == 9)
  {
    page++;
    search_flickr();
    clear_photos();
    clearInterval(timer);
  }
  else
  {
    index++;
  }
}

function clear_photos()
{
  $('#images').empty();
}

function change_width()
{
  $('.image').css('width', $('#input_width').text());
}

function change_length()
{
  $('.image').css('length', $('#input_length').text());
}



// "http://farm"+ item.farm +".static.flickr.com/"+ item.server +"/"+ item.id +"_"+ item.secret +"_m.jpg"