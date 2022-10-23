import { createContext, useState } from "react";

const UserContext = createContext();

const UserStorage = ({ children }) => {
  const [userData, setUserData] = useState({});
  const [posts, setPosts] = useState([]);
  const [callApi, setCallApi] = useState(true);
  const [message, setMessage] = useState("Loading...");

  return (
    <UserContext.Provider value={{ userData, setUserData, posts, setPosts, message, setMessage, callApi, setCallApi }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserStorage };
