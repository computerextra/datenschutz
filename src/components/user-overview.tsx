import { UserData } from "@/hooks/useUserData";

const Overview = ({ data }: { data: UserData }) => {
  return (
    <>
      <p className="text-center">
        Hi {data.Name}, du bist angemeldet bei der Firma {data.Firma} in{" "}
        {data.Standort}
      </p>
    </>
  );
};

export default Overview;
