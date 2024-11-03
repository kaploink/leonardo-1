import { CharacterDetail } from "../../[id]/CharacterDetail";
import Modal from "./modal";

export const dynamicParams = true;

export default function CharacterModal({ params }: { params: { id: string } }) {
  return (
    <Modal>
      <CharacterDetail params={params} />
    </Modal>
  );
}
