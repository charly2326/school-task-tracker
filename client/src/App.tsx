// src/App.tsx
import { useState, useEffect } from "react";
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";

import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import SplashScreen from "@/components/SplashScreen";
import { useFullscreen } from "@/hooks/use-fullscreen";

import Home from "@/pages/home";
import Login from "@/pages/login";
import NotFound from "@/pages/not-found";
import RequireAuth from "@/components/RequireAuth";

function Router({
  selectedDate,
  setSelectedDate,
}: {
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
}) {
  return (
    <Switch>
      {/* ✅ Ruta de Login */}
      <Route path="/login">
        <Login />
      </Route>

      {/* ✅ Ruta principal protegida */}
      <Route path="/">
        <RequireAuth>
          <Home selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
        </RequireAuth>
      </Route>

      {/* ✅ Ruta para todo lo demás (404) */}
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}

function App() {
  const [showSplash, setShowSplash] = useState(true);

  const [selectedDate, setSelectedDate] = useState<Date>(() => {
    const now = new Date();
    now.setHours(12, 0, 0, 0); // Para evitar desfases de zona horaria
    return now;
  });

  useFullscreen();

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowSplash(false);
    }, 2000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="min-h-screen bg-background text-white">
          <Toaster />
          {showSplash ? (
            <SplashScreen />
          ) : (
            <Router
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
            />
          )}
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;

