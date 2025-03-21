<<<<<<< HEAD
const initialUtilisateursState = { utilisateurActuel: null };

const utilisateursReducer = (state = initialUtilisateursState, action) => {
=======
const initialState = {
  utilisateurs: [],
  loading: false,
  error: null
};

export const utilisateursReducer = (state = initialState, action) => {
>>>>>>> dev
  switch (action.type) {
    case 'DEFINIR_UTILISATEUR':
      return { utilisateurActuel: action.payload };
    case 'DECONNECTER_UTILISATEUR':
      return { utilisateurActuel: null };
    default:
      return state;
  }
<<<<<<< HEAD
};
=======
};

export default utilisateursReducer;
>>>>>>> dev
