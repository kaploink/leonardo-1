import { CharacterDetail } from "../../[id]/page";
import Modal from "./modal";

export const dynamicParams = true;

export default function CharacterModal({ params }: { params: { id: string } }) {
  return (
    <Modal>
      <CharacterDetail params={params} />
    </Modal>
  );
}
