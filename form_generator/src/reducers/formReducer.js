// /src/reducers/formReducer.js
const initialState = {
    formFields: [],
    submittedForms: [], // Initialize submitted forms array
    editingIndex: -1,
  };
  
  const formReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'ADD_FORM_FIELD':
        return {
          ...state,
          formFields: [...state.formFields, action.payload],
        };
      case 'REMOVE_FORM_FIELD':
        const updatedFormFields = [...state.formFields];
        updatedFormFields.splice(action.payload, 1);
        return {
          ...state,
          formFields: updatedFormFields,
        };
      case 'SUBMIT_FORM':
        return {
          ...state,
          submittedForms: [...state.submittedForms, action.payload], // Add submitted form to the array
          formFields: [], // Clear formFields after submission
        };
      case 'EDIT_FORM':
        return {
          ...state,
          editingIndex: action.payload,
        };
      case 'DELETE_FORM':
        const updatedSubmittedForms = [...state.submittedForms];
        updatedSubmittedForms.splice(action.payload, 1);
        return {
          ...state,
          submittedForms: updatedSubmittedForms,
        };
      default:
        return state;
    }
  };
  
  export default formReducer;
  