import { createContext, useContext, useState, useEffect } from "react";
import { auth } from "../firebase/firebase.config";
import {
  onAuthStateChanged,
  signOut,
  signInWithPopup,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  GithubAuthProvider,
} from "firebase/auth";

export const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

// Firebase providers
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Listen to auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Email/Password login
  const signInWithEmailAndPasswordFunc = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password).finally(() =>
      setLoading(false)
    );
  };

  // Google login
  const signInWithGoogleFunc = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider).finally(() =>
      setLoading(false)
    );
  };

  // GitHub login
  const signInWithGithubFunc = () => {
    setLoading(true);
    return signInWithPopup(auth, githubProvider).finally(() =>
      setLoading(false)
    );
  };

  // Sign out
  const signoutUserFunc = async () => {
    try {
      setLoading(true);
      await signOut(auth);
      setUser(null);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const authInfo = {
    user,
    loading,
    setUser,
    setLoading,
    signInWithEmailAndPasswordFunc,
    signInWithGoogleFunc,
    signInWithGithubFunc,
    signoutUserFunc,
  };

  return <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
