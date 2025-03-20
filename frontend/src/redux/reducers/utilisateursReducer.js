const initialState = {
  utilisateurs: [],
  loading: false,
  error: null
};

export const utilisateursReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'DEFINIR_UTILISATEUR':
      return { utilisateurActuel: action.payload };
    case 'DECONNECTER_UTILISATEUR':
      return { utilisateurActuel: null };
    default:
      return state;
  }
};

export default utilisateursReducer;