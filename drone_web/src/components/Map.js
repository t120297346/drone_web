import React, { Component } from "react";
import { Input, Button} from "antd";
import "antd/dist/antd.css";
import logo from "./icon/map_market.svg";

export default class Map extends Component {
  mapRef = React.createRef();

  constructor(props){
    super(props);
    this.state = {
      // The map instance to use during cleanup
      map: null,
      lat: null,
      lng: null,
    };
  }

  componentDidMount() {
    const H = window.H;
    const platform = new H.service.Platform({
      apikey: "i7G4jk5vgdGCCxMHjjfqh7mBR8CKGNn_-5qTXhVOJ-A",
    });

    const defaultLayers = platform.createDefaultLayers();

    // Create an instance of the map
    const map = new H.Map(
      this.mapRef.current,
      defaultLayers.vector.normal.map,
      {
        // This map is centered over Europe
        center: { lat: 25.03, lng: 121.3 },
        zoom: 10,
        pixelRatio: window.devicePixelRatio || 1,
      }
    );
    // MapEvents enables the event system
    // Behavior implements default interactions for pan/zoom (also on mobile touch environments)
    // This variable is unused and is present for explanatory purposes
    const behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

    // Create the default UI components to allow the user to interact with them
    // This variable is unused
    const ui = H.ui.UI.createDefault(map, defaultLayers);
    this.setState({ map });
  }

  componentWillUnmount() {
    // Cleanup after the map to avoid memory leaks when this component exits the page
    this.state.map.dispose();
  }
  handleChangeLatitude = (e) =>{
    this.setState({ lat: e.target.value });
  }

  handleChangeLongtitude = (e) =>{
    this.setState({ lng: e.target.value });
  }

  handleSubmit = () => {
    const H = window.H;
    var map = this.state.map;


    // Define a variable holding SVG mark-up that defines an icon image:

    // Create an icon, an object holding the latitude and longitude, and a marker:
    var icon = new H.map.Icon(logo, {
        size: { w: 60, h: 60 },
      }),
      coords = { lat: this.state.lat, lng: this.state.lng },
      marker = new H.map.Marker(coords, { icon: icon });

    console.log(icon);
    
    // Add the marker to the map and center the map at the location of the marker:
    map.addObject(marker);
    map.setCenter(coords);
    map.setZoom(19);

    this.setState({map});
  }

  render() {
    return (
      // Set a height on the map so it will display
      <>
        <div style={{ position: "relative", left: "35%" }}>
          <Input
            className="corordinate_form_item"
            id="Latitude"
            type="text"
            placeholder="Latitude"
            onChange={this.handleChangeLatitude}
            style={{ width: 200, margin: "10px" }}
          />
          <Input
            className="corordinate_form_item"
            id="Longtitude"
            type="text"
            placeholder="Longtitude"
            onChange={this.handleChangeLongtitude}
            style={{ width: 200, margin: "10px" }}
          />
          <Button
            type="primary"
            className="corordinate_form_item"
            onClick={this.handleSubmit}
          >
            {" "}
            Locate{" "}
          </Button>
        </div>
        <div ref={this.mapRef} style={{ height: "500px" }} />
      </>
    );
  }
}
