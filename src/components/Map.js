import React, { useState, useEffect, useRef } from "react";
import { Button, Input } from 'antd';
import 'antd/dist/antd.css';
import Sidebar from "./Sidebar/Sidebar";
import "./css/Map.css";

export default function Map(props) {
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [sidebar, setSidebar] = useState(false);
  let prevMarkersRef = useRef([]);

  useEffect(() => {
    const google = window.google;

    // Create an instance of the map
    const uluru = new google.maps.LatLng(-25.344, 131.036);
    // The map, centered at Uluru
    const cur_map = build_interactive_map(uluru);

    clearMarkers(prevMarkersRef.current);

  }, [])// eslint-disable-line react-hooks/exhaustive-deps

  let createMarker = (latlng, map) => {
    return new window.google.maps.Marker({
      position: latlng,
      map: map
    });
  }

  // Removes the markers from the map.
  let clearMarkers = (markers) => {
    for (let m of markers) {
      m.setMap(null);
    }
  }

  let build_interactive_map = (latlng, zoom = 4) => {
    const google = window.google;
    const cur_map = new google.maps.Map(document.getElementById("map"), {
      zoom: zoom,
      center: latlng,
    });
    
    cur_map.addListener("click", (e) => {
      setSidebar(true);
      const marker = createMarker(e.latLng, cur_map);
      clearMarkers(prevMarkersRef.current);
      prevMarkersRef.current.push(marker);
    });

    return cur_map;
  }

  let handleSubmit = () => {
    const google = window.google;
    setSidebar(true);
    var position = new google.maps.LatLng(lat, lng);
    const cur_map = build_interactive_map(position, 18);
    const marker = createMarker(position, cur_map);
    clearMarkers(prevMarkersRef.current);
    prevMarkersRef.current.push(marker);
  }
  
  return (
    // Set a height on the map so it will display
    <>
      <div style={{ position: "relative", left: "35%" }}>
        <div className="coordinate_form_item">
        <Input
          className="coordinate_form_item"
          id="Latitude"
          type="text"
          placeholder="Latitude"
          onChange={e => setLat(e.target.value)}
        /></div>
        <Input
          className="coordinate_form_item"
          id="Longtitude"
          type="text"
          placeholder="Longtitude"
          onChange={e => setLng(e.target.value)}
        />
        <Button
          type="primary"
          className="locate-button"
          onClick={handleSubmit}
        >
          {' '}Locate{' '}
        </Button>
      </div>
      <div>
        <div id="map" style={{ height: "500px" }} />
        <Sidebar active={sidebar}/>
      </div>
    </>
  );
}

