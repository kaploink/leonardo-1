// import { rickAndMortyApiClient } from "@/lib/apollo-clients";

// import GET_CHARACTER_DETAIL from "./getCharacterDetail.graphql";
// import { z } from "zod";
// import {
//   GetCharacterDetailQuery,
//   GetCharacterDetailQueryVariables,
// } from "@/graphql/generated";

// const paramsSchema = z.object({
//   id: z.string(),
// });

// export const dynamicParams = false;

// export default async function CharacterDetail({
//   params,
// }: {
//   params: { id: string };
// }) {
//   return <div>character detail</div>;

//   const { id } = paramsSchema.parse(params);

//   const { data, error } = await rickAndMortyApiClient.query<
//     GetCharacterDetailQuery,
//     GetCharacterDetailQueryVariables
//   >({ query: GET_CHARACTER_DETAIL, variables: { id } });

//   if (error || !data) {
//     return <div>Could no load data</div>;
//   }

//   return (
//     <div className="text-slate-50">
//       <div className="text-xl">detail page</div>
//       <div>detail page</div>
//       <div>detail page</div>
//     </div>
//   );
// }

export const dynamicParams = false;

export function generateStaticParams() {
  let slugs = ["1", "2", "3", "4", "5", "6"];
  return slugs.map((slug) => ({ id: slug }));
}

export default function PhotoPage({
  params: { id },
}: {
  params: { id: string };
}) {
  return <div className="card">{id}</div>;
}
