import React, { useCallback, useState, useContext } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import axios from "axios";
import Geocode from "react-geocode";
import { ThemeContext } from "../../context/Theme/ThemeState";
import { useEffect } from "react";
import Loading from "../Loading/Loading";
const { REACT_APP_MY_ENV } = process.env;

const GoogleMaps = (props) => {
  const [clickedMarker, setClickedMarker] = useState();
  const [center, setLocation] = useState([]);
  Geocode.setApiKey("AIzaSyC5NPc8U9dad27Gi6xIeygy2OUGHolWxoI");
  const { openSnackbar } = useContext(ThemeContext);
  const containerStyle = {
    width: "100%",
    height: "300px",
  };

  useEffect(() => {
    axios
      .get(`${REACT_APP_MY_ENV}/locations`)
      .then((res) => {
        const coordinates = [];
        res.data.map((location) => {
          Geocode.fromAddress(
            location.country + " " + location.city + " " + location.streetName
          )
            .then((res) => {
              coordinates.push({
                lat: res.results[0].geometry.location.lat,
                lng: res.results[0].geometry.location.lng,
              });
              setLocation((prev) => prev.concat(coordinates));
            })
            .catch((err) => {
              openSnackbar(true, "Wystąpił błąd. Spróbuj odświeżyć stronę.");
            });
        });
      })
      .catch((err) => {
        openSnackbar(true, "Wystąpił błąd. Spróbuj odświeżyć stronę.");
      });
  }, []);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyC5NPc8U9dad27Gi6xIeygy2OUGHolWxoI",
  });

  const [map, setMap] = useState(null);

  const onLoad = useCallback(function callback(map) {
    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);

  if (center.length === 0) {
    return <Loading />;
  }

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={{ lat: 52.229675, lng: 21.01223 }}
      zoom={11}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      {center.length !== 0 &&
        center.map((marker, key) => {
          return (
            <>
              <Marker
                key={key}
                position={marker}
                onClick={() => setClickedMarker(key)}
              />
              {clickedMarker === key && (
                <InfoWindow
                  position={marker}
                  onCloseClick={() => setClickedMarker(false)}
                >
                  <div>
                    <a
                      href={`http://maps.google.com/maps?z=12&t=m&q=loc:${marker.lat}+${marker.lng}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Visit on Google Maps
                    </a>
                  </div>
                </InfoWindow>
              )}
            </>
          );
        })}
    </GoogleMap>
  ) : (
    <></>
  );
};

export default GoogleMaps;
