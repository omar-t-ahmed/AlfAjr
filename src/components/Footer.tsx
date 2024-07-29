import Link from "next/link";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="bg-zinc-800 h-20 relative">
            <MaxWidthWrapper>
                <div className="h-full flex flex-col md:flex-row md:justify-between justify-center items-center">
                    <div className="text-center md:text-left pb-2 md:pb-0">
                        <p className="text-sm text-zinc-500">
                            &copy; {new Date().getFullYear()} All rights
                            reserved
                        </p>
                    </div>
                    <div className="flex items-center justify-center">
                        <div className="flex space-x-8">
                            {/* <Link
                href="/"
                passHref
                className="text-zinc-500 hover:text-zinc-100"
              >
                <FaGithub size={20} />
              </Link>
              <Link
                href="/"
                passHref
                className="text-zinc-500 hover:text-zinc-100"
              >
                <FaLinkedin size={20} />
              </Link>
              <Link
                href="/"
                passHref
                className="text-sm text-zinc-500 hover:text-zinc-100"
              >
                Personal Website
              </Link> */}
                            <Link
                                href="/info/developers"
                                className="text-sm text-zinc-500 hover:text-zinc-100"
                            >
                                Developers
                            </Link>
                            <Link
                                href="/info/terms"
                                className="text-sm text-zinc-500 hover:text-zinc-100"
                            >
                                Terms
                            </Link>
                            <Link
                                href="/info/privacy-policy"
                                className="text-sm text-zinc-500 hover:text-zinc-100"
                            >
                                Privacy Policy
                            </Link>
                            <Link
                                href="/info/cookie-policy"
                                className="text-sm text-zinc-500 hover:text-zinc-100"
                            >
                                Cookie Policy
                            </Link>
                        </div>
                    </div>
                </div>
            </MaxWidthWrapper>
        </footer>
    );
};

export default Footer;
