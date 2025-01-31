import logo from "./logo.svg";
import "./App.css";
import Dropdown from "./components/shared/dropdown";
import { useState } from "react";
import BusinessOwnerDetails from "./pages/registration";

function App() {

  return (
    <div>
      <BusinessOwnerDetails />
    </div>
  );
}

export default App;
