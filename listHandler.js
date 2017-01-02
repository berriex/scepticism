'use strict'

var listHandler = {
  'readIndex': (  )=>{
    // get the index from github
    var raw = 'https://raw.githubusercontent.com/berriex/scepticism/master/lists/index.json';
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open('GET', raw, true);
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4) {
            if(xmlhttp.status == 200) {
                listHandler.indexList = JSON.parse(xmlhttp.responseText);
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
                 }
            }
        };
        xmlhttp.send(null);
  },

  'getAll': ()=>{
    return [];
  },

  'alert': (obj)=>{
    obj.textContent = 'frfr'
  }
}


listHandler.readIndex();
