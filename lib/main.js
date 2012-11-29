//Initialize everything we need
var tabs = require("tabs");
var windows = require("windows").browserWindows;
var widgets = require("widget");
var self = require("self");
data = self.data;  
var { MatchPattern } = require("match-pattern");
var {Cc, Ci} = require("chrome");
var mediator = Cc['@mozilla.org/appshell/window-mediator;1'].getService(Ci.nsIWindowMediator);

//variable to store the script (string) to run when a button or widget is clicked
var myScript;

exports.main = function() {
 
  //call the function down below to add a button to the navigation bar
  addToolbarButton();

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


//function to create the button on the navigation bar
function addToolbarButton() {
    var document = mediator.getMostRecentWindow("navigator:browser").document;      
    var navBar = document.getElementById("nav-bar");
    if (!navBar) {
        return;
    }
    var navButton = document.createElement("toolbarbutton");  

    navButton.setAttribute('type', 'button');
    navButton.setAttribute('class', 'toolbarbutton-1');
    navButton.setAttribute('image', data.url('yhs.ico'));
    navButton.setAttribute('orient', 'horizontal');
    navButton.setAttribute('label', 'YouTube HTML Switch');
    navButton.addEventListener('click', function() {
     tabs.activeTab.attach({
              contentScript: myScript
            });      
    }, false)
    navBar.appendChild(btn);
}


