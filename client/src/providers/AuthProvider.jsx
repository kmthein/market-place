import React, { useEffect } from "react";
import { checkCurrentUser } from "../api/auth";
import { useNavigate } from "react-router-dom";

const AuthProvider = ({ children }) => {
    const navigate = useNavigate();

    const getCurrentUser = async () => {
        try {
            const response = await checkCurrentUser();
            if(response.success) {

            } else {
                navigate("/");        
                throw new Error(response.message);
            }
        } catch (error) {
            console.log(error.message);
        }
      }

  useEffect(() => {
    getCurrentUser();
  }, []);

  return <div>{children}</div>;
};

export default AuthProvider;
