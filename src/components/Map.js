import { motion } from 'framer-motion';
import React, { useEffect } from 'react';

export default function Map({query}) {
    useEffect(() => {
        window.L.mapquest.key = process.env.REACT_APP_API_KEY;

var directions = window.L.mapquest.directions();
directions.route({
  start: query.startSpot,
  end: query.endSpot,
  options: {
  routeType: 'fastest'
  }
}, createMap);
var corner1 = window.L.latLng(-85.05115, -180),
corner2 = window.L.latLng(85.05115, 180),
bounds = window.L.latLngBounds(corner1, corner2);
function createMap(err, response) {
  var map = window.L.mapquest.map('map', {
    center: [0, 0],
    layers: window.L.mapquest.tileLayer('light'),
    zoom: 6,
    maxBounds: bounds,
    minZoom: 4, 
  });

  
  var customLayer = window.L.mapquest.directionsLayer({
    startMarker: {
      icon: 'circle',
      draggable: false,
      iconOptions: {
        size: 'sm',
        primaryColor: '#F86C10',
        secondaryColor: '#F86C10',
        symbol: 'A',
      },
    },
    endMarker: {
      icon: 'circle',
      draggable: false,
      iconOptions: {
        size: 'sm',
        primaryColor: '#F86C10',
        secondaryColor: '#F86C10',
        symbol: 'B',
      },
    },
    routeRibbon: {
      color: "#F86C10",
      opacity: 1.0,
      showTraffic: false,
      draggable: false,
    },
    directionsResponse: response
  });
  customLayer.addTo(map);
  map.panBy([window.innerWidth*0.1,0]);
}
    }, [])
    return (
        <motion.div id="map" style={{zIndex: 0, width: '100vw', height: "calc(100vh - 33px)"}}></motion.div>
    )
}
