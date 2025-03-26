import { useState } from "react";
import { Button } from "./components/ui/button";
import { Toaster } from "./components/ui/sonner";
import { Login, UserForm } from "./components/user-form";
import { useUserData } from "./hooks/useUserData";

function App() {
  const userData = useUserData();
  const [showForm, setShowForm] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  const deleteUserData = () => {
    localStorage.removeItem("userdata");
    location.reload();
  };

  return (
    <div className="container mx-auto mt-5">
      <div className="flex justify-around mb-3">
        {userData && (
          <Button variant="destructive" onClick={deleteUserData}>
            Abmelden
          </Button>
        )}
        <Button variant={"link"} className="cursor-pointer" asChild>
          <a href="">Impressum</a>
        </Button>
        <Button variant={"link"} className="cursor-pointer" asChild>
          <a href="">Datenschutz</a>
        </Button>
      </div>
      <h1 className="text-center scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        Datenschutz Schulungen
      </h1>
      <h2 className="text-center scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        Der Firmen <br />
        Computer Extra GmbH & AEM Communication GmbH & Co. KG
      </h2>
      {!userData && showForm && <UserForm />}
      {!userData && showLogin && <Login />}
      {!userData && !showForm && !showLogin && (
        <div className="flex justify-center gap-8 mt-5">
          <Button variant="default" onClick={() => setShowLogin(true)}>
            Anmelden
          </Button>
          <Button variant="secondary" onClick={() => setShowForm(true)}>
            Neu hier
          </Button>
        </div>
      )}
      {userData && (
        <>
          <p>
            Hi {userData.Name}, du bist angemeldet bei der Firma{" "}
            {userData.Firma} in {userData.Standort}
          </p>
        </>
      )}
      <Toaster />
    </div>
  );
}

export default App;
