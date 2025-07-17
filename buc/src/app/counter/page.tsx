"use client";

import React, { useState, useEffect } from "react";
import { useI18n } from "../../../src/i18n";

export default function CounterPage() {
  const { t } = useI18n();
  const [counts, setCounts] = useState<number[]>([0, 0, 0]);
  const [alliance, setAlliance] = useState<"red" | "blue">("blue");
  const [subtractMode, setSubtractMode] = useState(false);

  // load alliance on mount
  useEffect(() => {
    const a = window.localStorage.getItem("alliance");
    if (a === "red" || a === "blue") setAlliance(a);
  }, []);

  // handle a square tap
  const handleSquare = (i: number) => {
    setCounts((prev) => {
      const next = [...prev];
      if (subtractMode) {
        if (next[i] > 0) next[i]--;
        // exit subtract mode after one removal
        setSubtractMode(false);
      } else {
        next[i]++;
      }
      return next;
    });
  };

  // enter subtract mode
  const enterRemoveMode = () => {
    setSubtractMode(true);
  };

  return (
    <div className="h-screen flex flex-col items-center bg-gray-50 px-4 py-8">

      {/* three squares in an “L” layout: two stacked left, one centered right */}
      <div className="mt-8 inline-flex items-center space-x-6">
        {/* left stack */}
        <div className="flex flex-col space-y-6">
          {[0, 1].map((i) => (
            <button
              key={i}
              onClick={() => handleSquare(i)}
              className={`
                w-24 h-24
                flex items-center justify-center
                text-2xl font-bold text-white
                rounded-lg transition-colors
                focus:outline-none focus:ring-2
                ${subtractMode
                  ? "bg-red-500 hover:bg-red-600 focus:ring-red-500"
                  : "bg-green-500 hover:bg-green-600 focus:ring-green-500"}
              `}
              aria-label={subtractMode ? t("decrement") : t("increment")}
            >
              {counts[i]}
            </button>
          ))}
        </div>

        {/* right square */}
        <button
          onClick={() => handleSquare(2)}
          className={`
            w-24 h-24
            flex items-center justify-center
            text-2xl font-bold text-white
            rounded-lg transition-colors
            focus:outline-none focus:ring-2
            ${subtractMode
              ? "bg-red-500 hover:bg-red-600 focus:ring-red-500"
              : "bg-green-500 hover:bg-green-600 focus:ring-green-500"}
          `}
          aria-label={subtractMode ? t("decrement") : t("increment")}
        >
          {counts[2]}
        </button>
      </div>

      {/* X button to enter remove mode */}
      <button
        onClick={enterRemoveMode}
        className={`
          mt-8 w-16 h-16
          ${subtractMode
            ? "bg-gray-500 hover:bg-gray-600 focus:ring-gray-500"
            : "bg-red-500 hover:bg-red-600 focus:ring-red-500"}
          rounded-full
          text-white text-3xl font-bold
          flex items-center justify-center
          focus:outline-none focus:ring-2
          transition-colors
        `}
        aria-label="Enter subtract mode"
      >
        ×
      </button>

      {/* mode indicator */}
      <p className="mt-2 text-sm text-gray-600">
        {subtractMode ? t("subtractMode") : t("addMode")}
      </p>
    </div>
  );
}