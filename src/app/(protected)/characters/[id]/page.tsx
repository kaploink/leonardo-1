import { rickAndMortyApiClient } from "@/lib/apollo-clients";

import {
  BreadcrumbCurrentLink,
  BreadcrumbLink,
  BreadcrumbRoot,
} from "@/components/ui/breadcrumb";
import {
  GetCharacterDetailQuery,
  GetCharacterDetailQueryVariables,
} from "@/graphql/generated";
import Image from "next/image";
import { ReactNode } from "react";
import { z } from "zod";
import GET_CHARACTER_DETAIL from "./getCharacterDetail.graphql";

const paramsSchema = z.object({
  id: z.string(),
});

export const dynamicParams = true;

// todo: use/update the shared chakra one instead
const DataListRoot = ({ children }: { children: ReactNode }) => {
  return (
    <dl className="grid grid-cols-1 md:grid-cols-[auto_1fr]">{children}</dl>
  );
};

const DataListItem = ({
  label,
  value,
}: {
  label: string;
  value: ReactNode;
}) => {
  return (
    <div
      key={label}
      className="row-span-2 grid grid-cols-subgrid items-center gap-x-8 border-b border-b-slate-900 p-4 md:col-span-2"
    >
      <dt className="text-md font-semibold text-slate-600">{label}</dt>
      <dd className="text-xl">{value ?? "-"}</dd>
    </div>
  );
};

export async function CharacterDetail({ params }: { params: { id: string } }) {
  const { id } = paramsSchema.parse(params);

  const { data, error } = await rickAndMortyApiClient.query<
    GetCharacterDetailQuery,
    GetCharacterDetailQueryVariables
  >({ query: GET_CHARACTER_DETAIL, variables: { id } });

  if (error || !data.character) {
    return <div>Could no load data</div>;
  }

  const { image, name, status, species, gender, type, origin, location } =
    data.character;

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-16 p-4 text-slate-50">
      <div className="flex flex-col items-center gap-8 p-4">
        <Image
          className="h-64 w-64 rounded-full"
          // todo: remove optionality/nullability from type
          // - set non-nullable in the graphql schema (with '!')
          // - validate early if still not resolved
          src={image ?? undefined}
          alt={name ?? undefined}
          width={256}
          height={256}
        />
        <h1 className="text-center text-5xl font-semibold">{name}</h1>
      </div>
      <DataListRoot>
        <DataListItem label="Status" value={status} />
        <DataListItem label="Species" value={species} />
        <DataListItem label="Gender" value={gender} />
        <DataListItem label="Type" value={type} />
        <DataListItem
          label="Origin"
          value={[origin?.name, origin?.type, origin?.dimension]
            .filter(Boolean)
            .join(" • ")}
        />
        <DataListItem
          label="Location"
          value={[location?.name, location?.type, location?.dimension]
            .filter(Boolean)
            .join(" • ")}
        />
      </DataListRoot>
    </div>
  );
}

export default async function CharacterDetailPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-16 p-4 text-slate-50">
      {/* todo: restyle the breadcrumb */}
      <BreadcrumbRoot>
        <BreadcrumbLink href="/characters">Characters</BreadcrumbLink>
        <BreadcrumbCurrentLink>{params.id}</BreadcrumbCurrentLink>
      </BreadcrumbRoot>{" "}
      <CharacterDetail params={params} />
    </div>
  );
}
