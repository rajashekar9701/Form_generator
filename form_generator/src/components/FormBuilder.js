// /src/components/FormBuilder.js
import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
  addFormField,
  removeFormField,
  submitForm,
} from '../actions/formActions';
import "../App.css";

const FormBuilder = (props) => {
  const [newField, setNewField] = useState({ label: '', type: 'text' });

  const handleFieldChange = (key, value) => {
    setNewField({ ...newField, [key]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.addFormField(newField);
    setNewField({ label: '', type: 'text' });
  };

  return (
    <div className="form-configuration-panel">
      <h2>Form Configuration</h2>
      <form onSubmit={handleSubmit}>
        <label>Label:</label>
        <input
          type="text"
          value={newField.label}
          onChange={(e) => handleFieldChange('label', e.target.value)}
        />
        <label>Type:</label>
        <select
          value={newField.type}
          onChange={(e) => handleFieldChange('type', e.target.value)}
        >
          <option value="text">Text Input</option>
          <option value="textarea">Text Area</option>
          <option value="number">Number</option>
           <option value="email">Email</option>
          <option value="password">Password</option>
          <option value="checkbox">Checkbox</option>
           <option value="radio">Radio Button</option>
          <option value="file">File Upload</option>
          {/* Add other field types as needed */}
        </select>
        <button type="submit">Add Form Field</button>
      </form>
      {props.formFields.map((field, index) => (
        <div className="form-field" key={index}>
          <p>{field.label}</p>
          <button onClick={() => props.removeFormField(index)}>Remove</button>
        </div>
      ))}
      <button onClick={() => props.submitForm(props.formFields)}>
        Submit Form
      </button>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    formFields: state.formFields,
  };
};

export default connect(mapStateToProps, {
  addFormField,
  removeFormField,
  submitForm,
})(FormBuilder);
