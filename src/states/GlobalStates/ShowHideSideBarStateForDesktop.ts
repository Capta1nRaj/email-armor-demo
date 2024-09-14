import { create } from 'zustand';

interface SidebarStore {
    sidebarOpenDesktop: boolean;
    setSidebarOpenDesktop: (open: boolean) => void;
}

export const ShowHideSideBarStateForDesktop = create<SidebarStore>((set) => ({
    sidebarOpenDesktop: false,
    setSidebarOpenDesktop: (open) => set({ sidebarOpenDesktop: open }),
}));
