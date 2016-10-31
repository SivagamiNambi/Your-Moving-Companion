
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');
    var i;
    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");
   
    // load streetview
   
    var $street=$('#street').val();
    var $city =$('#city').val();
   $greeting.text("So do you want to live in "+$street+","+$city+"?");
     //document.write($street);
    $url="https://maps.googleapis.com/maps/api/streetview?size=600x300&location="+$street+","+$city+"&key=AIzaSyCnxKjG8KREHe5qYtnzzMW7oGFeWDD8puQ";
    $body.append('<img class="bgimg" src="'+$url+'">');

    var URL = 'https://api.nytimes.com/svc/search/v2/articlesearch.json';
    URL += '?api-key=f2f58270fc504eb48a0676ca00a21912&q='+$city+'&sort=newest';
 
// AJAX for NYTimes
 $.ajax({
  dataType:"json",
  url: URL,
  method: 'GET',
 }).done(function(result) {
  for($i=0;$i<4;$i++)
{    $nytElem.append('<li class="article"><a href="'+result.response.docs[$i].web_url+'"target=_blank>'+result.response.docs[$i].headline.main+'</a>'+
                     '<p>'+result.response.docs[$i].lead_paragraph+'</p></li>');
}
}).fail(function(err) {
    $nytElem.append('<p> Could not load pages </p>');
  throw err;
});

//AJAX for wikipedia
var wikiURL="https://en.wikipedia.org/w/api.php?action=opensearch&search="+$city+"&format=json&callcack=wikiCallback";
$.ajax( {
    url: wikiURL,
     method:'GET',
    dataType: 'jsonp',	
 
} ).done(function(result){
for(i=0;i<4;++i)
    { $wikiElem.append("<li> <a href='"+result[3][i]+"'target=_blank >"+result[1][i]+"</a><p>"+result[2][i]+"</p></li>");
      
 }

});








    return false;
};

$('#form-container').submit(loadData);
