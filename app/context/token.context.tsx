// TokenContext.tsx
import React, { createContext, useContext, useState } from 'react';

// Define the shape of your context
interface TokenContextType {
    token: string | null;
    setToken: (token: string | null) => void;
}


// Create the context with a default value
const TokenContext = createContext<TokenContextType | undefined>(undefined);

// Create a provider component
export const TokenProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [token, setToken] = useState<string | null>(null);

    return (
        <TokenContext.Provider value={{ token, setToken }}>
            {children}
        </TokenContext.Provider>
    );
};

// Create a custom hook to use the Token context
export const useToken = () => {
    const context = useContext(TokenContext);
    if (!context) {
        throw new Error('useToken must be used within a TokenProvider');
    }
    return context;
};