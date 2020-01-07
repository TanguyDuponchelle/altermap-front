import React, { useState } from 'react';
import './ConstructionSiteForm.css';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { faWindowClose } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

function ConstructionSiteForm({ id, coords }) {
  const [name, setName] = useState('');
  const addHandleSubmit = (event) => {
    event.preventDefault();
    axios.post('https://altermap.osc-fr1.scalingo.io/api/v1/construction-sites', { name, coords })
    // Refresh page if request is OK
      .then((res) => (res.status === 200 ? window.location.reload() : alert('Error on request')));
  };

  const editHandleSubmit = (event) => {
    event.preventDefault();
    axios.put(`https://altermap.osc-fr1.scalingo.io/api/v1/construction-sites/${id}`, { name, coords })
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
          <label htmlFor="name">Nom du chantier</label>
          <input type="text" name="name" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
          <button type="submit">
            Valider
          </button>
        </form>
      </div>
    </div>
  );
}

export default ConstructionSiteForm;
