import {
  BreadcrumbCurrentLink,
  BreadcrumbLink,
  BreadcrumbRoot,
} from "@/components/ui/breadcrumb";
import { CharacterDetail } from "./CharacterDetail";

export const dynamicParams = true;

export default async function CharacterDetailPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-16 text-slate-50">
      <div className="flex-grow-0 p-4">
        {/* todo: restyle the breadcrumb */}
        <BreadcrumbRoot>
          <BreadcrumbLink href="/characters">Characters</BreadcrumbLink>
          <BreadcrumbCurrentLink>{params.id}</BreadcrumbCurrentLink>
        </BreadcrumbRoot>{" "}
      </div>
      <CharacterDetail params={params} />
    </div>
  );
}
