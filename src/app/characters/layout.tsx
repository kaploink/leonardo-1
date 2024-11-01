import { ReactNode } from "react";

export default function Layout({
  children,
  modal,
}: {
  children: ReactNode;
  modal: ReactNode;
}) {
  return (
    <div>
      <div>hello from layout</div>
      {children}
      <div> in between</div>
      {modal}
      <div>after</div>
      {/* {modal && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
          {modal}
        </div>
      )} */}
    </div>
  );
}
