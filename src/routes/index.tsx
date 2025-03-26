import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/sonner";
import { Login, UserForm } from "@/components/user-form";
import Overview from "@/components/user-overview";
import { getUserData } from "@/hooks/useUserData";
import { createFileRoute, getRouteApi } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/")({
  component: Index,
  loader: () => getUserData(),
});

function Index() {
  const [showForm, setShowForm] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const routeApi = getRouteApi("/");
  const data = routeApi.useLoaderData();

  const deleteUserData = () => {
    localStorage.removeItem("userdata");
    location.reload();
  };

  return (
    <div className="container mx-auto mt-5">
      {data && (
        <Button variant="destructive" onClick={deleteUserData}>
          Abmelden
        </Button>
      )}
      <h1 className="text-center scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        Datenschutz Schulungen
      </h1>
      <h2 className="text-center scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        Der Firmen:
        <br />
        Computer Extra GmbH und AEM Communication GmbH & Co. KG
      </h2>
      {!data && showForm && <UserForm />}
      {!data && showLogin && <Login />}
      {!data && !showForm && !showLogin && (
        <div className="flex justify-center gap-8 mt-5">
          <Button variant="default" onClick={() => setShowLogin(true)}>
            Anmelden
          </Button>
          <Button variant="secondary" onClick={() => setShowForm(true)}>
            Neu hier
          </Button>
        </div>
      )}
      {data && <Overview data={data} />}
      <Toaster />
    </div>
  );
}
