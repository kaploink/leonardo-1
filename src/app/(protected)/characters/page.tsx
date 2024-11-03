import {
  GetCharacterListItemsQuery,
  GetCharacterListItemsQueryVariables,
} from "@/graphql/generated";
import { rickAndMortyApiClient } from "@/lib/apollo-clients";
import { Image, Text } from "@chakra-ui/react";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import { z } from "zod";
import { registerFormSchema } from "../../register/schema";
import GET_CHARACTER_LIST_ITEMS from "./getCharacterListItems.graphql";

// todo: move to somewhere shared
const numberParamSchema = z.string().transform((val) => parseInt(val, 10));

const searchParamsSchema = z.object({
  page: numberParamSchema.refine((val) => val > 0).optional(),
});

const getRegistrationData = async () => {
  const cookieStore = cookies();

  try {
    return registerFormSchema.parse(
      JSON.parse(cookieStore.get("registerInfo")?.value ?? "{}"),
    );
    // eslintrc config not working for some reason
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (_e) {
    return redirect("/register");
  }
};

export default async function InformationPage({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  const { username, jobTitle } = await getRegistrationData();

  // parse at run time to sanitise untrusted inputs
  const { page } = searchParamsSchema.parse(
    // check type at compile time to pick up bugs (e.g. wrong prop names)
    searchParams satisfies z.input<typeof searchParamsSchema>,
  );

  const { data, error } = await rickAndMortyApiClient.query<
    GetCharacterListItemsQuery,
    GetCharacterListItemsQueryVariables
  >({ query: GET_CHARACTER_LIST_ITEMS, variables: { page } });

  if (error || !data?.characters?.results)
    return <Text>Error loading data</Text>;

  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center gap-8 p-4">
      <Link
        href="/register"
        className="inline-flex gap-2 self-end text-slate-400 hover:text-slate-200"
      >
        <span>{username}</span>
        <span className="text-slate-600">|</span>
        <span>{jobTitle}</span>
      </Link>

      {/* todo, should say "Characters" somewhere too; probably in the graphic, styled nicely */}
      <Image
        src="/rick-and-morty-logo.png"
        alt="Rick and Morty logo"
        width={300}
        className="-mt-8"
      />

      <div className="flex w-full flex-col border-t border-slate-700">
        {data.characters.results.map((character) => {
          if (character === null) {
            throw new Error("Unsupported data model");
          }

          return (
            <Link
              className="flex border-b border-slate-700 p-4 hover:bg-slate-900"
              key={character.id}
              href={`/characters/${character.id}`}
              passHref
            >
              <Image
                className="h-16 w-16 rounded-full"
                // todo: remove optionality/nullability from type
                // - set non-nullable in the graphql schema (with '!')
                // - validate early if still not resolved
                src={character.image ?? undefined}
                alt={character.name ?? undefined}
              />
              <div className="flex flex-col justify-center pl-4">
                <div className="text-lg font-semibold text-slate-50">
                  {character.name}
                </div>
                <div className="text-slate-400">
                  {character.location?.name} • {character.species}
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      <div className="flex items-center justify-center text-xl">
        {(page ?? 1) > 1 ? (
          <a
            href={`?page=${data.characters.info?.prev}`}
            className="p-4 text-slate-400 hover:text-slate-50"
          >
            ❮
          </a>
        ) : (
          <div className="p-4 text-slate-800">❮</div>
        )}
        <div className="flex size-10 items-center justify-center rounded-full bg-slate-50 font-semibold text-slate-950">
          {page ?? 1}
        </div>
        {data.characters.info?.next && (
          <a
            href={`?page=${data.characters.info?.next}`}
            className="p-4 text-slate-400 hover:text-slate-50"
          >
            ❯
          </a>
        )}
      </div>
    </div>
  );
}
