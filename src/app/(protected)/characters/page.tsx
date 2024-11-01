import { rickAndMortyApiClient } from "@/lib/apollo-clients";
import { Box, Image, Text } from "@chakra-ui/react";
import { cookies } from "next/headers";
import { z } from "zod";
import {
  GetCharacterListItemsQuery,
  GetCharacterListItemsQueryVariables,
} from "@/graphql/generated";
import GET_CHARACTER_LIST_ITEMS from "./getCharacterListItems.graphql";
import Link from "next/link";
import { registerFormSchema } from "../../register/schema";
import { redirect } from "next/navigation";
import { getRegistrationDataOrRedirect } from "./queries";

// todo: move to somewhere shared
const numberParamSchema = z.string().transform((val) => parseInt(val, 10));

const searchParamsSchema = z.object({
  page: numberParamSchema.refine((val) => val > 0).optional(),
});

const getRegistrationData = async () => {
  const cookieStore = cookies();
  // json parse cookie value
  // const registerInfo = JSON.parse(cookieStore.get("registerInfo")?.value ?? "{}");

  try {
    return registerFormSchema.parse(
      JSON.parse(cookieStore.get("registerInfo")?.value ?? "{}"),
    );
  } catch (e) {
    return redirect("/register");
  }
};

export default async function InformationPage({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  const { username, jobTitle } = await getRegistrationData();

  console.log("characters page", { username, jobTitle });

  // const [page, setPage] = useState(1);
  // const { open, onOpen, onClose } = useDisclosure();
  // const [selectedCharacter, setSelectedCharacter] = useState<
  //   Character["id"] | undefined
  // >();

  // parse at run time to sanitise untrusted inputs
  const { page } = searchParamsSchema.parse(
    // check type at compile time to pick up bugs (e.g. wrong prop names)
    searchParams satisfies z.input<typeof searchParamsSchema>,
  );

  const { data, error } = await rickAndMortyApiClient.query<
    GetCharacterListItemsQuery,
    GetCharacterListItemsQueryVariables
  >({ query: GET_CHARACTER_LIST_ITEMS, variables: { page } });
  // const { data, loading, error } = await rickAndMortyApiClient.query({
  //   query: GET_CHARACTERS_2,
  //   variables: { page },
  // });

  if (error || !data?.characters?.results)
    return <Text>Error loading data</Text>;

  // const openModal = (character: Character) => {
  //   // setSelectedCharacter(character.id);
  //   // onOpen();
  // };

  // return <div>hello from list</div>;

  return (
    <div>
      <h1 className="p-16 text-center text-5xl">Rick & Morty Characters</h1>
      <Text fontSize="2xl">Welcome, {username}!</Text>
      <Text>Job Title: {jobTitle}</Text>

      <div className="flex flex-col">
        {data.characters.results.map((character) => {
          if (character === null) {
            throw new Error("Unsupported data model");
          }

          return (
            <Link
              className="flex border-b border-slate-800 p-4 hover:bg-slate-800"
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
                <div className="text-lg font-semibold text-white">
                  {character.name}
                </div>
                <div className="text-slate-500">
                  {character.location?.name} • {character.species}
                </div>
              </div>
              {/* <GridItem
                // onClick={() => openModal(character.id)}
                cursor="pointer"
              >
                <Card.Root>
                  <Card.Header>
                    <Heading size="md">{character.name}</Heading>
                  </Card.Header>
                  <Card.Body>
                    <Text>{character.name}</Text>
                  </Card.Body>
                </Card.Root>
              </GridItem> */}
            </Link>
          );
        })}
      </div>

      <div className="flex items-center justify-center py-8 text-xl">
        {(page ?? 1) > 1 ? (
          <a href="?page=1" className="p-4 text-slate-400 hover:text-slate-50">
            ❮
          </a>
        ) : (
          <div className="p-4 text-slate-900">❮</div>
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

        {/* <Button
          // onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          isDisabled={!data.characters.info.prev}
        >
          Previous
        </Button>
        <Button
          // onClick={() => setPage((prev) => prev + 1)}
          isDisabled={!data.characters.info.next}
        >
          Next
        </Button> */}
      </div>

      {/* <Dialog isOpen={open} onClose={onClose}>
        <DialogOverlay />
        <DialogContent>
          <DialogHeader>{selectedCharacter?.name}</DialogHeader>
          <DialogCloseButton />
          <DialogBody>
            <Image
              src={selectedCharacter?.image}
              alt={selectedCharacter?.name}
            />
          </DialogBody>
        </DialogContent>
      </Dialog> */}
    </div>
  );
}
