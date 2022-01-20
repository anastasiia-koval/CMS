import React, { useCallback, useState, useContext } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import axios from "axios";
import Geocode from "react-geocode";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import PinIcon from "@material-ui/icons/Room";
import { ThemeContext } from "../../context/Theme/ThemeState";
import { useEffect } from "react";
import Loading from "../Loading/Loading";
import { useTheme } from "@material-ui/core/styles";
const { REACT_APP_MY_ENV, REACT_APP_GOOGLE_MAPS_API_KEY } = process.env;

const GoogleMaps = (props) => {
  const [clickedMarker, setClickedMarker] = useState();
  const [center, setLocation] = useState([]);
  const [locations, setLocations] = useState([]);
  Geocode.setApiKey(REACT_APP_GOOGLE_MAPS_API_KEY);
  const { openSnackbar } = useContext(ThemeContext);
  const theme = useTheme();
  const containerStyle = {
    width: "100%",
    height: "300px",
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[3],
  };

  useEffect(() => {
    axios
      .get(`${REACT_APP_MY_ENV}/locations`)
      .then((res) => {
        setLocations(res.data);
        const coordinates = [];
        res.data.forEach((location) => {
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
    googleMapsApiKey: REACT_APP_GOOGLE_MAPS_API_KEY,
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
    <React.Fragment>
      <Typography variant="h2" component="h2">
        Gdzie nas znaleźć?
      </Typography>
      <List>
        {locations.map((location) => (
          <ListItem key={location.id}>
            <ListItemIcon>
              <PinIcon />
            </ListItemIcon>
            <ListItemText>{location.streetName}</ListItemText>
          </ListItem>
        ))}
      </List>
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
    </React.Fragment>
  ) : (
    <></>
  );
};

export default GoogleMaps;
