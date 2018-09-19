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
      var api_url = 'http://localhost:8000/api/update_point/' + userid;
      console.log(api_url);
      $.ajax({
        type: "GET",
        url: api_url,
        success: function(data) {
            console.log(data);
            // Nothing to do on success time
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
        }
      });        
    }
});

// chrome.storage.sync.remove('userid', function() {
//   console.log('successfully reomved');
// })