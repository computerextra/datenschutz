export type UserData = {
  Name: string;
  Email: string;
  Firma: string;
  Standort: string;
};

function getUserData(): UserData | undefined {
  const data = localStorage.getItem("userdata");
  if (data) {
    return JSON.parse(data) as UserData;
  } else {
    return undefined;
  }
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

export { setInitialData, getUserData };
