import React, { Component } from "react";
import { Input, Button} from "antd";
import "antd/dist/antd.css";

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
    const google = window.google;

    // Create an instance of the map
    const uluru = { lat: -25.344, lng: 131.036 };
    // The map, centered at Uluru
    var map = new google.maps.Map(this.mapRef.current, {
      zoom: 4,
      center: uluru,
    });
    this.setState({ map: this.map });
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
    const google = window.google;

    var position = new google.maps.LatLng(this.state.lat, this.state.lng);
    var map = new google.maps.Map(this.mapRef.current, {
      zoom: 18,
      center: position,
    });

    const marker = new google.maps.Marker({
      position: position,
      map: map,
    });

    this.setState({map: this.map});
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
