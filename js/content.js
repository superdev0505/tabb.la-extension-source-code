if (window.location.href.search("http://localhost:8000") != -1) {
    onSetUserToken();
} 

function getRandomToken() {
    // E.g. 8 * 4 = 32 bits token
    var randomPool = new Uint8Array(4);
    crypto.getRandomValues(randomPool);
    var hex = '';
    for (var i = 0; i < randomPool.length; ++i) {
        hex += randomPool[i].toString(16);
    }
    // E.g. db18458e2782b2b77e36769c569e263a53885a9944dd0a861e5064eac16f1a
    return hex;
}


function onSetUserToken() {
	chrome.storage.sync.get('userid', function(items) {
	    var userid = items.userid;
	    if (userid) {
	        useToken(userid);
	    } else {
	        userid = getRandomToken();
	        chrome.storage.sync.set({userid: userid}, function() {
	            useToken(userid);
	        });
	    }
	    function useToken(userid) {
	    	var token = $('#user_token').val();
	    	if(token) {
		    	var api_url = "http://localhost:8000/api/user_update/"+userid;
		    	var settings = {
					"async": true,
					"crossDomain": true,
					"url": api_url,
					"method": "GET",
					"headers": {
						"Authorization": "Bearer "+token,
						"Cache-Control": "no-cache",
						"Postman-Token": "ff2f12f7-8236-4a7b-be95-93ff2be73f45"
					}
				}

				$.ajax(settings).done(function (response) {
				});
		    }
	    }
	});
}