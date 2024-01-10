import React from 'react'

export const ButtonAuth = ({name, disabled}) => {
  return (
    <button type='submit' disabled={disabled} ><strong>{name}</strong></button>
  )
}
