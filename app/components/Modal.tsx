import React from "react";

type Position = "fixed" | "absolute" | "static" | "sticky";

interface ModalOverlayProps extends React.HTMLAttributes<HTMLDivElement> {
  position?: Position;
}

interface ModalProps extends React.HTMLAttributes<HTMLDivElement> {
  modalOverlayProps?: ModalOverlayProps;
  position?: Position;
  align?: "left" | "center" | "right";
  children: React.ReactNode;
}

export function Modal({
  children,
  className,
  modalOverlayProps = { position: "fixed" },
  position = "absolute",
  align = "center",
  ...props
}: ModalProps) {
  return (
    <>
      {/* Modal Overlay */}
      <div
        className={`${modalOverlayProps?.position} bg-modal-clr inset-0 z-[999] ${className}`}
        {...modalOverlayProps}
      ></div>

      {/* Modal Content */}
      <div
        className={`${position} z-[1000] flex items-center justify-center ${align === "left" ? "left-0" : align === "right" ? "right-0" : "left-0 right-0"}`}
        {...props}
      >
        {children}
      </div>
    </>
  );
}
