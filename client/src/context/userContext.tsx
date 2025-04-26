// context/UserContext.jsx
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import Cookies from "js-cookie";
import axios from "axios";
import BaseUrl from "../config";

interface UserData {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  links: any[];
  profilePicture: string;
}

interface UserContextType {
  user: UserData | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
  fetchUserData: () => Promise<void>;
  refreshUserData: () => Promise<void>; // New function
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserData | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Memoize the fetch function with useCallback
  const fetchUserData = useCallback(async () => {
    try {
      setIsLoading(true);
      const storedToken = Cookies.get("token");

      if (!storedToken) {
        throw new Error("No token found");
      }

      setToken(storedToken);

      const res = await axios.get<{ data: UserData }>(
        `${BaseUrl}/api/user `,
        {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        }
      );

      setUser(res.data.data);
      setError(null);
    } catch (err: any) {
      setError(err.message || "Failed to fetch user data");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // New refresh function that can be called from anywhere
  const refreshUserData = useCallback(async () => {
    await fetchUserData();
  }, [fetchUserData]);

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  return (
    <UserContext.Provider
      value={{
        user,
        token,
        isLoading,
        error,
        fetchUserData,
        refreshUserData, // Expose the refresh function
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
