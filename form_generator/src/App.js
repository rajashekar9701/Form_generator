// App.js
import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [formFields, setFormFields] = useState([]);
  const [submittedForms, setSubmittedForms] = useState([]);
  const [helperTexts, setHelperTexts] = useState([]);
  const [editingIndex, setEditingIndex] = useState(-1);

  useEffect(() => {
    const storedFormFields = JSON.parse(localStorage.getItem('formFields'));
    const storedSubmittedForms = JSON.parse(localStorage.getItem('submittedForms'));
    if (storedFormFields) {
      setFormFields(storedFormFields);
    }
    if (storedSubmittedForms) {
      setSubmittedForms(storedSubmittedForms);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('formFields', JSON.stringify(formFields));
  }, [formFields]);

  useEffect(() => {
    localStorage.setItem('submittedForms', JSON.stringify(submittedForms));
  }, [submittedForms]);

  const addFormField = () => {
    const newFormField = {
      label: '',
      type: 'text',
      options: ['Option 1', 'Option 2'],
      selectedOption: '', // Initialize selectedOption property
      checkedOptions: [],
      newOption: '',
    };
  
    // If the type is radio, set the selectedOption to the first option
    if (newFormField.type === 'radio' && newFormField.options.length > 0) {
      newFormField.selectedOption = newFormField.options[0];
    }
  
    setFormFields([...formFields, newFormField]);
  };
  
  
  
  

  const removeFormField = (index) => {
    const updatedFormFields = [...formFields];
    updatedFormFields.splice(index, 1);
    setFormFields(updatedFormFields);
  };

  const handleFieldChange = (index, key, value) => {
    const updatedFormFields = [...formFields];
    updatedFormFields[index][key] = value;
    setFormFields(updatedFormFields);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedHelperTexts = formFields.map((field, index) => {
      if (field.type === 'number' && isNaN(field.label)) {
        return `Invalid input for ${field.label}, should be numeric.`;
      }
      if (field.type === 'email' && !validateEmail(field.label)) {
        return `Invalid email format for ${field.label}.`;
      }
      if (field.type === 'password' && field.label.length < 8) {
        return `Password length should be at least 8 characters for ${field.label}.`;
      }
      return '';
    });
    setHelperTexts(updatedHelperTexts);
    setSubmittedForms([...submittedForms, formFields]);
    setFormFields([]);
  };

  const renderFormFields = () => {
    return formFields.map((field, index) => (
      <div className="form-field" key={index}>
        <label>Label: </label>
        <input
          type="text"
          value={field.label}
          onChange={(e) => handleFieldChange(index, 'label', e.target.value)}
        />
        <label style={{ marginLeft: "12px" }}>Type: </label>
        <select
          value={field.type} style={{ marginRight: "12px" }}
          onChange={(e) => handleFieldChange(index, 'type', e.target.value)}
        >
          <option value="text">Text Input</option>
          <option value="textarea">Text Area</option>
          <option value="number">Number</option>
          <option value="email">Email</option>
          <option value="password">Password</option>
          <option value="checkbox">Checkbox</option>
          <option value="radio">Radio Button</option>
          <option value="file">File Upload</option>
          <option value="dropdown">Dropdown</option>
        </select>
        {helperTexts[index] && <p className="helper-text">{helperTexts[index]}</p>}
        {field.type === 'dropdown' && (
          <div>
            <textarea
              value={field.options.join('\n')}
              onChange={(e) =>
                handleFieldChange(
                  index,
                  'options',
                  e.target.value.split('\n')
                )
              }
            ></textarea>
          </div>
        )}
        {['checkbox', 'radio'].includes(field.type) && (
          <div>
            {field.options.map((option, optionIndex) => (
              <div key={optionIndex}>
                <input
                  type={field.type}
                  id={`option-${index}-${optionIndex}`}
                  checked={field.checkedOptions && field.checkedOptions.includes(option)}
                  onChange={(e) => handleOptionChange(index, optionIndex, e.target.checked)}
                />
                <label htmlFor={`option-${index}-${optionIndex}`}>{option}</label>
                <button onClick={() => removeOption(index, optionIndex)}>Remove</button>
              </div>
            ))}
            <input
              type="text"
              value={field.newOption}
              onChange={(e) => handleNewOptionChange(index, e.target.value)}
            />
            <button onClick={() => addOption(index)}>Add Option</button>
          </div>
        )}
        <button onClick={() => removeFormField(index)}>Remove</button>
      </div>
    ));
  };
  
  const handleOptionChange = (fieldIndex, optionIndex, isChecked) => {
    const updatedFormFields = [...formFields];
    const field = updatedFormFields[fieldIndex];
    if (!field.checkedOptions) {
      field.checkedOptions = [];
    }
    const option = field.options[optionIndex];
    if (isChecked) {
      field.checkedOptions.push(option);
    } else {
      field.checkedOptions = field.checkedOptions.filter((item) => item !== option);
    }
    setFormFields(updatedFormFields);
  };
  
  const handleNewOptionChange = (fieldIndex, value) => {
    const updatedFormFields = [...formFields];
    updatedFormFields[fieldIndex].newOption = value;
    setFormFields(updatedFormFields);
  };
  
  const addOption = (fieldIndex) => {
    const updatedFormFields = [...formFields];
    const newOption = updatedFormFields[fieldIndex].newOption;
    if (newOption.trim() !== '') {
      updatedFormFields[fieldIndex].options.push(newOption);
      updatedFormFields[fieldIndex].newOption = '';
      setFormFields(updatedFormFields);
    }
  };
  
  const removeOption = (fieldIndex, optionIndex) => {
    const updatedFormFields = [...formFields];
    updatedFormFields[fieldIndex].options.splice(optionIndex, 1);
    setFormFields(updatedFormFields);
  };
  

  // const handleCheckboxChange = (fieldIndex, option, isChecked) => {
  //   const updatedFormFields = [...formFields];
  //   const field = updatedFormFields[fieldIndex];
  //   if (!field.checkedOptions) {
  //     field.checkedOptions = [];
  //   }
  //   if (isChecked) {
  //     field.checkedOptions.push(option);
  //   } else {
  //     field.checkedOptions = field.checkedOptions.filter((item) => item !== option);
  //   }
  //   setFormFields(updatedFormFields);
  // };
  const handleCheckboxChange = (fieldIndex, option, isChecked) => {
    const updatedFormFields = [...formFields];
    const field = updatedFormFields[fieldIndex];
    if (isChecked) {
      field.checkedOptions.push(option);
    } else {
      field.checkedOptions = field.checkedOptions.filter((item) => item !== option);
    }
    setFormFields(updatedFormFields);
  };
  const handleRadioChange = (fieldIndex, option) => {
    const updatedFormFields = [...formFields];
    const field = updatedFormFields[fieldIndex];
    field.selectedOption = option;
    setFormFields(updatedFormFields);
  };
  
  
  // const handleRadioChange = (fieldIndex, option) => {
  //   const updatedFormFields = [...formFields];
  //   const field = updatedFormFields[fieldIndex];
  //   field.selectedOption = option;
  //   setFormFields(updatedFormFields);
  // };

  const renderFormFieldInput = (field, index) => {
    switch (field.type) {
      case 'textarea':
        return <textarea></textarea>;
      case 'number':
        return <input type="number" />;
      case 'email':
        return <input type="email" />;
      case 'password':
        return <input type="password" />;
      case 'dropdown':
        return (
          <select>
            {field.options.map((option, optionIndex) => (
              <option key={optionIndex}>{option}</option>
            ))}
          </select>
        );
        case 'checkbox':
          return (
            <div>
              {field.options.map((option, optionIndex) => (
                <div key={optionIndex}>
                  <input
                    type="checkbox"
                    id={`checkbox-${index}-${optionIndex}`}
                    checked={field.checkedOptions.includes(option)}
                    onChange={(e) => handleCheckboxChange(index, option, e.target.checked)}
                  />
                  <label htmlFor={`checkbox-${index}-${optionIndex}`}>{option}</label>
                </div>
              ))}
            </div>
          );
        case 'radio':
          return (
            <div>
              {field.options.map((option, optionIndex) => (
                <div key={optionIndex}>
                  <input
                    type="radio"
                    id={`radio-${index}-${optionIndex}`}
                    name={`radio-${index}`}
                    checked={field.selectedOption === option}
                    onChange={() => handleRadioChange(index, option)}
                  />
                  <label htmlFor={`radio-${index}-${optionIndex}`}>{option}</label>
                </div>
              ))}
            </div>
          );
        
      case 'file':
        return <input type="file" />;
      default:
        return <input type="text" />;
    }
  };

  const renderSubmittedForms = () => {
    return submittedForms.map((submittedForm, index) => (
      <div key={index} className="submitted-form">
        <h2>Submitted Form {index + 1}</h2>
        <form>
          {submittedForm.map((field, fieldIndex) => (
            <div className="form-field" key={fieldIndex}>
              <label>{field.label}  :  </label>
              {renderFormFieldInput(field, fieldIndex)}
            </div>
          ))}
          {editingIndex !== index ? (
            <div className="form-actions">
              <button className="btn" onClick={() => setEditingIndex(index)}>
                Edit Form
              </button>
              <button className="btn" onClick={() => deleteSubmittedForm(index)}>
                Delete Form
              </button>
            </div>
          ) : (
            <button className="btn" onClick={() => saveEditedForm(index)}>
              Save Changes
            </button>
          )}
        </form>
      </div>
    ));
  };

  const deleteSubmittedForm = (index) => {
    const updatedSubmittedForms = [...submittedForms];
    updatedSubmittedForms.splice(index, 1);
    setSubmittedForms(updatedSubmittedForms);
  };

  const saveEditedForm = (index) => {
    const updatedSubmittedForms = [...submittedForms];
    updatedSubmittedForms[index] = formFields;
    setSubmittedForms(updatedSubmittedForms);
    setEditingIndex(-1);
  };

  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  return (
    <div className="App">
      <header className="header">Dynamic Form Generator</header>
      <div className="container">
        <div className="form-builder">
          <div className="form-configuration-panel">
            <h2>Form Configuration</h2>
            <button className="btn" onClick={addFormField} style={{marginBottom:"12px"}}>
              Add Form Field
            </button>
            {renderFormFields()}
            <button className="btn" onClick={handleSubmit}>
              Submit Form
            </button>
          </div>
          <div className="form-preview-panel" style={{marginLeft:"12px"}}>
            <h2>Form Preview</h2>
            <form onSubmit={handleSubmit}>
              {formFields.map((field, index) => (
                <div className="form-field" key={index}>
                  <label>{field.label}</label>
                  {renderFormFieldInput(field, index)}
                </div>
              ))}
              <button className="btn" type="submit">
                Submit
              </button>
            </form>
          </div>
        </div>
        <div className="submitted-forms">
          <h2>Submitted Forms</h2>
          {renderSubmittedForms()}
        </div>
      </div>
      <footer className="footer">© 2024 Dynamic Form Generator</footer>
    </div>
  );
}

export default App;
