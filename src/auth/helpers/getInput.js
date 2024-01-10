

export const getInput = () => {

  const inputLogin = [
    {
      name: 'email',
      name2: 'email',
      type: 'email'
    },
    {
      name: 'password',
      name2: 'Contraseña',
      type: 'password'
    }
  ];
  const inputRegister =[
    {
      name: 'name',
      name2: 'nombre',
      type:'text'
    },
    {
      name: 'lastName',
      name2: 'apellido',
      type:'text'
    },
    {
      name: 'email',
      name2: 'email',
      type:'email'
    },
    {
      name: 'emailConfirmation',
      name2: 'confirmacion email',
      type:'email'
    },
    {
      name: 'phoneNumber',
      name2: 'numero de telefono',
      type:'number'
    },
    {
      name: 'address',
      name2: 'direccion',
      type:'text'
    },
    {
      name: 'password',
      name2: 'contraseña',
      type:'password'

    },
    {
      name: 'paswordConfirmation',
      name2: 'confirmacion contraseña',
      type:'password'
    },
  ]

  return {
    inputLogin,
    inputRegister
  };
};
