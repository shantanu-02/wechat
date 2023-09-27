import "./register.scss";
import addImg from "../../../public/img/addAvatar.png";
import "firebase/firestore";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, storage, db } from "../../firebase";
import { useState } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";


const Register = () => {
    const [err, setErr] = useState (false)
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

   const handleSubmit = async (e) => {
        e.preventDefault();
        const displayName = e.target[0].value;
        const email = e.target[1].value;
        const password = e.target[2].value;
        const file = e.target[3].files[0];

        try {
            //Create user
            const res = await createUserWithEmailAndPassword(auth, email, password);
      
            //Create a unique image name
            const storageRef = ref(storage, displayName);
            await uploadBytesResumable(storageRef, file).then(() => {

                getDownloadURL(storageRef).then(async (downloadURL) => {

                  try {
                    //Update profile
                    await updateProfile(res.user, {
                      displayName,
                      photoURL: downloadURL,
                    });
                    
                   // create user on firestore
                    await setDoc(doc(db, "users", res.user.uid), {
                      uid: res.user.uid,
                      displayName,
                      email,
                      photoURL: downloadURL,
                    });

                    await setDoc(doc(db, "userChats", res.user.uid),{});
                    navigate("/");

                  } catch (err) {
                    console.log(err);
                    setErr(true);
                    setLoading(false);
                  }
                });
              });
            } catch (err) {
              setErr(true);
              setLoading(false);
            }
    };

    return (
      <div className="formContainer">
          <div className="formWrapper">
              <span className="logo">WE CHAT</span>
              <span className="title">Register</span>
              <form onSubmit={handleSubmit}>
                  <input type="text" placeholder="Name" />
                  <input type="email" placeholder="Email" />
                  <input type="password" placeholder="Password" />
                  <input type="file" id="file" style={{display: "none"}}/>
                  <label htmlFor="file">
                      <img src={addImg}/>
                      <span>Add an avatar</span>
                  </label>
                  <button>Register / Sign Up</button>
                  {err && <span>Something went wrong</span>
                  }
              </form>
              <p>Already have an account? <Link to="/login">Login</Link></p>
          </div>
      </div>
    )

};

export default Register