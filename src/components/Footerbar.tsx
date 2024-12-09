import { getUser } from "@/utils/session";
import Link from "next/link";
import IconEsterEgg from "./svgs/IconEsterEgg";
import IconDoctorMan from "./svgs/IconDoctorMan";

export async function Footerbar() {
  const user = await getUser();
  return (
    <div className="fixed bottom-0 left-0 right-0 w-screen max-w-screen bg-green-500 text-white">
      {user && (
        <div className="p-4 ">
          <div className="flex justify-evenly items-center font-bold">
            {/* <Link href="/doctors">Doctors</Link> */}

            <Link
              href="/doctors"
              className="flex flex-col justify-center items-center"
            >
              <IconDoctorMan className="fill-white size-8" />
              <div className="text-xs flex w-full">Doctors</div>
            </Link>
            <Link
              href="/"
              className="flex flex-col justify-center items-center"
            >
              <IconEsterEgg className="fill-white size-8" />
              <div className="text-xs flex w-full">Easter Eggs</div>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default Footerbar;
