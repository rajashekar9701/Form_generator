// /src/components/FormPreview.js
import React from 'react';
import { connect } from 'react-redux';
import "../App.css";
const FormPreview = (props) => {
  return (
    <div className="form-preview-panel">
      <h2>Form Preview</h2>
      <form>
        {props.formFields.map((field, index) => (
          <div className="form-field" key={index}>
            <label>{field.label}</label>
            {/* Render appropriate input based on field type */}
            <input type={field.type} />
          </div>
        ))}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    formFields: state.formFields,
  };
};

export default connect(mapStateToProps)(FormPreview);
