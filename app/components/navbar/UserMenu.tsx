"use client";
import React, { useCallback, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "../Avartar";
import MenuItem from "./MenuItem";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";
import { User } from "@prisma/client";
import { signOut } from "next-auth/react";
import useRentModal from "@/app/hooks/useRentModal";

interface userMenuProps {
    currentUser?: User | null;
}

function UserMenu({ currentUser }: userMenuProps) {
    const [menu, setMenu] = useState(false);
    const toggleMenu = useCallback(() => {
        setMenu((prev) => !prev);
    }, [setMenu]);

    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    const rentModal = useRentModal();
    const onRent = useCallback(() => {
        if (!currentUser) return loginModal.onOpen();
        else rentModal.onOpen();
    }, [loginModal, rentModal, currentUser]);
    return (
        <div className="relative ">
            <div className="flex flex-row items-center gap-3">
                <div
                    onClick={onRent}
                    className="
            hidden
            md:block
            text-sm 
            font-semibold 
            py-3 
            px-4 
            rounded-full 
            hover:bg-neutral-100 
            transition 
            cursor-pointer
            
          "
                >
                    Airbnb your home
                </div>
                <div
                    onClick={toggleMenu}
                    className="
          p-4
          md:py-1
          md:px-2
          border-[1px] 
          border-neutral-200 
          flex 
          flex-row 
          items-center 
          gap-3 
          rounded-full 
          cursor-pointer 
          hover:shadow-md 
          transition
          
          "
                >
                    <AiOutlineMenu />
                    <div className="hidden md:block">
                        <Avatar />
                    </div>
                </div>
            </div>
            {menu && (
                <div
                    className="absolute 
                rounded-xl 
                shadow-md
                w-[40vw]
                md:w-3/4 
                bg-white 
                overflow-hidden 
                right-0 
                top-12 
                text-sm"
                >
                    {currentUser ? (
                        <>
                            <MenuItem onClick={() => { }} label="My trips" />
                            <MenuItem onClick={() => { }} label="My favourites" />
                            <MenuItem onClick={() => { }} label="My reservations" />
                            <MenuItem onClick={() => { }} label="My propterties" />
                            <MenuItem onClick={rentModal.onOpen} label="Airbnb my home" />
                            <MenuItem
                                onClick={() => {
                                    signOut();
                                }}
                                label="Logout"
                            />
                        </>
                    ) : (
                        <>
                            <MenuItem onClick={loginModal.onOpen} label="Login" />
                            <MenuItem onClick={registerModal.onOpen} label="Sign up" />
                        </>
                    )}
                </div>
            )}
        </div>
    );
}

export default UserMenu;
