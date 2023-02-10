import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios ";
import getRamdonLocations from "./utils/getRamdonLocations";
import LocationInfo from "./components/LocationInfo";
import ResidentsInfo from "./components/ResidentsInfo";
import terryicon from "../src/assets/terryicon.png";
import morty from "../src/assets/morty.png";
import Video from "../src/components/Video";


function App() {
  const [location, setLocation] = useState();
  const [numberLocation, setNumberLocation] = useState(getRamdonLocations());
  const [hasError, setHasError] = useState(false);
  const [listLocation, setListLocation] = useState();
 

  useEffect(() => {
    const url = `https://rickandmortyapi.com/api/location/${numberLocation}`;
    axios
      .get(url)
      .then((res) => {
        setLocation(res.data);
        setHasError(false);
      })
      .catch((err) => {
        console.log(err);
        setHasError(true);
      })
  }, [numberLocation]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (e.target.inputLocation.value.trim().length === 0) {
      setNumberLocation(getRamdonLocations());
    } else {
      setNumberLocation(e.target.inputLocation.value.trim());
    }
    e.target.inputLocation.value = e.target.inputLocation.value.trim();
  };

  const handleChange = (e) => {
    const url = `https://rickandmortyapi.com/api/location/?name=${e.target.value.trim()}`;
    axios
      .get(url)
      .then((res) => setListLocation(res.data.results))
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div className="app">
       
        <>
          <div>
            <img className="app__imgn " src={morty} />
          </div>
          <form className="form" onSubmit={handleSubmit}>
            <input
              className="form__input"
              id="inputLocation"
              type="text"
              //onChange={handleChange}
            />
            <button className="form__btn">Search</button>
          </form>
          {
            <ul>
              {listLocation?.map((loc) => (
                <li onClick={() => setNumberLocation(loc.id)} key={loc.id}>
                  {loc.name}
                </li>
              ))}
            </ul>
          }
          {hasError ? (
            <article>
              <h2 className="app__error">
                From 1 to 126 if Terry doesn't come for you 🤔{" "}
              </h2>
              <img className="app__terry" src={terryicon} />
            </article>
          ) : (
            <>
              <LocationInfo location={location} />
              <div className=" users__container">
                {location?.residents.map((url) => (
                  <ResidentsInfo key={url} url={url} />
                ))}
                <Video />
              </div>
            </>
          )}
        </>
      </div>
    </>
  );
}

export default App;
