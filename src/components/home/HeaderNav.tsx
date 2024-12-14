import Link from "next/link";

import { CallToActionButton } from "./CallToActionButton";

export function HeaderNav() {
  const navItems = [
    {
      name: "What", // What is it
      link: "/#what",
    },
    {
      name: "Why", // Why do we exist
      link: "/#why",
    },
    {
      name: "Who", // Why trust us
      link: "/#who",
    },
    {
      name: "How", // How to get going
      link: "/#how",
    },
  ];

  return (
    <header className="fixed left-0 right-0 top-0 flex items-center justify-between px-6 py-4 backdrop-blur-sm">
      <Link href="/">
        <img
          loading="eager"
          src={"favicon.svg"}
          alt="Temple Logo"
          height={40}
          width={40}
        />
      </Link>

      {/* <nav className="flex gap-x-8 rounded-full border border-white border-opacity-30 px-6 py-3 text-sm font-light text-white text-opacity-90">
        {navItems.map((item) => (
          <Link href={item.link}>{item.name}</Link>
        ))}
      </nav> */}

      <CallToActionButton />
    </header>
  );
}
