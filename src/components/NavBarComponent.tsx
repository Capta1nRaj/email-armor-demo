/* eslint-disable @next/next/no-img-element */
import { SessionCheck } from '@/states/GlobalStates/SessionCheck'
import { ShowHideSideBarStateForDesktop } from '@/states/GlobalStates/ShowHideSideBarStateForDesktop';
import { ShowHideSideBarStateForMobile } from '@/states/GlobalStates/ShowHideSideBarStateForMobile';
import React from 'react'

const NavBarComponent = () => {

    const { isLoggedIn, userName } = SessionCheck();

    //! Manage nav-bar-main ml as per sidebarOpen state
    const { sidebarOpenDesktop } = ShowHideSideBarStateForDesktop();
    const { sidebarOpenMobile, setSidebarOpenMobile } = ShowHideSideBarStateForMobile();

    return (
        <>
            <main className={`nav-bar-main ${sidebarOpenDesktop ? "md:ml-64" : "md:ml-24"} ml-4 md:mr-0 mr-4 bg-[#24263A] lg:rounded-bl-lg rounded-b-lg h-24 flex items-center px-4 defaultTransitionCSS`}>

                <section className="left-side flex items-center gap-2">
                    <div onClick={() => setSidebarOpenMobile(!sidebarOpenMobile)} className='md:hidden block'>
                        <img src="https://img.icons8.com/?size=24&id=3096&format=png&color=000000" alt="" />
                    </div>
                    <p> {isLoggedIn ? `Hello ${userName}` : "Please Login"} </p>
                </section>

            </main>
        </>
    )
}

export default NavBarComponent