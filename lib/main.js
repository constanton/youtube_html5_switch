//Initialize everything we need

var tabs = require("tabs");
var widgets = require("widget");
var toolbarbutton = require("toolbarbutton");
var self = require("self");
data = self.data;  
var { MatchPattern } = require("match-pattern");

//variable to store the script (string) to run when a button or widget is clicked 
var myScript;

exports.main = function() {
 
var options = {
    id: "yhs-tbb",
    label: "YouTube HTML5 Switch",
    toolbarID: "nav-bar",
    forceMove: true,
    image: data.url('yhs.ico'),
    tooltiptext: 'YouTube HTML5 Switch',
    onCommand: function () {
    tabs.activeTab.attach({
              contentScript: myScript
            }); 
  }
  };

  var tbb = createToolbarButton(options);


  //when the tab is ready check the URL and store the proper value to myScript 
    tabs.on('ready', function(tab) {
       var tabURL = tab.url;
       
        var pattern = new MatchPattern(/.*youtube\.com\/watch.*/);
        
        var pattern2 = new MatchPattern(/.*&html5=1*/); 
        
        //if URL is correct create myScript
        if ((pattern.test(tab.url)) && !(pattern2.test(tab.url)))  {        
            var stringarray = ["window.location.href=\"", tabURL, "&html5=1\"" ]
            myScript = stringarray.join('') ;       
        }else{
        //if URL not correct do nothing
           myScript = null;
        }
    });

//create a clickable widget that runs myScript
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

function createToolbarButton(options) {
  var tbb = toolbarbutton.ToolbarButton(options);
  tbb.moveTo(options);
  return tbb;
}
