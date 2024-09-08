/* eslint-disable @next/next/no-img-element */
'use client'

import { SessionCheck } from '@/states/GlobalStates/SessionCheck';
import { ShowHideSideBarStateForDesktop } from '@/states/GlobalStates/ShowHideSideBarStateForDesktop';
import { ShowHideSideBarStateForMobile } from '@/states/GlobalStates/ShowHideSideBarStateForMobile';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import { menuOptions } from '@/constants/MenuOptionsList';

const SideBarComponent = () => {
    const pathname = usePathname();

    //! Check session
    const { isLoggedIn } = SessionCheck();

    //! Show/Hide Menu
    const { sidebarOpenDesktop, setSidebarOpenDesktop } = ShowHideSideBarStateForDesktop();
    const { sidebarOpenMobile, setSidebarOpenMobile } = ShowHideSideBarStateForMobile();

    return (
        <>
            {/* Desktop Sidebar */}
            <main className={`side-bar-main-desktop fixed top-0 left-0 bottom-0 md:block hidden ${sidebarOpenDesktop ? "w-[225px]" : "w-20"} bg-[#24263A] py-10 ${isLoggedIn ? "" : "blur pointer-events-none"} defaultTransitionCSS`}>
                <section className="side-bar-section relative">

                    {/* Toggle Button for Sidebar */}
                    <p onClick={() => setSidebarOpenDesktop(!sidebarOpenDesktop)}
                        className={`absolute top-0 -right-4 bg-[#1D1E2C] px-2 py-2 rounded-full shadow-lg cursor-pointer ${sidebarOpenDesktop ? "rotate-0" : "-rotate-180"} transition-transform`}>
                        <img className='invert' src="https://img.icons8.com/?size=20&id=1806&format=png&color=000000" alt="" />
                    </p>

                    {/* Company Logo */}
                    <div className="flex justify-center">
                        <img className={`${sidebarOpenDesktop ? "w-auto" : 'w-20'} h-auto`} src="https://raw.githubusercontent.com/Capta1nRaj/email-armor/main/email-armor.png" alt="Company Logo" />
                    </div>

                    {/* Divider */}
                    <p className={`border-t-2 border-[#1D1E2C] ${sidebarOpenDesktop ? "mx-8" : "mx-2"} my-2`}></p>

                    {/* Menu Section */}
                    <section className="menu-section pl-3">
                        {menuOptions.map((option, index) => (
                            <Link href={option.path} key={index} onClick={option.onClick}>
                                <div
                                    className={`flex items-center gap-3 py-2 pl-5 rounded-l-full ${pathname.includes(option.path) ? "bg-[#1D1E2C]" : ""} transition-all`}>
                                    <img className='invert' src={option.image} alt="" />
                                    {sidebarOpenDesktop && <span className="ml-2">{option.name}</span>}
                                </div>
                            </Link>
                        ))}
                    </section>

                </section>
            </main>

            {/* Mobile Sidebar */}
            <main className={`side-bar-mobile fixed top-0 ${sidebarOpenMobile ? "left-0 w-full" : "left-[-100%] w-0"} right-0 bottom-0 md:hidden flex flex-col pt-4 px-4 bg-[#24263A] z-50 transition-all`}>
                <img className='w-24' src="https://raw.githubusercontent.com/Capta1nRaj/email-armor/main/email-armor.png" alt="" />

                {/* Cross Icon to Close Sidebar */}
                <div onClick={() => setSidebarOpenMobile(!sidebarOpenMobile)} className='absolute top-4 right-4'>
                    <img src="https://img.icons8.com/?size=40&id=6483&format=png&color=000000" alt="" />
                </div>

                {/* Menu Options */}
                {menuOptions.map((option, index) => (
                    <Link href={option.path} key={index} onClick={() => { option.name === "Logout" ? option.onClick : setSidebarOpenMobile(!sidebarOpenMobile) }}>
                        <div className={`flex items-center gap-3 py-2 pl-5 rounded-l-full ${pathname === option.path ? "bg-[#1D1E2C]" : ""} transition-all`}>
                            <img className='invert' src={option.image} alt="" /> <span>{option.name}</span>
                        </div>
                    </Link>
                ))}
            </main>
        </>
    );
};

export default SideBarComponent;