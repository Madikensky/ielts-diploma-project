"use client";

import { Button } from "@/components/ui/button";
import { usePathname } from "@/i18n/routing";
import { cn } from "@/shared/lib/utils";
import { Menu, X } from "lucide-react";
import { useLocale } from "next-intl";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ClickAwayListener from "react-click-away-listener";

type HeaderLinks = "home" | "offerings" | "faq" | "our_team";

export const Header = () => {
  const pathname = usePathname();
  const isAuth = pathname === "/auth";
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>("home");
  const locale = useLocale();
  const router = useRouter();

  const scrollToSection = (id: HeaderLinks) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.6 },
    );

    const sections = document.querySelectorAll("section[id]");
    sections.forEach((section) => {
      sectionObserver.observe(section);
    });

    return () => {
      sections.forEach((section) => {
        sectionObserver.unobserve(section);
      });
    };
  }, []);

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
        <Link
          className="text-textCommon font-bold text-2xl"
          href={`/${locale}/`}
        >
          7Easy
        </Link>

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
                "flex flex-row gap-6 items-center font-medium justify-end",
                isOpen
                  ? "flex flex-wrap bg-white justify-start flex-col items-start shadow-md"
                  : "flex flex-wrap bg-white justify-start flex-col items-start lg:items-center lg:justify-end opacity-0 lg:flex-row lg:opacity-100 z-10",
                "lg:flex gap-6 absolute lg:static w-full left-0 top-16 p-4 transition-all duration-500",
              )}
            >
              <Link
                className="text-textBlack no-underline w-full lg:w-auto relative"
                href={"#home"}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection("home");
                }}
              >
                Home
                {activeSection === "home" && (
                  <div
                    className={cn(
                      "border-2 rounded-xl absolute border-borderCommon w-full",
                      isOpen && "w-[70px]",
                    )}
                  ></div>
                )}
              </Link>
              <Link
                className="text-textBlack no-underline w-full lg:w-auto relative"
                href={"#offerings"}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection("offerings");
                }}
              >
                Offerings
                {activeSection === "offerings" && (
                  <div
                    className={cn(
                      "border-2 rounded-xl absolute border-borderCommon w-full",
                      isOpen && "w-[70px]",
                    )}
                  ></div>
                )}
              </Link>
              <Link
                className="text-textBlack no-underline w-full lg:w-auto relative"
                href={"#faq"}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection("faq");
                }}
              >
                FAQ
                {activeSection === "faq" && (
                  <div
                    className={cn(
                      "border-2 rounded-xl absolute border-borderCommon w-full",
                      isOpen && "w-[70px]",
                    )}
                  ></div>
                )}
              </Link>
              <Link
                className="text-textBlack no-underline w-full lg:w-auto relative"
                href={"#our_team"}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection("our_team");
                }}
              >
                Our Team
                {activeSection === "our_team" && (
                  <div
                    className={cn(
                      "border-2 rounded-xl absolute border-borderCommon w-full",
                      isOpen && "w-[70px]",
                    )}
                  ></div>
                )}
              </Link>
              <Button
                variant={"landingBtn"}
                size={"lg"}
                className="bg-bgCommon cursor-pointer"
                onClick={() => router.push(`/${locale}/auth`)}
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
