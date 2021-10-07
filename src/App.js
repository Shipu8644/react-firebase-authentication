
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useState } from "react";
import './App.css';
import initializeAuthentication from './Firebase/firebase.initialize';
initializeAuthentication();

const googleProvider = new GoogleAuthProvider();
function App() {
  const auth = getAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleGoogleSignIn = () => {
    signInWithPopup(auth, googleProvider)
      .then(result => {
        const user = result.user;
        console.log(user);
      })
      .catch(error => {
        console.log(error.message);
      })
  }


  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  }

  const handlePasswordChange = e => {
    setPassword(e.target.value);
  }

  const handleSignUp = (e) => {
    console.log(email, password);
    e.preventDefault();
  }

  return (
    <div className='mx-5 my-5  '>
      <h3 className='text-center text-primary mb-4'>Please Sign Up</h3>
      <form onSubmit={handleSignUp}>
        <div className="row mb-3 d-flex justify-content-center ">
          <label htmlFor="inputEmail3" className="col-sm-1 col-form-label"><strong>Email: </strong></label>
          <div className="col-sm-4">
            <input onBlur={handleEmailChange} type="email" className="form-control" id="inputEmail3" />
          </div>
        </div>
        <div className="row mb-3 d-flex justify-content-center">
          <label htmlFor="inputPassword3" className="col-sm-1 col-form-label"><strong>Password: </strong></label>
          <div className="col-sm-4">
            <input onBlur={handlePasswordChange} type="password" className="form-control" id="inputPassword3" />
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-sm-8 offset-sm-2  d-flex justify-content-center">
            <div className="form-check">
              <input className="form-check-input" type="checkbox" id="gridCheck1" />
              <label className="form-check-label" htmlFor="gridCheck1">
                Example checkbox
              </label>
            </div>
          </div>
        </div>
        <div className=" d-flex justify-content-center">
          <button type="submit" className="btn btn-primary  ">Sign in</button>
        </div>
      </form>
    </div>
  );
}

export default App;
