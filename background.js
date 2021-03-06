'use strict'

function logURL(params) {
  var sources = listHandler.getLists();
  for( var i=0; i<sources.length; i++){
    var result = sources[i].urls.some( (element) => {
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
