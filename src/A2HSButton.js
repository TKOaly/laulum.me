import React, { useEffect, useState } from "react";

const A2HSButton = (props) => {
  const [visible, setVisible] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState();

  const onClick = async (e) => {
    setVisible(false);
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    await deferredPrompt.userChoice();
    setDeferredPrompt(null);
  };

  useEffect(() => {
    window.addEventListener("beforeinstallprompt", (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setVisible(true);
    });
  }, []);

  return (
    <button
      className="add-btton"
      style={visible ? { display: "block" } : { display: "none" }}
      onClick={onClick}
    >
      Add to Home Screen
    </button>
  );
};

export default A2HSButton;
