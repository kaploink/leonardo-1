// "use client";

// import { useRouter } from "next/navigation";

export default function CharacterModal({ params }: { params: { id: string } }) {
  return <div className="text-white pb-8">CharacterModal {params.id}</div>;

  // const router = useRouter();

  // return (
  //   <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
  //     <div className="bg-white p-4 rounded">
  //       <h1 className="text-xl">Character Detail: {params.id}</h1>
  //       <button
  //         onClick={() => router.back()}
  //         className="mt-4 bg-red-500 text-white p-2 rounded"
  //       >
  //         Close
  //       </button>
  //     </div>
  //   </div>
  // );
}
