'use strict'

var listHandler = {
  'init': ()=>{
    // get the index from github
    var raw = 'https://raw.githubusercontent.com/berriex/scepticism/lists/index.json';
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open('GET', raw, true);
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4) {
            if(xmlhttp.status == 200) {
                var rawList = JSON.parse(xmlhttp.responseText);

                console.log( rawList );
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


listHandler.init();
