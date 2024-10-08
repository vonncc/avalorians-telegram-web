// userStateContext.tsx
import React, { createContext, useContext, useState } from 'react';
import { TUser_state } from '../_globals/types/userData.type';

// Define the shape of your context
interface UserStateContextType {
    userStateData: TUser_state | null;
    setUserStateData: (userStateData: TUser_state | null) => void;
}


// Create the context with a default value
const UserStateContext = createContext<UserStateContextType | undefined>(undefined);

// Create a provider component
export const UserStateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [userStateData, setUserStateData] = useState<TUser_state | null>(null);

    return (
        <UserStateContext.Provider value={{ userStateData, setUserStateData }}>
            {children}
        </UserStateContext.Provider>
    );
};

// Create a custom hook to use the userState context
export const useuserState = () => {
    const context = useContext(UserStateContext);
    if (!context) {
        throw new Error('useuserState must be used within a userStateProvider');
    }
    return context;
};