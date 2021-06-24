import React, { useState, useEffect, useRef } from "react";
import { Button, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { ImCross } from "react-icons/im";
import './css/Sidebar.css'


export default function Map(props) {
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [image, setImage] = useState(null);
  let prevMarkersRef = useRef([]);
  let prevCirclesRef = useRef([]);
  let prevImagedatasRef = useRef([]);
  
  useEffect(() => {
    const google = window.google;

    // Create an instance of the map
    const ntu = new google.maps.LatLng(25.016887239107156, 121.53854038997201);
    // The map, centered at Uluru
    const cur_map = build_interactive_map(ntu);

    prevMarkersRef.current = clearRefs(prevMarkersRef.current);

  }, [])// eslint-disable-line react-hooks/exhaustive-deps


  let createMarker = (latlng, map) => {
    var marker = new window.google.maps.Marker({
      position: latlng,
      map: map
    });
  
    marker.addListener("click", () => {
      const lat = marker.getPosition().lat()
      const lng = marker.getPosition().lng()
      var data = {
        'coordinates': [parseFloat(lng), parseFloat(lat)]
      }
      var url = 'http://localhost:5000/get_image'
      fetch(url, {
        method: "POST",
        body: JSON.stringify(data),
        headers: new Headers({
          "Content-Type": "application/json",
        }),
      })
      .then((res) => {
        return res.json();
      })
      .catch((error) => console.error("Error:", error))
      .then((response) => {
        setImage(response[0])
      })
    });
    return marker;
  }

  let createCircle = (latlng, map) => {
    var cir = new window.google.maps.Circle({
      strokeColor: "#FF0000",
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: "#FF0000",
      fillOpacity: 0.35,
      map: map,
      center: latlng,
      radius: 30,
      editable: true,
    });
    filter_range_image(latlng.lat(), latlng.lng(), cir.getRadius(), map)
    return cir
  }

  // Removes the items from the map.
  let clearRefs = (markers) => {
    for (let m of markers) {
      m.setMap(null);
    }
    markers = []
    return markers;
  }

  let filter_range_image = (lat, lng, radius, map) => {
    const url = "http://localhost:5000/compare_radius";
    var data = {
      'origin':{
        'type': 'Point',
        'coordinates': [parseFloat(lng), parseFloat(lat)]
      },
      'radius': parseFloat(radius)
    }
    fetch(url, {
      method: "POST",
      body: JSON.stringify(data),
      headers: new Headers({
        "Content-Type": "application/json",
      }),
    })
    .then((res) => {
      return res.json();
    })
    .catch((error) => console.error("Error:", error))
    .then((response) => {
      if (response.length > 0){
        prevImagedatasRef.current = clearRefs(prevImagedatasRef.current)
        for(var i = 0; i < response.length; i++){
          var lat = response[i].coordinates[1]
          var lng = response[i].coordinates[0]
          var img_data = createMarker({lat: lat, lng: lng}, map)
          prevImagedatasRef.current.push(img_data);
        }
      }
    })
  }

  let build_interactive_map = (latlng, zoom = 16) => {
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
      prevMarkersRef.current = clearRefs(prevMarkersRef.current);
      prevCirclesRef.current = clearRefs(prevCirclesRef.current);
      prevImagedatasRef.current = clearRefs(prevImagedatasRef.current);

      const marker = createMarker(e.latLng, map);
      const cir = createCircle(e.latLng, map);
      google.maps.event.addListener(cir, "radius_changed", () => {
        filter_range_image(e.latLng.lat(), e.latLng.lng(), cir.getRadius(), map)
      });
      prevMarkersRef.current.push(marker);
      prevCirclesRef.current.push(cir);
    });
  }

  let handleSubmit = () => {
    const google = window.google;
    var position = new google.maps.LatLng(lat, lng);
    const cur_map = build_interactive_map(position, 18);
    const marker = createMarker(position, cur_map);
    prevMarkersRef.current = clearRefs(prevMarkersRef.current);
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

  let image_data = {
    position: 'absolute',
    top: '0px',
    left: '0px',
    height: "100vh",
    width: "100%",
    backgroundColor:"#272727",
    zIndex: 120,
  }

  let image_style = {
    display: 'block',
    maxWidth:'50%',
    height:'auto',
    marginLeft:'auto',
    marginRight:'auto',
    marginTop: '90px'
  }

  let cross_icon_style = {
    position: "absolute",
    left: "97%",
    color: "#FFFFFF",
    height: "20px",
    width: "20px",
    marginTop: "20px"
  }

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
      </div>
      {image && (
        <div style={image_data}>
          <ImCross style={cross_icon_style} onClick={() => {setImage(null)}}/>
          <img className="rounded-md w-full" src={image} style={image_style}/>
        </div>
      )}

    </>
  );
}