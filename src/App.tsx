import React from "react";

import "./App.css";
import Table from "./components/Table/Table";
import Canvas from "./components/Canvas/Canvas";
import { useAppSelector } from "./store/hooks";

function App() {
  const entities = useAppSelector((state) => state.entities.list);

  const coordinates = entities?.map((el) => {
    return {
      x: el.coordinates[0],
      y: el.coordinates[1],
    };
  });
  console.log(coordinates, "COOORDINATES");

  return (
    <div className="App">
      <Table />
      <main className="coordinate-container">
        <Canvas coordinates={coordinates} />
      </main>
    </div>
  );
}

export default App;
