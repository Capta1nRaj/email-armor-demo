import { create } from 'zustand';

interface SidebarStore {
    sidebarOpenMobile: boolean;
    setSidebarOpenMobile: (open: boolean) => void;
}

export const ShowHideSideBarStateForMobile = create<SidebarStore>((set) => ({
    sidebarOpenMobile: false,
    setSidebarOpenMobile: (open) => set({ sidebarOpenMobile: open }),
}));
