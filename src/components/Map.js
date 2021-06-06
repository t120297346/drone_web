import React, { useState, useEffect, useRef } from "react";
import { Button, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { IconContext } from 'react-icons';
import { Link } from 'react-router-dom';
import * as  FaIcons from 'react-icons/fa';
import './css/Sidebar.css'


export default function Map(props) {
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [sidebar, setSidebar] = useState(false);
  let prevMarkersRef = useRef([]);
  let prevCirclesRef = useRef([]);

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

  let createCircle = (latlng, map) => {
    return new window.google.maps.Circle({
      strokeColor: "#FF0000",
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: "#FF0000",
      fillOpacity: 0.35,
      map: map,
      center: latlng,
      radius: 300,
      editable: true,
    });
  }

  // Removes the markers from the map.
  let clearMarkers = (markers) => {
    for (let m of markers) {
      m.setMap(null);
    }
  }
  // Removes the circles from the map.
  let clearCircles = (circles) => {
    for (let c of circles) {
      c.setMap(null);
    }
  }

  let build_interactive_map = (latlng, zoom = 4) => {
    const google = window.google;
    const cur_map = new google.maps.Map(document.getElementById("map"), {
      zoom: zoom,
      center: latlng,
    });
    addMapListener(cur_map)

    return cur_map;
  }
  let addMapListener = (map) => {
    const google = window.google;
    map.addListener("click", (e) => {
      setSidebar(true);
      const marker = createMarker(e.latLng, map);
      const cir = createCircle(e.latLng, map);
      google.maps.event.addListener(cir, "radius_changed", () => {console.log(cir.getRadius())});
      clearMarkers(prevMarkersRef.current);
      clearCircles(prevCirclesRef.current);
      prevMarkersRef.current.push(marker);
      prevCirclesRef.current.push(cir);
    });
  }

  let handleSubmit = () => {
    const google = window.google;
    var position = new google.maps.LatLng(lat, lng);
    const cur_map = build_interactive_map(position, 18);
    const marker = createMarker(position, cur_map);
    clearMarkers(prevMarkersRef.current);
    prevMarkersRef.current.push(marker);
  }
  
  // Material UI Style
  const inputStyles = makeStyles((theme) => ({
    root: {
      height: "10px",
      width: "120px",
      margin: "10px 10px 58px 10px"
    },
  }));

  const buttonStyles = makeStyles((theme) => ({
    root: {
      height: "40px",
      width: "100px",
      margin: "16px 0 0 10px",
      padding: "0 14px 0 0", 
    },
  }));

  let arrowIcon = {
    height: "30px",
    width: "30px",
    position: "relative",
    left: "100%",
    backgroundColor:"#060b26"
  }

  const showSidebar = () => {setSidebar(!sidebar);        console.log(sidebar)}

  const input_class = inputStyles();
  const button_class = buttonStyles();
  return (
    // Set a height on the map so it will display
    <>
      <div style={{ position: "relative", left: "35%" }}>
        <TextField className={input_class.root} id="outlined-primary" label="Latitude" variant="outlined" onChange={e => setLat(e.target.value)}/>
        <TextField className={input_class.root} id="outlined-primary" label="Longtitude" variant="outlined" onChange={e => setLng(e.target.value)}/>
        <Button
          className={button_class.root}
          variant="contained"
          color="primary"
          align="justify"
          onClick={handleSubmit}
        >
          {" "}Locate{" "}
        </Button>
      </div>
      <div>
        <div id="map" style={{height: "500px", zIndex: "60"}}/>
        <>
          <IconContext.Provider value={{color: '#fff'}}>
            <nav key={props.active} className={sidebar ? 'sidebar-menu active':'sidebar-menu'} style={{height: "500px", zIndex: "100"}}>
                <ul className="nav-menu-items">
                    <li>
                        <Link to="#" className="menu-bars">
                            <FaIcons.FaArrowLeft onClick={showSidebar} style={arrowIcon}/>
                        </Link>
                    </li>
                </ul>
            </nav>
          </IconContext.Provider>
        </>
        </div>
    </>
  );
}