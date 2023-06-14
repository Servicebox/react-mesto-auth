import { useEffect } from "react";

function usePopupClose(isOpen, closePopup) {
  useEffect(() => {
    if (!isOpen) return; 

    const handleOverlay = (e) => {
      if (e.target.classList.contains("popup_opened")) {
        closePopup();
      }
    };

    const handleEscape = (e) => {
      if (e.key === "Escape") {
        closePopup();
      }
    };

    document.addEventListener("keydown", handleEscape);
    document.addEventListener("mousedown", handleOverlay);

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.removeEventListener("mousedown", handleOverlay);
    };
  }, [isOpen]);
}

export { usePopupClose };