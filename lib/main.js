var tabs = require("tabs");
var windows = require("windows").browserWindows;
var widgets = require("widget");
var self = require("self");
data = self.data;


exports.main = function() {


 var myScript;    
    
    tabs.on('ready', function(tab) {
       var tabURL = tab.url;
        var stringarray = ["window.location.href=\"", tabURL, "&html5=1\"" ]
        myScript = stringarray.join('') ;
        console.log('tab is loaded', tab.title, tab.url)
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