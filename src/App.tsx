import UserForm from "./components/user-form";

function App() {
  return (
    <div className="container mx-auto mt-5">
      <h1 className="text-center scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        Datenschutz Schulungen
      </h1>
      <h2 className="text-center scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        Der Firmen <br />
        Computer Extra GmbH & AEM Communication GmbH & Co. KG
      </h2>
      <UserForm />
    </div>
  );
}

export default App;
