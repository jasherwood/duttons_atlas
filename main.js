// JS for the map
require(["esri/Map", "esri/views/SceneView", "esri/WebScene", "esri/layers/SceneLayer",
  "esri/widgets/Home", "esri/geometry/Extent"], function(
  Map,
  SceneView,
  WebScene,
  SceneLayer,
  Home,
  Extent      
) { 
  // Important variables for connecting the sceneview to the AGOL API  
 

  // Load webscene from portal item
  var webscene = new WebScene({
    portalItem: {
      // autocasts as new PortalItem()
      id: "dea74d75219c45b19ffc57890b815746" // this is the id of the sceneview the app is connected to dutton's atlas: dea74d75219c45b19ffc57890b815746
    }
  });   

  var view = new SceneView({
    container: "viewDiv",
    qualityProfile: "high",
    highlightOptions: {
      color: [210, 49, 83] // color of the highlight when a feature is selected
    }, 
    map: webscene,

  });    

  // Show modal on page load
  // Use cookies so it doesn't show up every time 
  $(document).ready(function() {
    if ($.cookie('pop') == null) {
        $('#infoModal').modal('show');
        $.cookie('pop', '7');
    }
   }); 


  
// Custom Buttons
  // Home button
  const homeBtn = new Home({
    view: view,
    id: "home",
  });

  // Add the home button to the top left corner of the view
  view.ui.add(homeBtn, "top-left");        

  // Add element for the 360 photo viewer button using Esri widgets
  var viewerBtn = document.createElement('div');
  viewerBtn.className = "esri-icon-media esri-widget--button esri-widget esri-interactive";
  viewerBtn.title = "View 360 Hub photo";
  viewerBtn.addEventListener('click', function(event){
    // Toggle panorama
    $('#viewerModal').modal('show');
    document.getElementById("pano").src="https://cdn.pannellum.org/2.5/pannellum.htm#config=https://mapgeoasu.github.io/3dexplorer/tour.json&autoLoad=true";
  })

  // Add the button to the UI
  view.ui.add(viewerBtn, "top-left"); 

  // Add element for the information button using Esri widgets
  var infoBtn = document.createElement('div');
  infoBtn.className = "esri-icon-description esri-widget--button esri-widget esri-interactive";
  infoBtn.title = "Information";
  infoBtn.addEventListener('click', function(event){
    // Toggle infowindow modal
    $('#infoModal').modal('show');
  })

  // Add the button to the UI
  view.ui.add(infoBtn, "top-left"); 

  // Removes the default compass widget from the view's container
  view.ui.remove("compass");
}); // end of map JS
