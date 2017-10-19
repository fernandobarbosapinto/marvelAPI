$(function(){
    var PRIV_KEY = '';
    var PUBLIC_KEY = '';
    var URL = 'https://gateway.marvel.com/v1/public/comics';
    var ts = new Date().getTime();
    var hash = CryptoJS.MD5(ts + PRIV_KEY + PUBLIC_KEY).toString();
    var characterId = '1009720'; 
    
    $.getJSON(URL,{
        'apikey': PUBLIC_KEY,
        'ts': ts,
        'hash': hash,
        'characters': characterId
    })
    .done(function(response){
        console.log(response);
        var results = response.data.results;
        var resultsLen = results.length;
        var output = '<ul>'; 
        
        for(var i=0; i<resultsLen; i++){
            if(results[i].images.length > 0) {
                var imgPath = results[i].images[0].path + '/standard_xlarge.' + results[i].images[0].extension;
                var history = results[i].urls[0].url;
                output += '<li><img src="' + imgPath + '"><p>'+results[i].title+'</p><p><a href="' + history +'" target="_self">'+'Buy Comic</a></p></li>';
            }
        }  
        output += '</ul>'
        $('#results').append(output);

    })
    .fail(function(err){
        console.log(err);
    });
});