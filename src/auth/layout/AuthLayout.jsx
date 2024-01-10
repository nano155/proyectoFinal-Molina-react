import { Link } from "react-router-dom"
import { ButtonAuth } from "../components/ButtonAuth"


export const AuthLayout = ({ children, nameAuth, message, messageRoute, nameButton, linkRouter, onHandleClick, onClose, Boton }) => {
  return (
    <section className='container-auth'>
      <div className='container'>{
        Boton && <button className="close" onClick={onClose}>x</button>
      }
        <div className='text'>
          <h1>{nameAuth}</h1>
        </div>
        <form onSubmit={onHandleClick}>
          {children}
          <ButtonAuth name={nameButton}  />
        </form>
        <div className='redireccion'>
          <Link to='/'><p><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-return-left" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M14.5 1.5a.5.5 0 0 1 .5.5v4.8a2.5 2.5 0 0 1-2.5 2.5H2.707l3.347 3.346a.5.5 0 0 1-.708.708l-4.2-4.2a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 8.3H12.5A1.5 1.5 0 0 0 14 6.8V2a.5.5 0 0 1 .5-.5" />
          </svg> Back</p></Link>
          <p>{message}<Link to={linkRouter}>{messageRoute}</Link></p>
        </div>
      </div>
    </section>
  )
}