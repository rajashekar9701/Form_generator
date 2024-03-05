// /src/actions/formActions.js
export const addFormField = (field) => {
    return {
      type: 'ADD_FORM_FIELD',
      payload: field,
    };
  };
  
  export const removeFormField = (index) => {
    return {
      type: 'REMOVE_FORM_FIELD',
      payload: index,
    };
  };
  
  export const submitForm = (formFields) => {
    return {
      type: 'SUBMIT_FORM',
      payload: formFields,
    };
  };
  
  export const editForm = (index) => {
    return {
      type: 'EDIT_FORM',
      payload: index,
    };
  };
  
  export const deleteForm = (index) => {
    return {
      type: 'DELETE_FORM',
      payload: index,
    };
  };
  