'use strict'

var sourceOne = {
  "name": "List ONE",
  "description": "This is the first list",
  "message": "This is the first list",
  "urls": [
    ".*localhost*",
    ".*disinformazione\\.it*",
    ".*dionidream\\.com",
    ".*informarexresistere\\.fr*",
    ".*sciechimiche\\.org"
  ]
};

var sourceTwo = {
  "name": "List TWO",
  "description": "This is the second list",
  "message": "bbbb",
  "urls": [
    ".*facebook\\.com*",
    ".*localhost*"
  ]
};

var sources = [sourceOne, sourceTwo];

function logURL(params) {
  for( var i=0; i<sources.length; i++){
    var result = sources[i].urls.some( function(element){
        var tst = new RegExp(element);
        if( tst.test( params.url ) && params.frameId === 0){
          chrome.tabs.sendMessage(params.tabId, {
            list: sources[i].name,
            message: sources[i].message
          });
        }
    });
  }
}

chrome.webNavigation.onDOMContentLoaded.addListener(
  logURL,
  {
    url: [
      {schemes: ['http', 'https']}
    ]
  }
);
