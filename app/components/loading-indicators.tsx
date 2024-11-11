import { Modal } from "~/components/modal";

type SpinnerProps = {
  height?: number;
  width?: number;
  speed?: number;
  borderWidth?: number;
  borderColor?: string;
};

export function Spinner({
  height = 120,
  width = 120,
  speed = 1.3,
  borderWidth = 6,
  borderColor = "rgba(21,112,239,0.2)",
}: SpinnerProps) {
  return (
    <Modal position={"absolute"}>
      <div
        // className="absolute inset-0 flex items-center justify-center" // Center the spinner within its container
        style={{
          height: `${height}px`,
          width: `${width}px`,
          border: `${borderWidth}px solid`,
          borderColor: `${borderColor} transparent ${borderColor} transparent`,
          borderRadius: "50%",
          animation: `spinner ${speed}s linear infinite`,
        }}
      >
        <style>
          {`
          @keyframes spinner {
            to {
              transform: rotate(360deg);
            }
          }
        `}
        </style>
      </div>
    </Modal>
  );
}
