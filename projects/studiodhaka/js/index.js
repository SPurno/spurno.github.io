	// Drag and drop
	gsap.registerPlugin(Draggable);
	const image = document.getElementById("image");
	const container = document.getElementById("draggable");
	// Make the image draggable within the container
	Draggable.create(image, {
		type: "x,y",
		bounds: container,
		edgeResistance: .65,
		inertia: true,
		throwProps: true,
		onDragStart: function() {
			image.style.cursor = 'grabbing';
		},
		onDragEnd: function() {
			image.style.cursor = 'grab';
		}
	});
	// Zoom functionality
	let scale = 1;
	image.addEventListener("wheel", function(event) {
		event.preventDefault();
		
		const zoomIntensity = 0.1;
		scale += event.deltaY > 0 ? -zoomIntensity : zoomIntensity;
		scale = Math.min(Math.max(0.2, scale), 9); // Limit scale between 0.5 and 3
		
		gsap.to(image, {
			scale: scale,
			duration: 0.3,
			transformOrigin: "center center"
		});
	});
    // Animate the logo
    gsap.to("#logo", {
        rotationY: 360,
        duration: 2.5,
        repeat: false, // Infinite loop
        ease: "power3.Out"
    });

    gsap.to("#arrow", {
        y: 15, // Move up by 50px
        duration: 1,
        repeat: -1, // Infinite loop
        yoyo: true, // Reverse the animation
        ease: "power1.inOut" // Easing function for smooth motion
    });
    // map function for home 
    const map = new maplibregl.Map({
        container: 'map',
        style: {
             "version": 8,
             "name": "toner-grey",
             "metadata": {
                 "mapbox:autocomposite": false,
                 "mapbox:type": "template",
                 "maputnik:renderer": "mlgljs"
             },
             "center": [23.749464, 90.3741867],
             "zoom": 9,
             "bearing": 0,
             "pitch": 0,
             "sources": {
                 "default": {
                 "type": "vector",
                 "url": "https://maps.geoapify.com/v1/styles/toner-grey/data.json?apiKey=f6a6d966ce3f424d8929499c813a0ec3"
                 }
             },
             "sprite": "https://maps.geoapify.com/v1/styles/toner-grey/sprite?apiKey=f6a6d966ce3f424d8929499c813a0ec3",
             "glyphs": "https://maps.geoapify.com/v1/styles/toner-grey/fonts/{fontstack}/{range}.pbf?apiKey=f6a6d966ce3f424d8929499c813a0ec3",
             "layers": [
                 {
                 "id": "background",
                 "type": "background",
                 "paint": {"background-color": "#fff"}
                 },
                 {
                 "id": "landcover_grass_fill",
                 "type": "fill",
                 "metadata": {"mapbox:group": "1444849388993.3071"},
                 "source": "default",
                 "source-layer": "landcover",
                 "minzoom": 10,
                 "filter": ["==", "class", "grass"],
                 "paint": {
                     "fill-antialias": true,
                     "fill-color": {
                     "stops": [[10, "rgba(77, 75, 78, 0.3)"], [16, "rgba(77, 75, 78, 1)"]]
                     },
                     "fill-opacity": 1,
                     "fill-outline-color": "rgba(77, 75, 78, 0)"
                 }
                 },
                 {
                 "id": "landcover_grass_pattern",
                 "type": "fill",
                 "metadata": {"mapbox:group": "1444849388993.3071"},
                 "source": "default",
                 "source-layer": "landcover",
                 "minzoom": 10,
                 "filter": ["==", "class", "grass"],
                 "paint": {
                     "fill-antialias": true,
                     "fill-opacity": {"stops": [[10, 0.75], [14, 1]]},
                     "fill-outline-color": "rgba(94, 94, 94, 0)",
                     "fill-pattern": "dash-t"
                 }
                 },
                 {
                 "id": "landcover_wood_fill",
                 "type": "fill",
                 "source": "default",
                 "source-layer": "landcover",
                 "minzoom": 10,
                 "filter": ["==", "class", "wood"],
                 "layout": {"visibility": "visible"},
                 "paint": {
                     "fill-antialias": true,
                     "fill-color": "rgba(77, 75, 78, 1)",
                     "fill-opacity": 1
                 }
                 },
                 {
                 "id": "landcover_wood_pattern",
                 "type": "fill",
                 "source": "default",
                 "source-layer": "landcover",
                 "minzoom": 10,
                 "filter": ["==", "class", "wood"],
                 "layout": {"visibility": "visible"},
                 "paint": {
                     "fill-antialias": true,
                     "fill-color": "rgba(77, 75, 78, 1)",
                     "fill-opacity": 1,
                     "fill-pattern": "dots-t"
                 }
                 },
                 {
                 "id": "landcover_cemetery_fill",
                 "type": "fill",
                 "source": "default",
                 "source-layer": "landuse",
                 "minzoom": 10,
                 "filter": ["all", ["==", "class", "cemetery"]],
                 "paint": {
                     "fill-antialias": true,
                     "fill-color": "rgba(156, 156, 156, 1)",
                     "fill-opacity": {"stops": [[10, 0.75], [14, 1]]},
                     "fill-outline-color": "rgba(75, 75, 75, 1)"
                 }
                 },
                 {
                 "id": "landcover_cemetery_pattern",
                 "type": "fill",
                 "source": "default",
                 "source-layer": "landuse",
                 "filter": ["all", ["==", "class", "cemetery"]],
                 "paint": {
                     "fill-antialias": true,
                     "fill-color": "rgba(236, 235, 235, 0)",
                     "fill-opacity": {"stops": [[10, 0.75], [14, 1]]},
                     "fill-outline-color": "rgba(75, 75, 75, 0)",
                     "fill-pattern": "cross-t"
                 }
                 },
                 {
                 "id": "water",
                 "type": "fill",
                 "source": "default",
                 "source-layer": "water",
                 "filter": [
                     "all",
                     ["!=", "brunnel", "tunnel"],
                     ["==", "$type", "Polygon"],
                     ["!=", "intermittent", 1]
                 ],
                 "layout": {"visibility": "visible"},
                 "paint": {"fill-antialias": true, "fill-color": "rgba(91, 93, 91, 1)"}
                 },
                 {
                 "id": "waterway",
                 "type": "line",
                 "source": "default",
                 "source-layer": "waterway",
                 "minzoom": 12,
                 "filter": ["all", ["!=", "class", "river"]]
                 },
                 {
                 "id": "rail",
                 "type": "line",
                 "source": "default",
                 "source-layer": "transportation",
                 "minzoom": 13,
                 "filter": ["all", ["==", "class", "rail"]],
                 "layout": {"visibility": "visible"},
                 "paint": {
                     "line-color": {
                     "stops": [[13, "rgba(216, 216, 216, 1)"], [17, "rgba(38, 38, 38, 1)"]]
                     },
                     "line-width": {"stops": [[13, 0.85], [17, 2]]}
                 }
                 },
                 {
                 "id": "rail_hatch",
                 "type": "line",
                 "source": "default",
                 "source-layer": "transportation",
                 "minzoom": 15,
                 "filter": ["all", ["==", "class", "rail"]],
                 "layout": {"visibility": "visible"},
                 "paint": {
                     "line-color": "rgba(38, 38, 38, 1)",
                     "line-dasharray": {"stops": [[15, [0.2, 0.8]], [17, [0.2, 1]]]},
                     "line-width": {"stops": [[15, 2], [17, 6]]}
                 }
                 },
                 {
                 "id": "road_area_bridge",
                 "type": "fill",
                 "metadata": {},
                 "source": "default",
                 "source-layer": "transportation",
                 "filter": [
                     "all",
                     ["==", "$type", "Polygon"],
                     ["==", "brunnel", "bridge"]
                 ],
                 "layout": {"visibility": "visible"},
                 "paint": {
                     "fill-antialias": true,
                     "fill-color": "rgba(255, 255, 255, 1)",
                     "fill-opacity": 1
                 }
                 },
                 {
                 "id": "road_area_pier",
                 "type": "fill",
                 "metadata": {},
                 "source": "default",
                 "source-layer": "transportation",
                 "filter": ["all", ["==", "$type", "Polygon"], ["==", "class", "pier"]],
                 "layout": {"visibility": "visible"},
                 "paint": {
                     "fill-antialias": true,
                     "fill-color": "rgba(255, 255, 255, 1)",
                     "fill-opacity": 1
                 }
                 },
                 {
                 "id": "road_pier",
                 "type": "line",
                 "metadata": {},
                 "source": "default",
                 "source-layer": "transportation",
                 "filter": ["all", ["==", "$type", "LineString"], ["in", "class", "pier"]],
                 "layout": {
                     "line-cap": "round",
                     "line-join": "round",
                     "visibility": "visible"
                 },
                 "paint": {
                     "line-color": "rgba(255, 255, 255, 1)",
                     "line-width": {"base": 1.2, "stops": [[15, 1], [17, 4]]}
                 }
                 },
                 {
                 "id": "road_path",
                 "type": "line",
                 "metadata": {},
                 "source": "default",
                 "source-layer": "transportation",
                 "minzoom": 15,
                 "filter": ["all", ["==", "$type", "LineString"], ["==", "class", "path"]],
                 "layout": {
                     "line-cap": "round",
                     "line-join": "round",
                     "visibility": "visible"
                 },
                 "paint": {
                     "line-color": "rgba(255, 255, 255, 1)",
                     "line-width": {"stops": [[14, 2], [17, 4]]}
                 }
                 },
                 {
                 "id": "road_secondary",
                 "type": "line",
                 "metadata": {},
                 "source": "default",
                 "source-layer": "transportation",
                 "minzoom": 10,
                 "filter": [
                     "all",
                     ["==", "$type", "LineString"],
                     ["!in", "class", "pier", "rail", "path", "primary"],
                     ["in", "class", "secondary", "tertiary", "minor", "service"]
                 ],
                 "layout": {
                     "line-cap": "round",
                     "line-join": "round",
                     "visibility": "visible"
                 },
                 "paint": {
                     "line-color": {
                     "stops": [
                         [10, "rgba(77, 75, 78, 0.3)"],
                         [12, "rgba(77, 75, 78, 0.5)"],
                         [15, "rgba(73, 124, 124, 1)"]
                     ]
                     },
                     "line-width": {"stops": [[13, 0.5], [15, 3], [17, 8]]}
                 }
                 },
                 {
                 "id": "road_primary",
                 "type": "line",
                 "metadata": {},
                 "source": "default",
                 "source-layer": "transportation",
                 "minzoom": 8,
                 "filter": [
                     "all",
                     ["==", "$type", "LineString"],
                     ["!in", "class", "pier", "rail", "path"],
                     ["==", "class", "primary"]
                 ],
                 "layout": {
                     "line-cap": "round",
                     "line-join": "round",
                     "visibility": "visible"
                 },
                 "paint": {
                     "line-color": {
                     "stops": [
                         [8, "rgba(77, 75, 78, 0.19)"],
                         [10, "rgba(77, 75, 78, 0.6)"],
                         [17, "rgba(77, 75, 78, 1)"]
                     ]
                     },
                     "line-width": {"stops": [[12, 0.75], [15, 6], [17, 8]]}
                 }
                 },
                 {
                 "id": "road_highway_casing",
                 "type": "line",
                 "metadata": {},
                 "source": "default",
                 "source-layer": "transportation",
                 "minzoom": 8,
                 "filter": [
                     "all",
                     ["==", "$type", "LineString"],
                     ["!in", "class", "pier", "path", "rail"],
                     ["in", "class", "motorway", "trunk"]
                 ],
                 "layout": {
                     "line-cap": "round",
                     "line-join": "round",
                     "visibility": "visible"
                 },
                 "paint": {
                     "line-color": {
                     "stops": [
                         [6, "rgba(219, 219, 219, 1)"],
                         [10, "rgba(255, 255, 255, 1)"],
                         [16, "rgba(255, 255, 255, 1)"]
                     ]
                     },
                     "line-opacity": 1,
                     "line-width": {"stops": [[10, 4], [16, 16]]}
                 }
                 },
                 {
                 "id": "road_highway",
                 "type": "line",
                 "metadata": {},
                 "source": "default",
                 "source-layer": "transportation",
                 "minzoom": 6,
                 "filter": [
                     "all",
                     ["==", "$type", "LineString"],
                     ["!in", "class", "pier", "path", "rail"],
                     ["in", "class", "motorway", "trunk"]
                 ],
                 "layout": {
                     "line-cap": "round",
                     "line-join": "round",
                     "visibility": "visible"
                 },
                 "paint": {
                     "line-color": {
                     "stops": [
                         [6, "rgba(77, 75, 78, 0.02)"],
                         [10, "rgba(77, 75, 78, 0.6)"],
                         [16, "rgba(77, 75, 78, 1)"]
                     ]
                     },
                     "line-opacity": 1,
                     "line-width": {"stops": [[7, 1], [10, 2], [16, 8]]}
                 }
                 },
                 {
                 "id": "building_fill",
                 "type": "fill",
                 "metadata": {"mapbox:group": "1444849364238.8171"},
                 "source": "default",
                 "source-layer": "building",
                 "minzoom": 16,
                 "layout": {"visibility": "visible"},
                 "paint": {
                     "fill-antialias": true,
                     "fill-color": "rgba(18, 168, 157, 1)",
                     "fill-opacity": {"base": 1, "stops": [[13, 0], [16, 1]]},
                     "fill-outline-color": "rgba(77, 75, 78, 1)"
                 }
                 },
                 {
                 "id": "building_pattern",
                 "type": "fill",
                 "metadata": {"mapbox:group": "1444849364238.8171"},
                 "source": "default",
                 "source-layer": "building",
                 "minzoom": 15,
                 "layout": {"visibility": "visible"},
                 "paint": {
                     "fill-color": "rgba(85, 77, 92, 1)",
                     "fill-opacity": {"type": "identity", "property": ""},
                     "fill-outline-color": "rgba(77, 75, 78, 1)",
                     "fill-pattern": "hatch-t",
                     "fill-translate-anchor": "map"
                 }
                 },
                 {
                 "id": "boundary_state",
                 "type": "line",
                 "metadata": {"mapbox:group": "a14c9607bc7954ba1df7205bf660433f"},
                 "source": "default",
                 "source-layer": "boundary",
                 "minzoom": 3,
                 "maxzoom": 14,
                 "filter": ["all", ["==", "admin_level", 4]],
                 "layout": {
                     "line-cap": "round",
                     "line-join": "round",
                     "visibility": "visible"
                 },
                 "paint": {
                     "line-color": {
                     "stops": [[5, "rgba(80, 80, 80, 1)"], [6, "rgba(77, 75, 78, 1)"]]
                     },
                     "line-dasharray": {"stops": [[5, [1, 1]], [6, [1, 2]]]},
                     "line-opacity": 1,
                     "line-width": {
                     "base": 1.3,
                     "stops": [[5, 1], [6, 1.2], [7, 1.6], [14, 5]]
                     }
                 }
                 },
                 {
                 "id": "boundary_country_z5-",
                 "type": "line",
                 "metadata": {},
                 "source": "default",
                 "source-layer": "boundary",
                 "minzoom": 5,
                 "filter": ["==", "admin_level", 2],
                 "layout": {
                     "line-cap": "round",
                     "line-join": "round",
                     "visibility": "visible"
                 },
                 "paint": {
                     "line-color": "rgba(77, 75, 78, 1)",
                     "line-width": {"stops": [[3, 1.5], [7, 3], [22, 6]]}
                 }
                 },
                 {
                 "id": "boundary_country_z0-4",
                 "type": "line",
                 "metadata": {"mapbox:group": "a14c9607bc7954ba1df7205bf660433f"},
                 "source": "default",
                 "source-layer": "boundary",
                 "minzoom": 2,
                 "maxzoom": 5,
                 "filter": ["all", ["==", "admin_level", 2], ["!has", "claimed_by"]],
                 "layout": {
                     "line-cap": "round",
                     "line-join": "round",
                     "visibility": "visible"
                 },
                 "paint": {
                     "line-blur": 0,
                     "line-color": "rgba(77, 75, 78, 1)",
                     "line-opacity": 1,
                     "line-width": {"base": 1.1, "stops": [[2, 1], [22, 20]]}
                 }
                 },
                 {
                 "id": "water_name_lakeline",
                 "type": "symbol",
                 "source": "default",
                 "source-layer": "water_name",
                 "minzoom": 7,
                 "filter": ["all", ["==", "$type", "LineString"], ["has", "name"]],
                 "layout": {
                     "symbol-placement": "line",
                     "symbol-spacing": 350,
                     "text-field": "{name:latin}",
                     "text-font": ["Noto Sans Italic"],
                     "text-letter-spacing": 0.2,
                     "text-max-width": 5,
                     "text-rotation-alignment": "map",
                     "text-size": 14,
                     "visibility": "visible"
                 },
                 "paint": {"text-color": "rgba(255, 255, 255, 1)"}
                 },
                 {
                 "id": "water_name_way",
                 "type": "symbol",
                 "source": "default",
                 "source-layer": "waterway",
                 "minzoom": 14,
                 "filter": ["all", ["==", "$type", "LineString"], ["has", "name"]],
                 "layout": {
                     "symbol-placement": "line",
                     "symbol-spacing": 200,
                     "text-field": "{name:latin} ",
                     "text-font": ["Noto Sans Bold Italic"],
                     "text-max-width": 9,
                     "text-rotation-alignment": "map",
                     "text-size": {"stops": [[14, 12], [18, 19]]},
                     "visibility": "visible"
                 },
                 "paint": {"text-color": "rgba(255, 255, 255, 1)"}
                 },
                 {
                 "id": "water_name_sea",
                 "type": "symbol",
                 "source": "default",
                 "source-layer": "water_name",
                 "minzoom": 4,
                 "filter": [
                     "all",
                     ["==", "$type", "Point"],
                     ["!in", "class", "ocean", "lake"]
                 ],
                 "layout": {
                     "symbol-placement": "point",
                     "symbol-spacing": 250,
                     "text-field": "{name:latin} ",
                     "text-font": ["Noto Sans Italic"],
                     "text-letter-spacing": 0.1,
                     "text-max-width": 6,
                     "text-rotation-alignment": "map",
                     "text-size": 14,
                     "text-transform": "none"
                 },
                 "paint": {"text-color": "rgba(255, 255, 255, 1)"}
                 },
                 {
                 "id": "water_name_ocean",
                 "type": "symbol",
                 "source": "default",
                 "source-layer": "water_name",
                 "minzoom": 2,
                 "filter": ["all", ["==", "$type", "Point"], ["==", "class", "ocean"]],
                 "layout": {
                     "symbol-placement": "point",
                     "symbol-spacing": 350,
                     "text-field": "{name:latin} ",
                     "text-font": ["Noto Sans Italic"],
                     "text-letter-spacing": 0.2,
                     "text-max-width": 5,
                     "text-rotation-alignment": "map",
                     "text-size": 14,
                     "text-transform": "uppercase"
                 },
                 "paint": {"text-color": "rgba(255, 255, 255, 1)"}
                 },
                 {
                 "id": "road_label_primary",
                 "type": "symbol",
                 "source": "default",
                 "source-layer": "transportation_name",
                 "minzoom": 15,
                 "filter": ["in", "class", "primary", "secondary", "tertiary", "trunk"],
                 "layout": {
                     "symbol-placement": "line",
                     "text-field": "{name:latin} ",
                     "text-font": {
                     "stops": [[6, ["Noto Sans Regular"]], [16, ["Noto Sans Bold"]]]
                     },
                     "text-keep-upright": true,
                     "text-rotation-alignment": "map",
                     "text-size": {"base": 1, "stops": [[13, 12], [14, 13]]},
                     "visibility": "visible"
                 },
                 "paint": {
                     "text-color": "rgba(77, 75, 78, 1)",
                     "text-halo-blur": 0,
                     "text-halo-color": "rgba(255, 255, 255, 1)",
                     "text-halo-width": 3
                 }
                 },
                 {
                 "id": "road_label_secondary",
                 "type": "symbol",
                 "source": "default",
                 "source-layer": "transportation_name",
                 "minzoom": 14.5,
                 "filter": [
                     "all",
                     ["==", "$type", "LineString"],
                     ["in", "class", "minor", "service", "track"]
                 ],
                 "layout": {
                     "symbol-placement": "line",
                     "text-field": "{name:latin} ",
                     "text-font": {
                     "stops": [[6, ["Noto Sans Regular"]], [16, ["Noto Sans Bold"]]]
                     },
                     "text-rotation-alignment": "map",
                     "text-size": {"base": 1, "stops": [[13, 12], [14, 13]]},
                     "visibility": "visible"
                 },
                 "paint": {
                     "text-color": "rgba(77, 75, 78, 1)",
                     "text-halo-color": "rgba(255, 255, 255, 1)",
                     "text-halo-width": 3
                 }
                 },
                 {
                 "id": "place_label_park",
                 "type": "symbol",
                 "source": "default",
                 "source-layer": "park",
                 "minzoom": 11,
                 "filter": ["all"],
                 "layout": {
                     "symbol-placement": "point",
                     "text-field": "{name:latin}",
                     "text-font": ["Noto Sans Italic"],
                     "text-line-height": 1,
                     "text-pitch-alignment": "map",
                     "text-size": 12,
                     "visibility": "visible"
                 },
                 "paint": {
                     "icon-halo-width": 1,
                     "text-color": "rgba(77, 75, 78, 1)",
                     "text-halo-color": "rgba(255, 255, 255, 1)",
                     "text-halo-width": 2
                 }
                 },
                 {
                 "id": "place_label_village",
                 "type": "symbol",
                 "source": "default",
                 "source-layer": "place",
                 "minzoom": 12,
                 "filter": [
                     "all",
                     ["==", "$type", "Point"],
                     ["in", "class", "village", "hamlet"]
                 ],
                 "layout": {
                     "text-anchor": "center",
                     "text-field": "{name:latin} ",
                     "text-font": {
                     "stops": [[12, ["Nunito Regular"]], [16, ["Nunito Semi Bold"]]]
                     },
                     "text-max-width": 10,
                     "text-size": {"stops": [[12, 12], [16, 18]]},
                     "visibility": "visible"
                 },
                 "paint": {
                     "text-color": "rgba(11, 11, 11, 1)",
                     "text-halo-blur": 0,
                     "text-halo-color": "hsl(0, 0%, 100%)",
                     "text-halo-width": 2
                 }
                 },
                 {
                 "id": "place_label_city",
                 "type": "symbol",
                 "source": "default",
                 "source-layer": "place",
                 "minzoom": 4,
                 "maxzoom": 16,
                 "filter": ["all", ["==", "$type", "Point"], ["==", "class", "city"]],
                 "layout": {
                     "icon-anchor": "center",
                     "text-field": "{name:latin}",
                     "text-font": {"stops": [[4, ["Nunito Regular"]], [7, ["Nunito Bold"]]]},
                     "text-max-width": 10,
                     "text-size": {"stops": [[4, 14], [7, 15], [8, 19], [16, 22]]},
                     "visibility": "visible"
                 },
                 "paint": {
                     "icon-translate": [1, 11],
                     "text-color": "rgba(77, 75, 78, 1)",
                     "text-halo-blur": 0,
                     "text-halo-color": "rgba(255, 255, 255, 1)",
                     "text-halo-width": 2
                 }
                 },
                 {
                 "id": "place_label_town",
                 "type": "symbol",
                 "source": "default",
                 "source-layer": "place",
                 "minzoom": 10,
                 "maxzoom": 16,
                 "filter": ["all", ["==", "$type", "Point"], ["==", "class", "town"]],
                 "layout": {
                     "icon-anchor": "center",
                     "text-field": "{name:latin}",
                     "text-font": {
                     "stops": [[8, ["Nunito Regular"]], [14, ["Nunito Bold"]]]
                     },
                     "text-max-width": 10,
                     "text-size": {"stops": [[8, 15], [16, 18]]},
                     "visibility": "visible"
                 },
                 "paint": {
                     "icon-translate": [1, 11],
                     "text-color": "rgba(77, 75, 78, 1)",
                     "text-halo-blur": 0,
                     "text-halo-color": "rgba(255, 255, 255, 1)",
                     "text-halo-width": 2
                 }
                 },
                 {
                 "id": "place_state-label",
                 "type": "symbol",
                 "metadata": {"mapbox:group": "a14c9607bc7954ba1df7205bf660433f"},
                 "source": "default",
                 "source-layer": "place",
                 "minzoom": 4,
                 "filter": ["all", ["==", "class", "state"]],
                 "layout": {
                     "text-field": "{name:latin} ",
                     "text-font": ["Nunito Semi Bold"],
                     "text-max-width": 10,
                     "text-size": 13,
                     "text-transform": "uppercase",
                     "visibility": "visible"
                 },
                 "paint": {"text-color": "rgba(77, 75, 78, 1)"}
                 },
                 {
                 "id": "place_label_country",
                 "type": "symbol",
                 "source": "default",
                 "source-layer": "place",
                 "minzoom": 2,
                 "filter": ["==", "class", "country"],
                 "layout": {
                     "text-allow-overlap": false,
                     "text-field": "{name:latin}",
                     "text-font": {"stops": [[3, ["Nunito Regular"]], [4, ["Nunito Bold"]]]},
                     "text-ignore-placement": false,
                     "text-max-width": 10,
                     "text-padding": 2,
                     "text-pitch-alignment": "map",
                     "text-size": {"stops": [[3, 14], [4, 16], [5, 21]]},
                     "text-transform": "none",
                     "visibility": "visible"
                 },
                 "paint": {
                     "text-color": "rgba(77, 75, 78, 1)",
                     "text-halo-color": "#fff",
                     "text-halo-width": 2
                 }
                 },
                 {
                 "id": "place_label_continent",
                 "type": "symbol",
                 "source": "default",
                 "source-layer": "place",
                 "minzoom": 1,
                 "maxzoom": 2,
                 "filter": ["==", "class", "continent"],
                 "layout": {
                     "text-field": "{name:latin}",
                     "text-font": ["Nunito Extra Bold"],
                     "text-line-height": 1.1,
                     "text-max-width": 10,
                     "text-size": {"stops": [[3, 18], [4, 24]]},
                     "visibility": "visible"
                 },
                 "paint": {
                     "text-color": "rgba(77, 75, 78, 1)",
                     "text-halo-color": "#fff",
                     "text-halo-width": 2
                 }
                 }
             ],
             "id": "c4268e48-fac9-4478-8120-201224fbd4d8"
             },
     });

     map.on('load', () => {
         map.flyTo({
         center: [90.3746367, 23.7497609], // Dhaka, Bangladesh coordinates
         zoom: 14, // Zoom level for city view
         speed: 1.0, // Animation speed
         curve: 1, // Animation curve
         essential: true // Essential animation
         });
     });
     // Correct way to add a marker
     let markerIconUrl = 'https://api.geoapify.com/v1/icon/?type=awesome&color=%2312a89d&size=x-large&icon=map-marker-alt&scaleFactor=2&apiKey=f6a6d966ce3f424d8929499c813a0ec3';
     let marker = new maplibregl.Marker({
         element: document.createElement('div'),
         anchor: 'bottom'
     })
     .setLngLat([90.3746367, 23.7497609])
     .addTo(map);
     // Set the icon for the marker
     let markerElement = marker.getElement();
         markerElement.style.backgroundImage = `url(${markerIconUrl})`;
         markerElement.style.width = '31px';
         markerElement.style.height = '46px';
         markerElement.style.backgroundSize = 'contain';