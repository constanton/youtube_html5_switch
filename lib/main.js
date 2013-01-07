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

// configure the toolbar button
    var options = {
        id: "yhs-tbb",
        label: "YouTube HTML5 Switch",
        toolbarID: "nav-bar",
        image: data.url('yhs.ico'),
        tooltiptext: "Turns YouTube's default player to HTML5",
        onCommand: function () {
        tabs.activeTab.attach({
                  contentScript: myScript
                }); 
        }
      };
      
// configure the add-on bar button      
    var options2 = {
        
        id: "yhs-abb",
        toolbarID: "addon-bar",
        image: data.url('yhs.ico'),
        label: "YouTube HTML5 Switch",
        tooltiptext: "Turns YouTube's default player to HTML5",
        onCommand: function () {
        tabs.activeTab.attach({
                  contentScript: myScript
                }); 
        }
      };

// create both button
var abb = toolbarbutton.ToolbarButton(options2);
   var tbb = toolbarbutton.ToolbarButton(options); 
    
   
// manage the behaviour of both buttons   
   
   if (self.loadReason == "install" || self.loadReason == "upgrade" ) {
         tbb.moveTo({
          toolbarID: "nav-bar",
          forceMove: false // only move from palette
        });
        
          abb.moveTo({
          toolbarID: "addon-bar",
          forceMove: false // only move from palette
        });    
  }
  
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
};
