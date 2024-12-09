import { destroySession, getUser } from "@/utils/session";
import { redirect } from "next/navigation";
import IconDoctorMan from "./svgs/IconDoctorMan";
import Link from "next/link";
import IconArrowLeft from "./svgs/IconArrowLeft";

export async function logoutAction() {
  "use server";
  await destroySession();
  redirect("/login");
}

export async function Navbar() {
  const user = await getUser();
  return (
    <>
      {user && (
        <nav className="flex justify-between items-center p-4 bg-green-500">
          <div className="font-bold text-white flex items-center gap-2">
            <div>Zeine</div>
          </div>
          <div className="flex items-center">
            <span className="mr-4 text-white">Olá, {user.name}</span>
            <form action={logoutAction}>
              <button className="bg-white text-black px-4 py-2 rounded-md">
                Logout
              </button>
            </form>
          </div>
        </nav>
      )}
    </>
  );
}

export default Navbar;
