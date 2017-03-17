function start_map() {
  //******Initialize bootstrap tooltip
  $(document).ready(function(){
    $('[data-toggle="tooltip"]').tooltip();   
  });

  //******Add Map
  map = new L.Map('map', {center: new L.LatLng(42.46815, -72.58121), zoomControl: false, zoom: 18, minZoom: 2, maxZoom: 20, inertiaDeceleration: 1000});

  //******Add map controls
  L.control.mousePosition().addTo(map);
  L.control.scale({ maxWidth: 200 }).addTo(map);
  L.control.zoom({ position: 'topleft', zoomInTitle: "Zoom in (can also be done with mouse wheel, double-click, '+' key, or by pressing the 'shift' key while clicking and dragging a rectangle)", zoomOutTitle: "Zoom out (can also be done with the mouse wheel or the '-' key)" }).addTo(map);
  L.control.navbar().addTo(map);

  //******Bing geocoder control
  var tmpPoint = new L.marker;
  var bingGeocoder = new L.Control.BingGeocoder('At3gymJqaoGjGje-JJ-R5tJOuilUk-gd7SQ0DBZlTXTsRoMfVWU08ZWF1X7QKRRn', { callback: function (results) {
                 var bbox = results.resourceSets[0].resources[0].bbox,
                 first = new L.LatLng(bbox[0], bbox[1]),
                 second = new L.LatLng(bbox[2], bbox[3]),
                 tmpBounds = new L.LatLngBounds([first, second]);
                 this._map.fitBounds(tmpBounds);
                 this._map.removeLayer(tmpPoint);
                 tmpPoint = new L.marker(results.resourceSets[0].resources[0].point.coordinates).bindPopup(results.resourceSets[0].resources[0].address.formattedAddress);
                 this._map.addLayer(tmpPoint);
                 }
  });

  map.addControl(bingGeocoder);

  //******Add basemaps
  var googleHybrid = L.tileLayer('http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}',{
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3']
  });
  var googleSatellite = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',{
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3']
  }); 
  var googleStreet = L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',{
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3']
  });
  var googleTerrain = googleTerrain = L.tileLayer('http://{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}',{
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3']
  });
  var bingHybrid = new L.BingLayer("At3gymJqaoGjGje-JJ-R5tJOuilUk-gd7SQ0DBZlTXTsRoMfVWU08ZWF1X7QKRRn", {type: 'AerialWithLabels'});
  var bingSatellite = new L.BingLayer("At3gymJqaoGjGje-JJ-R5tJOuilUk-gd7SQ0DBZlTXTsRoMfVWU08ZWF1X7QKRRn", {type: 'Aerial'});
  var bingStreet = new L.BingLayer("At3gymJqaoGjGje-JJ-R5tJOuilUk-gd7SQ0DBZlTXTsRoMfVWU08ZWF1X7QKRRn", {type: 'Road'});
  var usgsTopo = new L.tileLayer('http://basemap.nationalmap.gov/ArcGIS/rest/services/USGSTopo/MapServer/tile/{z}/{y}/{x}', {
        maxZoom: 15,
        attribution: '<a href="http://www.doi.gov">U.S. Department of the Interior</a> | <a href="http://www.usgs.gov">U.S. Geological Survey</a> | <a href="http://www.usgs.gov/laws/policies_notices.html">Policies</a>'
        });
  var blank = new L.tileLayer('');
    
  map.addLayer(googleHybrid);

/*
  //******Add geoserver layers
  counties = L.tileLayer.wms("http://carolcoombs.com:8080/geoserver/realty/wms", {
    layers: "realty:counties",
    format: "image/png",
    transparent: true,
    version: "1.1.0",
    maxZoom: 20,
    zIndex: 1
  });
*/

  var baseLayers = {"Google Hybrid": googleHybrid, "Google Satellite": googleSatellite, "Google Street": googleStreet, "Google Terrain": googleTerrain, "Bing Hybrid": bingHybrid, "Bing Satellite": bingSatellite, "Bing Street": bingStreet, "USGS Topo": usgsTopo};
  var overlays = {}; //{"DOT Districts": gsDOTDistricts, "Counties": gsCounties, "Towns": gsTowns, "HUC 12 Watersheds": gsHUC12, "Environmental Justice": ej, "Road Jurisdiction": jurisdiction, "NHS Roads": nhs, "Deerfield Watershed": gsHuc8, "Catchments": catchTogSVG, "Streams": streamTogSVG, "Crossings": crossTogSVG};
  L.control.layers(baseLayers, overlays).addTo(map);


  //******Add Print tool
  var printMap = new L.Control.print();
  map.addControl(printMap);

/*
  topoSVG = d3.select(map.getPanes().overlayPane).append("svg");
  topoSVG.append("g").attr("class", "leaflet-zoom-hide").attr("id", "townsG");
  //topoSVG.append("g").attr("class", "leaflet-zoom-hide").attr("id", "countiesG");
  topoSVG.append("g").attr("class", "leaflet-zoom-hide").attr("id", "taxparG");
  topoSVG.append("g").attr("class", "leaflet-zoom-hide").attr("id", "greenfieldG");


  //******Make tooltip for displaying attribute data
  tooltip = d3.select("body")
    .append("div")
    .attr("class", "d3Tooltip");




  topos = {};  //global topoJSON files variable
  brush = {};   //global brush variable
  hist = {};   //global histogram object variable
  graphs = [];   //global list of current graphs variable
  layers = [];   //global list of topoJSON map layers
  fips = {"25011":"franklin", "25015":"hampshire", "25013":"hampden"};   //global county id


  queue()
    .defer(d3.json, 'layers/towns/towns.json')
    //.defer(d3.json, 'layers/counties/counties.json')
    .defer(d3.json, 'layers/franklin/M114TaxPar.json')
    .await(displayIt);
*/
}



  //******Bind topoJSON data
  function displayIt(error, towns, greenfield) {
    topos.towns = topojson.feature(towns, towns.objects.towns_wgs84);
    //topos.counties = topojson.feature(counties, counties.objects.counties_wgs84);
    topos.greenfield = topojson.feature(greenfield, greenfield.objects.M114TaxPar);
    topos.taxpar = {};
    topos.assess = {};

    //******Add properties to topos and push layer (class name, SVG g object, unique identifier short_heading, colorbrewer class)
    addProps("towns", d3.select("#townsG"), "TOWN", "RdYlBu");
    //addProps("counties", d3.select("#countiesG"), "COUNTY", "RdYlBu");
    addProps("greenfield", d3.select("#greenfieldG"), "LOC_ID", "RdYlBu");

    topos.towns.color = {"25011": "blue", "25013": "red", "25015": "orange"};

    //******Set d3 map data
    bounds = d3.geo.bounds(topos.towns);
    path = d3.geo.path()
      .projection(projectPoint)
      .pointRadius(3.5);

    addTopo(topos.towns);
    //addTopo(topos.counties);
    addTopo(topos.greenfield);

    topos.towns.g.selectAll(".towns").on("click", function(d) {getTown(d.properties.TOWN_ID, d.properties.FIPS_STCO);});


    //******Set map view
    map.on("viewreset", reset);
    reset();
  }


  function getTown(id, fips_id) {
    town_id = id;
    queue()
      .defer(d3.json, 'layers/' + fips[fips_id] + '/M' + town_id + 'TaxPar.json')
      .defer(d3.tsv, 'layers/' + fips[fips_id] + '/M' + town_id + 'Assess.tsv')
      .await(displayTown);
  }

  function displayTown(error, taxpar, assess) {
    topos.taxpar[town_id] = topojson.feature(taxpar, taxpar.objects["M" + town_id + "TaxPar"]);
    addProps("M" + town_id, d3.select("#taxparG"), "LOC_ID", "RdYlBu");

    topos.taxpar[town_id] = {};
    topos.taxpar[town_id].covType + {}
    topos.assess[town_id] = readTSV(assess, topos.assess[town_id]);
  }


  //******Transform TSV strings to values if appropriate and add to topojson
  function readTSV(tmpData, topo) {
    //******Get keys and values from TSV data and fill out covariate data type
    var tmpKeys = d3.keys(tmpData[0]);
    var tmpVals = d3.values(tmpData[0]);
    console.log(tmpKeys);
    console.log(tmpVals);

    tmpVals.forEach(function(val,i){
      if (isNaN(val) == false || val == "NA") {
        topo[town_id].covType[tmpKeys[i]] = "number";
      }
      else {
        topo[town_id].covType[tmpKeys[i]] = "string";
      }
    });

    //******Change TSV attribute strings to values if appropriate
    var tmpCov = strToNum(tmpData);

    //*******Map TSV to ID_key attribute (in this case either unique_id (crossings, streams) or featureid (catchments)
    var tmpMap = d3.map(tmpCov, function(d) {return d[topo.uniqueID];});

    //*******Add TSV data to topojson
    topo.features.forEach(function(d) { 
      try {
        tmpKeys.forEach(function(key) {
          d.properties[key] = tmpMap.get(d.id)[key];
        });
      }
      catch(err) { 
        console.log("No TSV data for id " + d.id);
      }
    });

    return tmpCov;
  }




  //******Add topo layer to map
  function addTopo(topo) {
    var tmpFeats = topo.g.selectAll("." + topo.class)
        .data(topo.features)
      .enter().append("path")
        .attr("d", path)
        .attr("class", topo.class)
        .on("mouseover", function(data) { if(d3.select(this).style("opacity") > 0) {showIt(this.id);} })
        .on("mousemove", function() { return tooltip.style("top", (d3.event.pageY-40) + "px").style("left", (d3.event.pageX+15) + "px"); })
        .on("mouseout", function() { return tooltip.style("visibility", "hidden"); })
        .on("click", function(data) { 
          if (d3.select(this).style("stroke-opacity") == "1") {
            d3.select(this).style({"fill-opacity": "", "stroke-opacity": ""});
            d3.selectAll(".remCheck").property("checked", function() {if(this.value == data.id) {return false;} });
          } 
          else {
            d3.select(this).style({"fill-opacity": "0.9", "stroke-opacity": "1"});
            d3.selectAll(".remCheck").property("checked", function() {if(this.value == data.id) {return true;} });
          }
        });
    changeStyle("id", topo);
    //filterMap("featureid", topo, true);
    //d3.select("#" + topo.class + "Legend").style("display", "block");
  }





  //*****Reposition the SVG to cover the features.
  function reset() {
    path.pointRadius(3.5 + (((map.getZoom()/10) - 1) * 4));
    
    //******Set bounds (using Deerfield HUC 8 bounds)
    var bottomLeft = projectPoint(bounds[0]);
    var topRight = projectPoint(bounds[1]);
      
    topoSVG.attr('width', topRight[0] - bottomLeft[0])
      .attr('height', bottomLeft[1] - topRight[1])
      .style('margin-left', bottomLeft[0] + 'px')
      .style('margin-top', topRight[1] + 'px');

    var translation = -bottomLeft[0] + ',' + -topRight[1];

    //******Select all layer g elements
    var tmpG = topoSVG.selectAll("g");

    //******Loop through each g element and transform the path
    tmpG[0].forEach(function(g) {
      var curG = d3.select(g);
      var feature = curG.selectAll("path");
      curG.attr('transform', 'translate(' + -bottomLeft[0] + ',' + -topRight[1] + ')');
      feature.attr("d", path);
    });  
  }






  //******Use Leaflet to implement a D3 geometric transformation.
  function projectPoint(x) {
    var point = map.latLngToLayerPoint(new L.LatLng(x[1], x[0]));
    return [point.x, point.y];
  }




  //******Add properties to topos and push layer
  function addProps(tmpName, tmpG, tmpID, tmpColor) {
    console.log(tmpName);
    topos[tmpName].class = tmpName;
    topos[tmpName].g = tmpG;
    topos[tmpName].uniqueID = tmpID;
    topos[tmpName].covType = {};
    topos[tmpName].filter = {};
    topos[tmpName].binWidth = {};
    topos[tmpName].color = tmpColor;
    brush[tmpName] = {};
    hist[tmpName] = {};
    layers.push(tmpName);
  }




  //*******Show crossings attribute in tooltip
  function showIt(tmpID) {
    tooltip.text(tmpID);
    tooltip.style("visibility", "visible");
    tooltip.property("title", tmpID);
  }

  //*******Change feature styles
  function changeStyle(tmpAtt, topo) {
    //*******Change tooltip text for select
    //d3.select("#" + topo.class + "Select").property("title", topo.tooltip[tmpAtt]);

    //*******Select features
    var curG = d3.select(topo.g[0][0]);
    var tmpFeat = curG.selectAll("." + topo.class);

    tmpFeat.style({"stroke": function(d) {return topo.color[d.properties.FIPS_STCO];}} );
    tmpFeat.attr("id", function(d) {return d.id;});
  }

