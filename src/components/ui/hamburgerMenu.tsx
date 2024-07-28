import Link from "next/link";
import React from "react";

type IconProps = React.SVGProps<SVGSVGElement>;

const MenuIcon: React.FC<IconProps> = (props) => {
    return (
        <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        >
        <line x1="4" x2="20" y1="12" y2="12" />
        <line x1="4" x2="20" y1="6" y2="6" />
        <line x1="4" x2="20" y1="18" y2="18" />
        </svg>
    );
};

const XIcon: React.FC<IconProps> = (props) => {
    return (
        <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        >
        <path d="M18 6 6 18" />
        <path d="m6 6 12 12" />
        </svg>
    );
};

const HamburgerMenu: React.FC = () => {
    return (
        <div className="mx-auto max-w-5xl px-4 md:px-6">
        <div>
            <div className="h-9 w-9 p-2 rounded-md hover:bg-gray-100/50 focus:outline-none focus:bg-gray-100/50 dark:hover:bg-gray-800/50 dark:focus:bg-gray-800/50">
            <MenuIcon className="h-5 w-5" />
            <span className="sr-only">Toggle menu</span>
            </div>
            <div>
            <div className="absolute top-1 right-1 p-2 rounded-md hover:bg-gray-100/50 focus:outline-none focus:bg-gray-100/50 dark:hover:bg-gray-800/50 dark:focus:bg-gray-800/50">
                <XIcon className="h-4 w-4" />
                <span className="sr-only">Close menu</span>
            </div>
            <div className="flex flex-col gap-2 p-4">
                <Link
                href="#"
                className="flex h-9 items-center justify-start rounded-md bg-gray-100 p-4 text-sm font-medium transition-colors hover:bg-gray-100/50 hover:text-gray-900 dark:bg-gray-800 dark:hover:bg-gray-800/50 dark:hover:text-gray-50"
                prefetch={false}
                >
                Home
                </Link>
                <Link
                href="#"
                className="flex h-9 items-center justify-start rounded-md bg-white p-4 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-950 dark:hover:text-gray-50"
                prefetch={false}
                >
                Pricing
                </Link>
                <Link
                href="#"
                className="flex h-9 items-center justify-start rounded-md bg-white p-4 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-950 dark:hover:text-gray-50"
                prefetch={false}
                >
                Features
                </Link>
                <Link
                href="#"
                className="flex h-9 items-center justify-start rounded-md bg-white p-4 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-950 dark:hover:text-gray-50"
                prefetch={false}
                >
                Blog
                </Link>
                <Link
                href="#"
                className="flex h-9 items-center justify-start rounded-md bg-white p-4 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-950 dark:hover:text-gray-50"
                prefetch={false}
                >
                Contact
                </Link>
            </div>
            </div>
        </div>
        </div>
    );
};

export default HamburgerMenu;
