"use client"

import { createContext, useState, useContext, ReactNode, useEffect } from 'react';

interface SidebarContextProps {
    isCollapsed: boolean;
    toggleCollapse: () => void;
}

const SidebarContext = createContext<SidebarContextProps | undefined>(undefined);

export const SidebarProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isCollapsed, setIsCollapsed] = useState(false);

    useEffect(() => {
        const storedSidebarState = localStorage.getItem('sidebar-state');
        const initialSidebarState = storedSidebarState ? storedSidebarState === 'true' : false;
        setIsCollapsed(initialSidebarState);
    }, [])

    const toggleCollapse = () => {
        const state = !isCollapsed;
        setIsCollapsed(state);
        localStorage.setItem('sidebar-state', state.toString())
    };

    return (
        <SidebarContext.Provider value={{ isCollapsed, toggleCollapse }}>
            {children}
        </SidebarContext.Provider>
    );
};

export const useSidebarContext = () => {
    const context = useContext(SidebarContext);
    if (context === undefined) {
        return { isCollapsed: true, toggleCollapse: () => null}
    }
    return context;
};
