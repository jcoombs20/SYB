function fields() {
	bounds = new OpenLayers.Bounds(-14000000, 2800000, -7350000, 6450000);
	options = {controls: [], allOverlays: true, numZoomLevels: 22, projection: "EPSG:900913", units: "m"};
	map = new OpenLayers.Map('map', options);
	hybrid = new OpenLayers.Layer.Google("Google Hybrid",
            {type: google.maps.MapTypeId.HYBRID, numZoomLevels: 22}
            );
	map.addLayer(hybrid);
	map.addControl(new OpenLayers.Control.Zoom());
	map.addControl(new OpenLayers.Control.Navigation({dragPanOptions: {enableKinetic: true}, zoomWheelEnabled: true}));
			
	markers = new OpenLayers.Layer.Markers ("Field Markers");
	map.addLayer(markers);
	size = new OpenLayers.Size(50,50);
	offset = new OpenLayers.Pixel(-(size.w/2), -size.h);
	icon = new OpenLayers.Icon('marker3_baseball.png', size, offset);

	map.addControl(new OpenLayers.Control.Navigation());
	tmpMark = ""
	document.getElementById("Sunderland").checked = true;
	getFields("Sunderland");
	document.getElementById("field-0").checked = true;
	initZ = 0;
	tmpZoom = 18;
	dd2m(coords[0]);
	//initZ = 1;
	}

function getFields(town) {
	console.log(town);
	fieldForm = document.getElementById("fields");

	switch(town) {
		case "Conway":
			for (i = fieldForm.childNodes.length - 1; i>1; i--) {
				fieldForm.removeChild(fieldForm.childNodes[i]);
				}
			fields = ["Town Hall Field", "Elementary School Field"];
			coords = [[-72.6974, 42.5061], [-72.6750, 42.5088]];
			for (i = 0; i < fields.length; i++) {
				tmpRadio = document.createElement("input");
				tmpRadio.setAttribute("type", "radio");
				tmpRadio.name = "field";
				tmpRadio.value = i;
				tmpRadio.id = "field-" + i;
				tmpRadio.setAttribute("onclick", "dd2m(coords[this.value])");
						
				tmpLabel = document.createElement("label");
				tmpLabel.appendChild(tmpRadio);
				tmpLabel.innerHTML += fields[i] + "<br>";

				fieldForm.appendChild(tmpLabel);
				}
			break;

		case "Deerfield":
			for (i = fieldForm.childNodes.length - 1; i>1; i--) {
				fieldForm.removeChild(fieldForm.childNodes[i]);
				}
			fields = ["Memorial Field", "Old Deerfield Field", "Elementary School Field", "Sugarloaf Field"];
			coords = [[-72.6080, 42.4798], [-72.6024, 42.5440], [-72.6070, 42.4816], [-72.5952, 42.4688]];
			for (i = 0; i < fields.length; i++) {
				tmpRadio = document.createElement("input");
				tmpRadio.setAttribute("type", "radio");
				tmpRadio.name = "field";
				tmpRadio.value = i;
				tmpRadio.id = "field-" + i;
				tmpRadio.setAttribute("onclick", "dd2m(coords[this.value])");
						
				tmpLabel = document.createElement("label");
				tmpLabel.appendChild(tmpRadio);
				tmpLabel.innerHTML += fields[i] + "<br>";

				fieldForm.appendChild(tmpLabel);
				}
			break;

		case "Hatfield":
			for (i = fieldForm.childNodes.length - 1; i>1; i--) {
				fieldForm.removeChild(fieldForm.childNodes[i]);
				}
			fields = ["Elementary School Field"];
			coords = [[-72.6020, 42.3698]];
			for (i = 0; i < fields.length; i++) {
				tmpRadio = document.createElement("input");
				tmpRadio.setAttribute("type", "radio");
				tmpRadio.name = "field";
				tmpRadio.value = i;
				tmpRadio.id = "field-" + i;
				tmpRadio.setAttribute("onclick", "dd2m(coords[this.value])");
						
				tmpLabel = document.createElement("label");
				tmpLabel.appendChild(tmpRadio);
				tmpLabel.innerHTML += fields[i] + "<br>";

				fieldForm.appendChild(tmpLabel);
				}
			break;

		case "Sunderland":
			for (i = fieldForm.childNodes.length - 1; i>1; i--) {
				fieldForm.removeChild(fieldForm.childNodes[i]);
				}
			fields = ["Town Field #1", "Town Field #2", "Town Field #3"];
			coords = [[-72.5814, 42.4683], [-72.5805, 42.4689], [-72.5816, 42.4687]];
			for (i = 0; i < fields.length; i++) {
				tmpRadio = document.createElement("input");
				tmpRadio.setAttribute("type", "radio");
				tmpRadio.name = "field";
				tmpRadio.value = i;
				tmpRadio.id = "field-" + i;
				tmpRadio.setAttribute("onclick", "dd2m(coords[this.value])");
						
				tmpLabel = document.createElement("label");
				tmpLabel.appendChild(tmpRadio);
				tmpLabel.innerHTML += fields[i] + "<br>";

				fieldForm.appendChild(tmpLabel);
				}
			break;

		case "Turners Falls":
			for (i = fieldForm.childNodes.length - 1; i>1; i--) {
				fieldForm.removeChild(fieldForm.childNodes[i]);
				}
			fields = ["Newt Guilbault Field"];
			coords = [[-72.5581, 42.5988]];
			for (i = 0; i < fields.length; i++) {
				tmpRadio = document.createElement("input");
				tmpRadio.setAttribute("type", "radio");
				tmpRadio.name = "field";
				tmpRadio.value = i;
				tmpRadio.id = "field-" + i;
				tmpRadio.setAttribute("onclick", "dd2m(coords[this.value])");
						
				tmpLabel = document.createElement("label");
				tmpLabel.appendChild(tmpRadio);
				tmpLabel.innerHTML += fields[i] + "<br>";

				fieldForm.appendChild(tmpLabel);
				}
			break;

		case "Whately":
			for (i = fieldForm.childNodes.length - 1; i>1; i--) {
				fieldForm.removeChild(fieldForm.childNodes[i]);
				}
			fields = ["Herlihy Field", "Old (Blue) School Field"];
			coords = [[-72.5930, 42.4585], [-72.5956, 42.4458]];
			for (i = 0; i < fields.length; i++) {
				tmpRadio = document.createElement("input");
				tmpRadio.setAttribute("type", "radio");
				tmpRadio.name = "field";
				tmpRadio.value = i;
				tmpRadio.id = "field-" + i;
				tmpRadio.setAttribute("onclick", "dd2m(coords[this.value])");
						
				tmpLabel = document.createElement("label");
				tmpLabel.appendChild(tmpRadio);
				tmpLabel.innerHTML += fields[i] + "<br>";

				fieldForm.appendChild(tmpLabel);
				}
			break;
		}
	}

function dd2m(lonLat) {
	if (initZ == 1) {
		tmpZoom = map.getZoom();
		}		
	console.log(lonLat);
	lon = lonLat[0];
	lat = lonLat[1];
	x = lon * 20037508.34 / 180;
	y = Math.log(Math.tan((90 + lat) * Math.PI / 360)) / (Math.PI / 180);
	y = y * 20037508.34 / 180;

	if (tmpMark != "") {
		markers.removeMarker(tmpMark);
		}	
	tmpMark = new OpenLayers.Marker(new OpenLayers.LonLat(x, y), icon)
	markers.addMarker(tmpMark);
	map.setCenter([x, y], tmpZoom, "True", "True");
	}

function test() {
  console.log("works");
}

/*
Conway
Town Hall Field	-72.6974, 42.5061
Elem School Field	-72.6750, 42.5088

Deerfield
Memorial Field	-72.6080, 42.4798
Old Deerfield Field	-72.6024, 42.5440
Elem. School Field	-72.6070, 42.4816
Sugarloaf Field	-72.5952, 42.4688

Hatfield
Elem School Field	-72.6020, 42.3698

Sunderland
Town Field #1		-72.5814, 42.4683
Town Field #2		-72.5805, 42.4689
Town Field #3		-72.5816, 42.4687

Turners Falls
Newt Guilbault Field	-72.5581, 42.5988

Whately
Herlihy Field		-72.5930, 42.4585
Old (blue) School	-72.5956, 42.4458
*/