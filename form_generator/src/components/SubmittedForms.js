// /src/components/SubmittedForms.js
import React from 'react';
import { connect } from 'react-redux';
import { editForm, deleteForm } from '../actions/formActions';
import "../App.css";
const SubmittedForms = (props) => {
  return (
    <div className="submitted-forms">
      <h2>Submitted Forms</h2>
      {props.submittedForms.map((submittedForm, index) => (
        <div key={index} className="submitted-form">
          <h3>Submitted Form {index + 1}</h3>
          <form>
            {submittedForm.map((field, fieldIndex) => (
              <div key={fieldIndex} className="form-field">
                <label>{field.label}</label>
                {/* Render appropriate input based on field type */}
                <input type={field.type} disabled />
              </div>
            ))}
          </form>
          {props.editingIndex !== index ? (
            <div className="form-actions">
              <button onClick={() => props.editForm(index)}>Edit Form</button>
              <button onClick={() => props.deleteForm(index)}>Delete Form</button>
            </div>
          ) : (
            <button onClick={() => props.editForm(-1)}>Save Changes</button>
          )}
        </div>
      ))}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    submittedForms: state.submittedForms,
    editingIndex: state.editingIndex,
  };
};

export default connect(mapStateToProps, { editForm, deleteForm })(SubmittedForms);
