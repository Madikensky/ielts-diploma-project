"use client";

import { Button } from "@/components/ui/button";
import { usePathname } from "@/i18n/routing";
import { cn } from "@/shared/lib/utils";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import ClickAwayListener from "react-click-away-listener";

export const Header = () => {
  const pathname = usePathname();
  const isAuth = pathname === "/auth";
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <ClickAwayListener
      onClickAway={() => {
        setIsOpen(false);
      }}
    >
      <div
        className={cn(
          "flex flex-row justify-between items-center sticky top-0 z-50 bg-white",
          !isAuth && "shadow-md",
          isAuth ? "p-6" : "p-4",
        )}
      >
        <h1 className="text-textCommon font-bold text-2xl">7Easy</h1>

        {!isAuth && (
          <>
            <button
              className="lg:hidden p-2"
              onClick={() => {
                setIsOpen((prev) => !prev);
              }}
            >
              {isOpen ? <X size={28} /> : <Menu size={28}></Menu>}
            </button>

            <div
              className={cn(
                "flex flex-row gap-6 items-center font-medium justify-end ",
                isOpen
                  ? "flex flex-wrap bg-white justify-start flex-col items-start shadow-md"
                  : "flex flex-wrap bg-white justify-start flex-col items-start lg:items-center lg:justify-end opacity-0  lg:flex-row lg:opacity-100 z-10",
                "lg:flex gap-6 absolute lg:static w-full left-0 top-16 p-4 transition-all duration-500",
              )}
            >
              <Link
                className="text-textBlack no-underline w-full lg:w-auto"
                href={"#home"}
              >
                Home
              </Link>
              <Link
                className="text-textBlack no-underline w-full lg:w-auto"
                href={"#offerings"}
              >
                Offerings
              </Link>
              <Link
                className="text-textBlack no-underline w-full lg:w-auto"
                href={"#faq"}
              >
                FAQ
              </Link>
              <Link
                className="text-textBlack no-underline w-full lg:w-auto"
                href={"#our_team"}
              >
                Our Team
              </Link>
              <Button
                variant={"landingBtn"}
                size={"lg"}
                className="bg-bgCommon cursor-pointer"
              >
                Start Practicing
              </Button>
            </div>
          </>
        )}
      </div>
    </ClickAwayListener>
  );
};
