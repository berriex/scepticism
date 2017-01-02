'use strict'

var listHandler = {
  'init': ()=>{
    var list = browser.storage.local.get('lists').then(
      (list)=>{
        if( !list.length ){
          listHandler.readIndex();
        } else {
          listHandler.indexList = list;
        }

      },
      (err)=>{
        listHandler.readIndex();
      }
    );
  },

  'readIndex': ()=>{
    // get the index from github
    var raw = 'https://raw.githubusercontent.com/berriex/scepticism/master/lists/index.json';
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open('GET', raw, true);
    xmlhttp.onreadystatechange = function() {
      if (xmlhttp.readyState == 4) {
        if(xmlhttp.status == 200) {
          var result = JSON.parse(xmlhttp.responseText);
          listHandler.indexList = result.lists;
          for( var i=0; i< listHandler.indexList.length; i++){
            listHandler.downloadList( i );
          }
        }
      }
    };
    xmlhttp.send(null);
  },

  'downloadList': ( index )=>{
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open('GET', listHandler.indexList[index].url, true);
    xmlhttp.onreadystatechange = function() {
      if (xmlhttp.readyState == 4) {
        if(xmlhttp.status == 200) {
          var result = JSON.parse(xmlhttp.responseText);
          listHandler.indexList[index]['urls'] = result.urls;
          listHandler.indexList[index]['message'] = result.message;
          if( index === (listHandler.indexList.length-1) ){
            var save = browser.storage.local.set({listHandler}).then(
            (ok)=>{
              console.log( 'local save ok' );
              console.log( ok );
            },
            (err)=>{
              console.log( err);
            }
            );
          }
        }
      }
    };
    xmlhttp.send(null);
  },

  'getAll': ()=>{
    return listHandler.indexList;
  }
}


listHandler.init();
