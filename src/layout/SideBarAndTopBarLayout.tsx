'use client'

import NavBarComponent from '@/components/NavBarComponent'
import SideBarComponent from '@/components/SideBarComponent'
import { SessionCheck } from '@/states/GlobalStates/SessionCheck'
import { ShowHideSideBarStateForDesktop } from '@/states/GlobalStates/ShowHideSideBarStateForDesktop'
import { usePathname, useRouter } from 'next/navigation'
import React, { ReactNode, useEffect } from 'react'

const SideBarAndTopBarLayout = ({ children }: { children: ReactNode }) => {

    const router = useRouter();
    const pathname = usePathname();

    //! Checking user session
    const { checkSession } = SessionCheck();

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Call the session check function to verify if the user is logged in
                const { isLoggedIn } = await checkSession();

                // If the user is not logged in, redirect to the sign-in page
                if (!isLoggedIn) {
                    return router.push(process.env.NEXT_PUBLIC_DOMAIN_NAME_1 + '/signin' || "http://localhost:3000/signin");
                }

                // If the user is on the root or dashboard path, redirect to the dashboard
                if (pathname === '/' || pathname === '/dashboard') { router.push(process.env.NEXT_PUBLIC_DOMAIN_NAME_1 + '/dashboard'); }
            } catch (error) {
                // Handle any errors that occur during session checking and redirect to the home page
                console.error('Error occurred while checking session:', error);
                router.push(process.env.NEXT_PUBLIC_DOMAIN_NAME_1 || "http://localhost:3000");
            }
        };

        // Execute the session check when the component mounts or when the session changes
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [checkSession]);

    //! Manage children-section margin-left based on the sidebarOpenDesktop state
    const { sidebarOpenDesktop } = ShowHideSideBarStateForDesktop();

    return (
        <>
            {/* Render the navigation bar component */}
            <NavBarComponent />

            {/* Render the sidebar component */}
            <SideBarComponent />

            {/* Main content section which shifts depending on whether the sidebar is open */}
            <section className={`children-section mt-5 ${sidebarOpenDesktop ? "md:ml-[257px]" : "md:ml-24"} ml-4 lg:mr-10 mr-4 defaultTransitionCSS`}>
                {children}
            </section>
        </>
    );
}

export default SideBarAndTopBarLayout;