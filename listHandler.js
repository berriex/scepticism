'use strict'

var listHandler = {

  // try to read from localstorage, if nothing found download lists from the web
  'init': ()=>{
    var list = browser.storage.local.get('lists').then(
      (list)=>{
        if( !list.length ){
          listHandler.readIndex();
        } else {
          listHandler.indexList = list;
        }

      }
    );
  },

  // get the indexlist from github
  'readIndex': ()=>{
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

  // download a single list
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
            var lists = listHandler.indexList;
            browser.storage.local.set({lists});
          }
        }
      }
    };
    xmlhttp.send(null);
  },

  // get all the lists
  'getAll': ()=>{
    return listHandler.indexList;
  },

  // get only the active lists
  'getLists': ()=>{
    return listHandler.indexList.filter( function(item){
      return item.active;
    });
  },

  // disable/enable the list
  'toggle': (index)=>{
    listHandler.indexList[index].active = !listHandler.indexList[index].active;
    var lists = listHandler.indexList;
    browser.storage.local.set({lists});
  }
}


listHandler.init();
