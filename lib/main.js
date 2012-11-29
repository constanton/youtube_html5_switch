var tabs = require("tabs");
var windows = require("windows").browserWindows;
var widgets = require("widget");
var self = require("self");
data = self.data;  
var { MatchPattern } = require("match-pattern");


exports.main = function() {

 var myScript;    
    
    tabs.on('ready', function(tab) {
       var tabURL = tab.url;
       
        var pattern = new MatchPattern(/.*youtube\.com\/watch.*/);
        
        var pattern2 = new MatchPattern(/.*&html5=1*/); 
        
        if ((pattern.test(tab.url)) && !(pattern2.test(tab.url)))  {        
            var stringarray = ["window.location.href=\"", tabURL, "&html5=1\"" ]
            myScript = stringarray.join('') ;       
        }else{     
           myScript = null;
        }
    });


    var widget = widgets.Widget({
    
      id: "switch",
      label: "Switch player",
      contentURL: data.url("icon.html"),
      
    
          onClick: function() {
            tabs.activeTab.attach({
              contentScript: myScript
            });
          }
      
    });
};
