import IconArrowLeft from "@/components/svgs/IconArrowLeft";
import { getSession } from "@/utils/session";
import Link from "next/link";
import { redirect } from "next/navigation";

export async function getDoctor(slug: string) {
  "use server";
  const session = await getSession();
  return await fetch(`http://localhost:3000/admin/doctors/${slug}`, {
    headers: {
      Authorization: `Bearer ${session.token}`,
    },
  }).then((res) => {
    if (!res.ok) {
      redirect("/doctors");
    }
    return res.json();
  });
}

export async function DoctorPage({
  params,
}: {
  params: { doctorSlug: string };
}) {
  const { doctorSlug } = await params;
  const doctor = await getDoctor(doctorSlug);
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex w-full">
        <Link
          href="/doctors"
          className="flex flex-col justify-center items-center"
        >
          <IconArrowLeft className="fill-white size-10 text-white" />
        </Link>
      </div>
      <img
        className="rounded-full"
        alt={`Imagem de ${doctor.name}`}
        width={130}
        height={130}
        src={doctor.image}
      />
      <div className="flex mt-4 font-bold text-xl text-gray-600">
        {doctor.name}
      </div>
      <div className="flex mt-2  text-md text-gray-400">{doctor.position}</div>
      <div className="px-6">
        <div className="flex justify-start w-full mt-4 font-bold text-xl text-gray-600">
          About Doctor
        </div>
        <div className="text-justify flex mt-2  text-md text-gray-400 mb-40">{doctor.about}</div>
      </div>
    </div>
  );
}

export default DoctorPage;
