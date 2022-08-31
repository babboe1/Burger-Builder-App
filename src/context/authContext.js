import React from 'react';

const authContext = React.createContext({
   addIngredient: () => { },
   removeIngredient: () => { }
});

export default authContext;