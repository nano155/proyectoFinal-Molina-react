import React from 'react'


export const Input = ({name, name2, type, name2N, onChange, value, required}) => {
    
    return (
        <>
            <label htmlFor={name}>{name2N}</label>
            <input  value={value} onChange={onChange} id={name} name={name} placeholder={`Ingrese su ${name2}`} type={type} required={required} />
        </>
    )
}
