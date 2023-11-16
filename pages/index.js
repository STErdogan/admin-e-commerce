import Layout from "@/components/Layout";
import { useSession } from "next-auth/react";
import Image from "next/image";

export default function Home() {
  const { data: session } = useSession();
  return (
    <Layout>
      <div className="text-blue-900 flex justify-between">
        <h2>
          Merhaba,<b> {session?.user?.name}</b>
        </h2>
        <div className="flex bg-gray-300 gap-1 text-black rounded-lg overflow-hidden">
          <Image
            src={session?.user?.image}
            width={100}
            height={100}
            alt=""
            className="w-6 h-6"
          />
          <span className=" px-2">{session?.user?.name}</span>
        </div>
      </div>
    </Layout>
  );
}
