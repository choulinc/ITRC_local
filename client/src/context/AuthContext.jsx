import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('itrc_token'));

    useEffect(() => {
        if (token) {
            try {
                const payload = JSON.parse(atob(token.split('.')[1]));
                if (payload.exp * 1000 > Date.now()) {
                    setUser(payload);
                } else {
                    logout();
                }
            } catch {
                logout();
            }
        }
    }, [token]);

    const login = (newToken, userData) => {
        localStorage.setItem('itrc_token', newToken);
        setToken(newToken);
        setUser(userData);
    };

    const logout = () => {
        localStorage.removeItem('itrc_token');
        setToken(null);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, token, login, logout, isAdmin: !!user }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
