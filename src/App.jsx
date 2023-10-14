import "./App.css";
import React from "react";
import db from "./services/firebase/firebase.js";
import { addDoc, collection } from "firebase/firestore";
import { useState, useEffect } from "react";

import Select from "./components/Select";

function App() {
  //campos del formulario
  const [name, setName] = useState("");
  const [apellidoPaterno, setApellidoPaterno] = useState("");
  const [apellidoMaterno, setApellidoMaterno] = useState("");
  const [selectedCarrera, setSelectedCarrera] = useState("");

  //errores del formulario
  const [errorName, setErrorName] = useState(null);
  const [errorApellidoPaterno, setErrorApellidoPaterno] = useState(null);
  const [errorApellidoMaterno, setErrorApellidoMaterno] = useState(null);

  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  function handleSelectChange(e) {
    setSelectedCarrera(e.target.value);
  }

  async function registrarAlumno(e) {
    e.preventDefault();
    const fields = Object.fromEntries(new window.FormData(e.target));
    console.log(fields);
    console.log(db);

    console.log(errorName);
    console.log(errorApellidoPaterno);
    console.log(errorApellidoMaterno);

    await addDoc(collection(db, "alumnos"), fields);
  }

  function handleChange(e) {
    const newQuery = e.target.value;
    if (newQuery.startsWith(" ")) return;
    if (e.target.name === "nombre") {
      setName(newQuery);
      return;
    }
    if (e.target.name === "apellidoPaterno") {
      setApellidoPaterno(newQuery);
      return;
    }
    if (e.target.name === "apellidoMaterno") {
      setApellidoMaterno(newQuery);
      return;
    }
  }

  function handleBlur(e) {
    const newQuery = e.target.value;
    const name = e.target.name;
    if (newQuery === "") {
      if (name === "nombre") {
        setErrorName("Se requiere el ingreso de un nombre válido");
        return;
      }

      if (name === "apellidoPaterno") {
        setErrorApellidoPaterno("Se requiere el ingreso de un apellido válido");
        return;
      }

      if (name === "apellidoMaterno") {
        setErrorApellidoMaterno("Se requiere el ingreso de un apellido válido");
        return;
      }
    }
  }

  const nameRegex = /^[a-zA-ZÀ-ÿ\s]{1,30}$/;
  useEffect(() => {
    setErrorName(null); // Limpia el error de nombre al principio

    if (name && !nameRegex.test(name)) {
      console.log("error");
      setErrorName(
        "El nombre no puede contener números ni caracteres especiales"
      );
    }
  }, [name]);

  useEffect(() => {
    setErrorApellidoPaterno(null); // Limpia el error del apellido paterno al principio

    if (apellidoPaterno && !nameRegex.test(apellidoPaterno)) {
      setErrorApellidoPaterno(
        "El apellido paterno no puede contener números ni caracteres especiales"
      );
    }
  }, [apellidoPaterno]);

  useEffect(() => {
    setErrorApellidoMaterno(null); // Limpia el error del apellido materno al principio

    if (apellidoMaterno && !nameRegex.test(apellidoMaterno)) {
      setErrorApellidoMaterno(
        "El apellido materno no puede contener números ni caracteres especiales"
      );
    }
  }, [apellidoMaterno]);

  useEffect(() => {
    console.log(selectedCarrera);
    if (selectedCarrera === "") {
      setIsButtonDisabled(true);
      return;
    }

    if (
      errorName === null &&
      errorApellidoPaterno === null &&
      errorApellidoMaterno === null &&
      name !== "" &&
      apellidoPaterno !== "" &&
      apellidoMaterno !== "" &&
      selectedCarrera !== ""
    ) {
      setIsButtonDisabled(false);
    }
  }, [errorName, errorApellidoPaterno, errorApellidoMaterno, selectedCarrera]);

  return (
    <main className="formulario-principal">
      <h1>Registro de Alumnos</h1>
      <form className="form-registro" onSubmit={registrarAlumno}>
        <fieldset className="seccion-form">
          <div>
            <label>Nombre</label>
            <label>{errorName}</label>
          </div>
          <input
            name="nombre"
            id="name"
            onChange={handleChange}
            onBlur={handleBlur}
            value={name}
          />
        </fieldset>

        <fieldset className="seccion-form">
          <div>
            <label>Apellido Paterno</label>
            <label>{errorApellidoPaterno}</label>
          </div>
          <input
            name="apellidoPaterno"
            id="apellidoPaterno"
            onChange={handleChange}
            onBlur={handleBlur}
            value={apellidoPaterno}
          />
        </fieldset>

        <fieldset className="seccion-form">
          <div>
            <label>Apellido Materno</label>
            <label>{errorApellidoMaterno}</label>
          </div>
          <input
            name="apellidoMaterno"
            id="apellidoMaterno"
            onChange={handleChange}
            onBlur={handleBlur}
            value={apellidoMaterno}
          />
        </fieldset>

        <fieldset className="seccion-form">
          <div>
            <label>Carrera</label>
            <label>Error</label>
          </div>
          <Select
            coleccion="carreras"
            nombre="carrera"
            onSelectChange={handleSelectChange}
          />
        </fieldset>

        <button type="submit" disabled={isButtonDisabled} id="btn-submit">
          Registrar
        </button>
      </form>
    </main>
  );
}

export default App;
