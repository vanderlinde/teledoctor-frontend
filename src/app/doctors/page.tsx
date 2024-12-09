import { getSession } from "@/utils/session";
import Link from "next/link";
import Image from "next/image";
import star from "../../assets/star.png";
import SvgStar from "@/components/svgs/IconStar";
import IconArrowLeft from "@/components/svgs/IconArrowLeft";

export async function getDoctors() {
  "use server";
  const session = await getSession();
  const response = await fetch("http://localhost:3000/admin/doctors", {
    headers: {
      Authorization: `Bearer ${session.token}`,
    },
  });

  return response.json();
}

export async function DoctorsPage() {
  const doctors = await getDoctors();
  return (
    <div className="w-screen max-w-screen  mb-20">
      <div className="flex justify-center font-bold text-gray-500 text-xl">
        <h1>Doctors</h1>
      </div>
      <ul className="mt-4 grid grid-cols-2">
        {doctors.map((doctor: any) => (
          <Link key={doctor.id} href={`/doctors/${doctor.slug}`}>
            <div
              key={doctor.id}
              className="flex w-full h-full border rounded p-4"
            >
              <div className="bg-white flex-col flex w-full h-full justify-center items-center rounded-lg py-4">
                <img
                  className="rounded-full"
                  alt={`Imagem de ${doctor.name}`}
                  width={70}
                  height={70}
                  src={doctor.image}
                />
                <div className="flex flex-col ml-4 font-bold">
                  {doctor.name}
                </div>
                <div className="flex flex-col ml-4">{doctor.position}</div>
                <div className="flex ml-4 items-center justify-evenly w-8/12">
                  <div className="flex justify-center items-center h-6 w-10 bg-green-100 rounded-full">
                    <SvgStar className="fill-green-500 size-4" />
                    <span className="text-xs text-green-500">4.3</span>
                  </div>
                  <span className="text-gray-500 text-sm">{` (${Math.floor(
                    Math.random() * 100
                  )}) reviews`}</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </ul>
    </div>
  );
}

export default DoctorsPage;
