import { rickAndMortyApiClient } from "@/lib/apollo-clients";
import { Box, Image, Text } from "@chakra-ui/react";
// import { cookies } from "next/headers";
import { z } from "zod";
import {
  GetCharacterListItemsQuery,
  GetCharacterListItemsQueryVariables,
} from "@/graphql/generated";
import GET_CHARACTER_LIST_ITEMS from "./getCharacterListItems.graphql";
import Link from "next/link";

// todo: move to somewhere shared
const numberParamSchema = z.string().transform((val) => parseInt(val, 10));

const searchParamsSchema = z.object({
  page: numberParamSchema.refine((val) => val > 0).optional(),
});

export default async function InformationPage({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  // const cookieStore = cookies();
  // const { username, jobTitle } = registerFormSchema.parse(
  //   cookieStore.get("registerInfo")?.value
  // );

  // const [page, setPage] = useState(1);
  // const { open, onOpen, onClose } = useDisclosure();
  // const [selectedCharacter, setSelectedCharacter] = useState<
  //   Character["id"] | undefined
  // >();

  // parse at run time to sanitise untrusted inputs
  const { page } = searchParamsSchema.parse(
    // check type at compile time to pick up bugs (e.g. wrong prop names)
    searchParams satisfies z.input<typeof searchParamsSchema>
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
      {/* <Text fontSize="2xl">Welcome, {username}!</Text>
      <Text>Job Title: {jobTitle}</Text> */}

      <div className="flex flex-col">
        {data.characters.results.map((character) => {
          if (character === null) {
            throw new Error("Unsupported data model");
          }

          return (
            <Link
              className="flex p-4 border-b border-slate-800 hover:bg-slate-800"
              key={character.id}
              href={`/test/photos/${character.id}`}
              passHref
            >
              <Image
                className="rounded-full h-16 w-16"
                // todo: remove optionality/nullability from type
                // - set non-nullable in the graphql schema (with '!')
                // - validate early if still not resolved
                src={character.image ?? undefined}
                alt={character.name ?? undefined}
              />
              <div className="pl-4 flex flex-col justify-center">
                <div className="font-semibold text-lg text-white">
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

      <Box>
        {(page ?? 1) > 1 && <a href="?page=1">Previous</a>}
        <Box>Page {page ?? 1}</Box>
        {data.characters.info?.next && (
          <a href={`?page=${data.characters.info?.next}`}>Next</a>
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
      </Box>

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
