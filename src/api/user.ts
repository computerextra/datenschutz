import { UserData } from "@/hooks/useUserData";
import { AxiosResponse } from "axios";
import { client } from "./config";
import { QueryObserverResult, useQuery } from "@tanstack/react-query";

const fetchUser = async (
  mail: string,
): Promise<AxiosResponse<UserData | undefined | null, unknown>> => {
  return await client.get(`/user.php?mail=${mail}`);
};

const useFetchUser = (
  mail: string,
): QueryObserverResult<UserData | undefined | null, unknown> => {
  return useQuery<UserData | undefined | null, unknown>({
    queryKey: ["user", mail],
    queryFn: async () => {
      const { data } = await fetchUser(mail);
      return data;
    },
  });
};

const createUser = async (
  name: string,
  mail: string,
  firma: string,
  standort: string,
): Promise<AxiosResponse<UserData, unknown>> => {
  return await client.put("/user", {
    name,
    mail,
    firma,
    standort,
  });
};

// const useCreateUser = (
//   name: string,
//   mail: string,
//   firma: string,
//   standort: string,
// ): QueryObserverResult<UserData, unknown> => {
//   return useQuery<UserData, unknown>({
//     queryKey: ["user", mail],
//     queryFn: async () => {
//       const { data } = await createUser(name, mail, firma, standort);
//       return data;
//     },
//   });
// };

const updateUser = async (
  name: string,
  mail: string,
  firma: string,
  standort: string,
): Promise<AxiosResponse<UserData | undefined | null, unknown>> => {
  return await client.post("/user", {
    name,
    mail,
    firma,
    standort,
  });
};

const useUpdateUser = (
  name: string,
  mail: string,
  firma: string,
  standort: string,
): QueryObserverResult<UserData | undefined | null, unknown> => {
  return useQuery<UserData | undefined | null, unknown>({
    queryKey: ["user", mail],
    queryFn: async () => {
      const { data } = await updateUser(name, mail, firma, standort);
      return data;
    },
  });
};

const deleteUser = async (
  mail: string,
): Promise<AxiosResponse<null, unknown>> => {
  return await client.delete(`/user`, {
    data: {
      mail,
    },
  });
};

const useDeleteUser = (
  mail: string,
): QueryObserverResult<undefined | null, unknown> => {
  return useQuery<undefined | null, unknown>({
    queryKey: ["user", mail],
    queryFn: async () => {
      const { data } = await deleteUser(mail);
      return data;
    },
  });
};

export { useFetchUser, createUser, useUpdateUser, useDeleteUser };
