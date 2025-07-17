import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../lib/firebase";
import { useLocation } from "wouter";

export default function RequireAuth({ children }: { children: JSX.Element }) {
  const [authChecked, setAuthChecked] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [, setLocation] = useLocation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
        setLocation("/login");
      }
      setAuthChecked(true);
    });
    return () => unsubscribe();
  }, []);

  if (!authChecked) return <div>Cargando...</div>;
  if (!isLoggedIn) return null;

  return children;
}

