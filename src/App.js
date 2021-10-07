
import { getAuth, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendEmailVerification, sendPasswordResetEmail } from "firebase/auth";
import { useState } from "react";
import './App.css';
import initializeAuthentication from './Firebase/firebase.initialize';
initializeAuthentication();

const googleProvider = new GoogleAuthProvider();
function App() {
  const auth = getAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLogIn, setIsLogIn] = useState(false);

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
  const toggleLogin = (e) => {
    setIsLogIn(e.target.checked);
  }


  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  }

  const handlePasswordChange = e => {
    setPassword(e.target.value);
  }

  const handleSignUp = (e) => {
    e.preventDefault();
    console.log(email, password);
    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }
    if (!/(?=.*[A-Z].*[A-Z])/.test(password)) {
      setError('Password must contain 2 upper letter');
      return;
    }
    isLogIn ? processLogIn(email, password) : registerNewUser(email, password);
  }

  const processLogIn = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {

        const user = result.user;
        console.log(user);
        setError('');
      })

      .catch(error => {
        setError(error.message);
      })
  }

  const registerNewUser = (email, password) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {

        const user = result.user;
        console.log(user);
        setError('');
        verifyEmail();
      })

      .catch(error => {
        setError(error.message);
      })
  }

  const verifyEmail = () => {
    sendEmailVerification(auth.currentUser)
      .then(result => {
        console.log(result);
      })
  }
  const handleResetPassword = () => {
    sendPasswordResetEmail(auth, email)
      .then(res => {

      })
  }

  return (
    <div className='mx-5 my-5  '>
      <h3 className='text-center text-primary mb-4'>Please {(isLogIn) ? "Sign In" : 'Sign Up'}</h3>
      <form onSubmit={handleSignUp}>
        <div className="row mb-3 d-flex justify-content-center ">
          <label htmlFor="inputEmail3" className="col-sm-1 col-form-label"><strong>Email: </strong></label>
          <div className="col-sm-4">
            <input onBlur={handleEmailChange} type="email" className="form-control" id="inputEmail3" required />
          </div>
        </div>
        <div className="row mb-3 d-flex justify-content-center">
          <label htmlFor="inputPassword3" className="col-sm-1 col-form-label"><strong>Password: </strong></label>
          <div className="col-sm-4">
            <input onBlur={handlePasswordChange} type="password" className="form-control" id="inputPassword3" required />
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-sm-8 offset-sm-2  d-flex justify-content-center">
            <div className="form-check">
              <input onChange={toggleLogin} className="form-check-input" type="checkbox" id="gridCheck1" />
              <label className="form-check-label" htmlFor="gridCheck1">
                Already registered?
              </label>
            </div>
          </div>
        </div>
        <div className="row mb-3 text-center text-danger">
          <p>{error}</p>
        </div>
        <div className=" d-flex justify-content-center">
          <button type="submit" className="btn btn-primary ">{(isLogIn) ? 'Sign In' : "Sign Up"}</button>

          <button onClick={handleResetPassword} type="button" className="btn btn-secondary btn-sm ms-4">Reset Password</button>
        </div>

      </form>

      <div className='text-center'>
        <br /><br /><br />
        <div>--------------------------------</div>
        <br /><br /><br />
        <br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
        <button onClick={handleGoogleSignIn}>Google Sign In</button>
      </div>

    </div>
  );
}

export default App;
