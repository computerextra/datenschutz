import { useEffect, useState } from "react";

type UserData = {
  Name: string;
  Email: string;
  Firma: string;
  Standort: string;
};

function useUserData() {
  const [userdata, setUserdata] = useState<UserData | undefined>(undefined);

  useEffect(() => {
    const data = localStorage.getItem("userdata");
    if (data) {
      setUserdata(JSON.parse(data));
    } else {
      return;
    }
  }, []);

  return userdata;
}

function setInitialData(
  name: string,
  mail: string,
  firma: string,
  standort: string
): void {
  localStorage.setItem(
    "userdata",
    JSON.stringify({
      Name: name,
      Email: mail,
      Firma: firma,
      Standort: standort,
    })
  );
}

export { setInitialData, useUserData };
