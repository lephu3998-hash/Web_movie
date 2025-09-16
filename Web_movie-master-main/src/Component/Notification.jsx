import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";

/**
 * Notification popup
 * Props:
 * - repeatHours: số giờ sau khi ẩn sẽ hiện lại (mặc định 24)
 * - localStorageKey: key dùng để lưu timestamp (mặc định "notificationClosedAt")
 *
 * Usage: <Notification /> hoặc <Notification repeatHours={12} />
 */
export default function Notification({ repeatHours = 24, localStorageKey = "notificationClosedAt" }) {
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const dialogRef = useRef(null);
  const repeatMs = Number(repeatHours) * 60 * 60 * 1000;

  // Initialize: Check localStorage on component mount
  useEffect(() => {
    try {
      const closedAt = localStorage.getItem(localStorageKey);
      if (!closedAt) {
        setIsVisible(true);
        return;
      }
      const closedTs = parseInt(closedAt, 10);
      const now = Date.now();
      const diff = now - closedTs;
      if (diff >= repeatMs) {
        localStorage.removeItem(localStorageKey);
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    } catch (err) {
      console.error("Notification init error:", err);
      setIsVisible(true);
    }
  }, [repeatMs, localStorageKey]);

  // Focus on the main button when dialog becomes visible
  useEffect(() => {
    if (isVisible && !isClosing) {
      const btn = dialogRef.current?.querySelector("button");
      if (btn) btn.focus();
    }
  }, [isVisible, isClosing]);

  // Sync state across multiple tabs
  useEffect(() => {
    const onStorage = (e) => {
      if (e.key !== localStorageKey) return;
      if (e.newValue) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, [localStorageKey]);

  // Close popup: Save timestamp and trigger close animation
  const closeNotification = () => {
    try {
      localStorage.setItem(localStorageKey, String(Date.now()));
    } catch (err) {
      console.warn("Cannot write to localStorage", err);
    }
    setIsClosing(true);
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      closeNotification();
    }
  };

  // Close with ESC key
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") closeNotification();
    };
    if (isVisible && !isClosing) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isVisible, isClosing]);

  // Hide the component completely after the animation
  const handleAnimationEnd = () => {
    if (isClosing) {
      setIsVisible(false);
      setIsClosing(false);
    }
  };

  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center z-50 bg-black transition-opacity duration-300 ${
        isClosing ? "bg-opacity-0" : "bg-opacity-50"
      }`}
      onClick={handleOverlayClick}
      role="presentation"
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label="Thông báo"
        className={`bg-[#1b1b1b] text-white p-8 rounded-2xl shadow-2xl max-w-lg w-full mx-4 transform transition-all duration-300 ${
          isClosing ? "scale-95 opacity-0" : "scale-100 opacity-100"
        }`}
        onTransitionEnd={handleAnimationEnd}
      >
        {/* Logo */}
        <div className="flex flex-col items-center">
          <img
            src="/Black and Yellow Cinema Logo.png"
            alt="Busi"
            className="w-16 h-16 mb-3"
          />
          <span className="text-yellow-400 font-semibold text-lg">Busi</span>
          <span className="text-gray-400 text-sm">Cinema</span>
        </div>

        {/* Title and Content */}
        <h2 className="text-white text-2xl font-bold text-center mt-4">
          Xem Phim Miễn Phí Cực Nhanh, Chất Lượng Cao
        </h2>
        <p className="text-gray-300 text-base text-center mt-2">
          Và cập nhật liên tục — trải nghiệm mượt mà, không quảng cáo phiền.
        </p>

        {/* Buttons */}
        <div className="mt-6 flex items-center justify-center gap-4">
          <button
            onClick={closeNotification}
            className="bg-yellow-400 text-black font-bold py-3 px-8 rounded-full shadow-lg hover:scale-105 transition-transform duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-300"
          >
            Xem Ngay →
          </button>
          <button
            onClick={closeNotification}
            className="text-gray-300 underline-offset-2 hover:text-white focus:outline-none"
          >
          
          </button>
        </div>
      </div>
    </div>
  );
}

Notification.propTypes = {
  repeatHours: PropTypes.number,
  localStorageKey: PropTypes.string,
};