import { MouseEventHandler } from "react";

export const UpdateOverlay = ({
  updateWorker,
}: {
  updateWorker: MouseEventHandler<HTMLDivElement>;
}) => (
  <div
    style={{
      position: "absolute",
      top: "0",
      left: "0",
      color: "white",
      filter: "drop-shadow(0 0 0.75rem black);",
      textShadow: "-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black",
      textAlign: "center",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      height: 64,
      width: 64,
      cursor: "pointer",
    }}
    onClick={updateWorker}
  >
    <p
      style={{
        margin: 0,
        fontSize: "34px",
      }}
    >
      ⟳
    </p>
    <p style={{ margin: 0, marginBottom: "5px", fontSize: "16px" }}>Update</p>
  </div>
);
