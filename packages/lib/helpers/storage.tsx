import { ICurrentUser } from "../interfaces/repo.interface";

export const setUser = (user: ICurrentUser): void =>
  localStorage.setItem("user", JSON.stringify(user));

export const getUser = (): ICurrentUser | null => {
  try {
    return JSON.parse(localStorage.getItem("user") || "");
  } catch {
    return null;
  }
};

export const removeUser = (): void => {
  if (getUser() != null) localStorage.removeItem("user");
};
