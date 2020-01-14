import React, { useState } from 'react';
import './ConstructionSiteForm.css';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { faWindowClose } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

function ConstructionSiteForm({ id, coords, incomingData }) {

  const stateConstruction = ['PROSPECTION', 'EN COURS', 'ANNULE', 'TERMINE'];
  const typeUsageList = ['V1', 'V2', 'V1 ET V2', 'AUTRE'];
  const yearsList = ['2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022'];
  const typeGraveList = ['MACHEFER', 'AUTRE'];
  const [name, setName] = useState(incomingData ? incomingData.name : '');
  const [status, setStatus] = useState(incomingData ? incomingData.status : stateConstruction[0]);
  const [year, setYear] = useState(incomingData ? incomingData.year : Number(yearsList[0]));
  const [buyer, setBuyer] = useState(incomingData ? incomingData.buyer : '');
  const [contact, setContact] = useState(incomingData ? incomingData.contact : '');
  const [num_conv, setNumConv] = useState(incomingData ? incomingData.num_conv : '');
  const [date_sign, setDateSign] = useState(incomingData ? incomingData.date_sign : '');
  const [type_grave, setTypeGrave] = useState(incomingData ? incomingData.type_grave : typeGraveList[0]);
  const [type_usage, setTypeUsage] = useState(incomingData ? incomingData.type_usage : typeUsageList[0]);
  const [departement, setDepartement] = useState(incomingData ? incomingData.departement : '');
  const [project_manager, setProjectManager] = useState(incomingData ? incomingData.project_manager : '');
  const [commentary, setCommentary] = useState(incomingData ? incomingData.commentary : '');
  const [area, setArea] = useState(incomingData ? incomingData.area : '');
  const [photo, setPhoto] = useState(incomingData ? incomingData.photo : '');
  const [lots, setLots] = useState(incomingData ? incomingData.lots : '');
  const [tonnage, setTonnage] = useState(incomingData ? incomingData.tonnage : '');
  // replace all those useState by a spread
  // useReducer instead of all those useState
  // useEffect on id if yes fetch datas & update state.
  // reenforce back in terms of security (typeOf)
  // table stockage variables names & map on match to store values 
  // need to see which res are send
  const addHandleSubmit = (e) => {
    e.preventDefault();
    axios.post('/api/v1/construction-sites', { name, coords, status, buyer, contact, num_conv, date_sign, type_grave, year, type_usage, departement, project_manager, commentary, area, photo, lots, tonnage, })
      // Refresh de la page si l'envoie à fonctionné
      .then((res) => (res.status === 200 ? window.location.reload() : alert('Error on request')));
  };

  const editHandleSubmit = (event) => {
    // Evite un refresh dont on a pas besoin et permet d'éxécuter les requêtes
    event.preventDefault();
    axios.put(`/api/v1/construction-sites/${id}`, { name, coords, status, buyer, contact, num_conv, date_sign, type_grave, year, type_usage, departement, project_manager, commentary, area, photo, lots, tonnage, })
      // Refresh page if request is OK
      .then((res) => (res.status === 200 ? window.location.reload() : alert('Error on request')));
  };

  return (
    <div className="ConstructionSiteForm">
      {/* Icone to close popup and refresh page */}
      <Icon
        className="ConstructionSiteForm__icon"
        icon={faWindowClose}
        onClick={() => window.location.reload()}
      />
      <div className="ConstructionSiteForm__header">
        <h1 className="ConstructionSiteForm__header-title">{id ? 'Édition de chantier' : 'Création de chantier'}</h1>
      </div>
      <div className="ConstructionSiteForm__content">
        <form className="ConstructionSiteForm__form" onSubmit={id ? editHandleSubmit : addHandleSubmit}>
          <label class="has-float-label" htmlFor="name">Nom du chantier</label>
          <input class="ConstructionSiteForm__form--input" type="text" name="name" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
          <label class="has-float-label" htmlFor="status">Etat du chantier</label>
          <select class="ConstructionSiteForm__form--input" type="text" name="status" id="status" value={status} onChange={(e) => setStatus(e.target.value)}>
            {stateConstruction.map((data) => (
              <option key={data} value={data}>
                {data}
              </option>
            ))}
          </select>
          <label class="has-float-label" htmlFor="year">Année</label>
          <select class="ConstructionSiteForm__form--input" type="text" name="year" id="year" value={year} onChange={(e) => setYear(e.target.value)}>
            {yearsList.map((data) => (
              <option key={data} value={data}>
                {data}
              </option>
            ))}
          </select>
          <label class="has-float-label" htmlFor="buyer">Demandeur</label>
          <input class="ConstructionSiteForm__form--input" type="text" name="buyer" id="buyer" value={buyer} onChange={(e) => setBuyer(e.target.value)} />
          <label class="has-float-label" htmlFor="contact">Contact</label>
          <input class="ConstructionSiteForm__form--input" type="text" name="contact" id="contact" value={contact} onChange={(e) => setContact(e.target.value)} />
          <label class="has-float-label" htmlFor="numConv">Numéro de convention</label>
          <input class="ConstructionSiteForm__form--input" type="text" name="num_conv" id="numConv" value={num_conv} onChange={(e) => setNumConv(e.target.value)} />
          <label class="has-float-label" htmlFor="dateSign">date de signature</label>
          <input class="ConstructionSiteForm__form--input" type="text" name="date_sign" id="dateSign" value={date_sign} onChange={(e) => setDateSign(e.target.value)} />
          <label class="has-float-label" htmlFor="typeGrave">Type grav</label>
          <select class="ConstructionSiteForm__form--input" type="text" name="type_grave" id="typeGrave" value={type_grave} onChange={(e) => setTypeGrave(e.target.value)}>
            {typeGraveList.map((data) => (
              <option key={data} value={data}>
                {data}
              </option>
            ))}
          </select>
          <label class="has-float-label" htmlFor="typeUsage">Type d'usage</label>
          <select class="ConstructionSiteForm__form--input" type="text" name="type_usage" id="typeUsage" value={type_usage} onChange={(e) => setTypeUsage(e.target.value)}>
            {typeUsageList.map((data) => (
              <option key={data} value={data}>
                {data}
              </option>
            ))}
          </select>
          <label class="has-float-label" htmlFor="departement">Département</label>
          <input class="ConstructionSiteForm__form--input" type="text" name="departement" id="departement" value={departement} onChange={(e) => setDepartement(e.target.value)} />
          <label class="has-float-label" htmlFor="projectManager">Maître d'ouvrage</label>
          <input class="ConstructionSiteForm__form--input" type="text" name="project_manager" id="projectManager" value={project_manager} onChange={(e) => setProjectManager(e.target.value)} />
          <label class="has-float-label" htmlFor="commentary">Commentaire</label>
          <input class="ConstructionSiteForm__form--input" type="text" name="commentary" id="commentary" value={commentary} onChange={(e) => setCommentary(e.target.value)} />
          <label class="has-float-label" htmlFor="area">Surface</label>
          <input class="ConstructionSiteForm__form--input" type="text" name="area" id="area" value={area} onChange={(e) => setArea(e.target.value)} />
          <label class="has-float-label" htmlFor="photo">Photo</label>
          <input class="ConstructionSiteForm__form--input" type="text" name="photo" id="photo" value={photo} onChange={(e) => setPhoto(e.target.value)} />
          <label class="has-float-label" htmlFor="lot">lot</label>
          <input class="ConstructionSiteForm__form--input" type="text" name="lots" id="lot" value={lots} onChange={(e) => setLots(e.target.value)} />
          <label class="has-float-label" htmlFor="tonnage">Tonnage</label>
          <input class="ConstructionSiteForm__form--input" type="text" name="tonnage" id="tonnage" value={tonnage} onChange={(e) => setTonnage(e.target.value)} />
          <button type="submit">
            Valider
            </button>
        </form>
      </div>
    </div>
  );
}

export default ConstructionSiteForm;
