"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";

export default function Navbar() {
  const router = useRouter();
  const navbarMenus: string[] = ["Playground", "Checker"];
  const { data: session } = useSession();
  const pathname = usePathname();

  const isLinkActive = (path: string): boolean => {
    return pathname.includes(path.toLowerCase());
  };

  return (
    <nav className="fixed z-20 flex h-[90px] w-full items-center justify-between bg-[#F4EDE3] px-20 pt-2 drop-shadow-lg">
      <div className="flex items-center justify-center gap-10">
        <Link href={`/home/playground`}>
          <div className="flex h-fit w-fit items-center justify-center gap-2">
            <Image
              unoptimized={true}
              src="/assets/logo.png"
              alt="Union logo"
              className="h-auto w-auto"
              width={50}
              height={0}
              priority
            />
            <Image
              unoptimized={true}
              src="/assets/union_copy.png"
              alt="Union Copy"
              className="h-auto w-auto"
              width={60}
              height={0}
              priority
            />
          </div>
        </Link>

        <ul className="flex items-center justify-center gap-10">
          {navbarMenus.map((e, i) => (
            <li
              key={e + i}
              className={`font-bold text-[#908b86] hover:text-black hover:underline ${
                isLinkActive(e) ? "text-black underline" : "text-[#908b86]"
              }`}
            >
              <Link href={`/home/${e.toLowerCase()}`}>{e}</Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex items-center justify-center gap-6">
        <div className="flex items-center justify-center gap-2">
          <div className="h-[40px] w-[40px] rounded-full bg-gray-300">
            <Image
              unoptimized={true}
              src={session?.user?.image ?? ""}
              alt="user image"
              className="h-auto w-auto rounded-full"
              width={100}
              height={0}
              priority
            />
          </div>
          <p>{session?.user?.name}</p>
          <Menu>
            <MenuButton>
              <Image
                unoptimized={true}
                src="/assets/user_setting_arrow.svg"
                alt="user setting arrow"
                className="h-auto w-auto"
                width={0}
                height={0}
                priority
              />
            </MenuButton>
            <MenuList>
              <MenuItem onClick={() => router.push("/home/dashboard")}>
                Dashboard
              </MenuItem>
              <MenuItem onClick={() => signOut()}>Logout</MenuItem>
            </MenuList>
          </Menu>
        </div>
      </div>
    </nav>
  );
}
