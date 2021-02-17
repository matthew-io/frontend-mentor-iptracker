import React, { useState, useEffect } from "react";
import { Map, Marker, Popup, TileLayer } from "react-leaflet";
import { Icon } from "leaflet";
import icon from "../assets/icon-location.svg";
import "../styles/Main.css";

require("dotenv").config();

const axios = require("axios");

const Main = () => {
  const [position, setPosition] = useState([51.505, -0.09]);
  const [ipAddress, setIpAddress] = useState("");
  const [location, setLocation] = useState("");
  const [timezone, setTimezone] = useState("");
  const [isp, setIsp] = useState("");

  const locationIcon = new Icon({
    iconUrl: icon,
    iconSize: [30, 40],
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    getData();
  };

  const getData = async () => {
    setLocation("Loading...");
    setTimezone("Loading...");
    setIsp("Loading...");
    const res = await axios.get(
      `https://geo.ipify.org/api/v1?apiKey=at_MTuJRONmQHDLShMc5M4NJqAktBLB1&ipAddress=${ipAddress}`
    );
    setPosition([res.data.location.lat, res.data.location.lng]);
    setLocation(`${res.data.location.country}`, `${res.data.location.region}`);
    setTimezone(`GMT(${res.data.location.timezone})`);
    setIsp(res.data.isp);
  };

  useEffect(() => {
    setPosition(position);
  }, [getData]);

  return (
    <div className="container">
      <div className="main__box">
        <h1 className="main__heading">IP Address Tracker</h1>
        <form className="main__form" onSubmit={handleSubmit}>
          <input
            value={ipAddress}
            onChange={(e) => setIpAddress(e.target.value)}
            type="text"
            placeholder="Search for any IP address or domain"
            className="main__input"
            maxLength="15"
          ></input>
          <button type="submit" class="main__btn">
            <svg xmlns="http://www.w3.org/2000/svg" width="11" height="14">
              <path
                fill="none"
                stroke="#FFF"
                stroke-width="3"
                d="M2 1l6 6-6 6"
              />
            </svg>
          </button>
        </form>
        <div className="main__info">
          <div className="info__grid">
            <div className="info__column">
              <p className="info__heading">IP ADDRESS</p>
              <h1 className="info__value">{ipAddress}</h1>
            </div>
            <div className="info__column">
              <p>LOCATION</p>
              <h1 className="info__value">{location}</h1>
            </div>
            <div className="info__column">
              <p>TIMEZONE</p>
              <h1 className="info__value">{timezone}</h1>
            </div>
            <div className="info__column">
              <p>ISP</p>
              <h1 className="info__value">{isp}</h1>
            </div>
          </div>
        </div>
      </div>

      <div className="map__container">
        <div id="map">
          <Map center={position} zoom={14}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={position} icon={locationIcon}>
              <Popup>
                A pretty CSS3 popup.
                <br />
                Easily customizable.
              </Popup>
            </Marker>
          </Map>
        </div>
      </div>
    </div>
  );
};

export default Main;
