import "../styles/Main.css";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
  useMap,
} from "react-leaflet";

const Map = (data) => {
  console.log(data);

  return (
    <div class="map__container">
      <h1>YES</h1>
      {/* <MapContainer
        center={[`${lat}`, `${long}`]}
        zoom={15}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[`${lat}`, `${long}`]}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer> */}
    </div>
  );
};

export default Map;
