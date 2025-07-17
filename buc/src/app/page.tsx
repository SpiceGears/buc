"use client";

import React, { useState, useEffect } from "react";
import { useI18n, Lang } from "@/i18n";

export default function MainPage() {
  const { t, setLang, lang } = useI18n();
  const [alliance, setAlliance] = useState<"red" | "blue">("blue");
  const [counts, setCounts] = useState<number[]>([0, 0, 0]);
  const [subtractMode, setSubtractMode] = useState(false);

  // load saved alliance
  useEffect(() => {
    const a = window.localStorage.getItem("alliance");
    if (a === "red" || a === "blue") setAlliance(a);
  }, []);

  // language options
  const LANGUAGES: { code: Lang; label: string }[] = [
    { code: "en", label: "English" },
    { code: "es", label: "Español" },
    { code: "ar", label: "العربية" },
    { code: "bn", label: "বাংলা" },
    { code: "de", label: "Deutsch" },
    { code: "fr", label: "Français" },
    { code: "hi", label: "हिन्दी" },
    { code: "ja", label: "日本語" },
    { code: "pl", label: "Polski" },
    { code: "pt", label: "Português" },
    { code: "zh", label: "中文" },
  ];

  // alliance buttons
  const ALLIANCES = [
    {
      code: "blue",
      labelKey: "blueAlliance",
      classes: `
        px-6 py-3 text-lg text-white
        bg-blue-500 rounded-lg shadow
        hover:bg-blue-600 focus:outline-none
        focus:ring-2 focus:ring-blue-500
      `.trim(),
    },
    {
      code: "red",
      labelKey: "redAlliance",
      classes: `
        px-6 py-3 text-lg text-white
        bg-red-500 rounded-lg shadow
        hover:bg-red-600 focus:outline-none
        focus:ring-2 focus:ring-red-500
      `.trim(),
    },
  ];

  const changeLang = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const code = e.target.value as Lang;
    setLang(code);
  };

  const chooseAlliance = (c: "red" | "blue") => {
    window.localStorage.setItem("alliance", c);
    setAlliance(c);
    // reset counters/mode if you like:
    // setCounts([0,0,0]);
    // setSubtractMode(false);
  };

  const handleSquare = (i: number) =>
    setCounts((prev) => {
      const next = [...prev];
      if (subtractMode) {
        if (next[i] > 0) next[i]--;
        setSubtractMode(false);
      } else {
        next[i]++;
      }
      return next;
    });

      function getSquareClasses(count: number) {
    if (subtractMode) {
      return "bg-black hover:bg-gray-800 focus:ring-black";
    }
    // always green in add mode here
    return "bg-green-500 hover:bg-green-600 focus:ring-green-500";
  }

  const enterRemoveMode = () => setSubtractMode(true);


  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 flex flex-col items-center">
      {/* Language Dropdown */}
      <div className="w-full max-w-md flex items-center justify-end space-x-2 text-black">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6 text-gray-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 2a10 10 0 100 20 10 10 0 000-20zM2 12h20M12 2v20"
          />
        </svg>
        <select
          value={lang}
          onChange={changeLang}
          className="
            bg-white border border-gray-300
            rounded-lg px-3 py-2
            focus:outline-none focus:ring-2 focus:ring-indigo-500
          "
        >
          {LANGUAGES.map(({ code, label }) => (
            <option key={code} value={code}>
              {label}
            </option>
          ))}
        </select>
      </div>

      {/* Alliance Selection */}
      <h2 className="mt-8 text-2xl text-gray-800">
        {t("chooseAlliance")}
      </h2>
      <div className="mt-4 flex space-x-4">
        {ALLIANCES.map(({ code, labelKey, classes }) => (
          <button
            key={code}
            onClick={() => chooseAlliance(code as "red" | "blue")}
            className={classes + (alliance === code ? " ring-2 ring-offset-2 ring-indigo-500" : "")}
          >
            {t(labelKey as any)}
          </button>
        ))}
      </div>

      {/* Counters */}
      <div className="mt-8 flex items-center space-x-6">
  {alliance === "blue" ? (
    <>
      {/* Left column (blue): counters[0] & counters[1] */}
      <div className="flex flex-col space-y-6">
        {[0, 1].map((i) => (
          <button
            key={i}
            onClick={() => handleSquare(i)}
            className={`
              w-24 h-24 flex items-center justify-center
              text-2xl font-bold text-white rounded-lg
              focus:outline-none focus:ring-2 transition-colors
              ${getSquareClasses(counts[i])}
            `}
            aria-label={subtractMode ? t("decrement") : t("increment")}
          >
            {counts[i]}
          </button>
        ))}
      </div>

      {/* Right single (blue): counter[2] */}
      <button
        onClick={() => handleSquare(2)}
        className={`
          w-24 h-24 flex items-center justify-center
          text-2xl font-bold text-white rounded-lg
          focus:outline-none focus:ring-2 transition-colors
          ${getSquareClasses(counts[2])}
        `}
        aria-label={subtractMode ? t("decrement") : t("increment")}
      >
        {counts[2]}
      </button>
    </>
  ) : (
    <>
      {/* Left single (red), centered vertically: counter[0] */}
      <div className="flex-1 flex items-center justify-center">
        <button
          onClick={() => handleSquare(0)}
          className={`
            w-24 h-24 flex items-center justify-center
            text-2xl font-bold text-white rounded-lg
            focus:outline-none focus:ring-2 transition-colors
            ${getSquareClasses(counts[0])}
          `}
          aria-label={subtractMode ? t("decrement") : t("increment")}
        >
          {counts[0]}
        </button>
      </div>

      {/* Right column (red): counters[1] & counters[2] */}
      <div className="flex flex-col space-y-6">
        {[1, 2].map((i) => (
          <button
            key={i}
            onClick={() => handleSquare(i)}
            className={`
              w-24 h-24 flex items-center justify-center
              text-2xl font-bold text-white rounded-lg
              focus:outline-none focus:ring-2 transition-colors
              ${getSquareClasses(counts[i])}
            `}
            aria-label={subtractMode ? t("decrement") : t("increment")}
          >
            {counts[i]}
          </button>
        ))}
      </div>
    </>
  )}
</div>

      {/* Remove Mode Toggle */}
      <button
        onClick={enterRemoveMode}
        className={`
          mt-8 w-16 h-16 rounded-full
          flex items-center justify-center
          text-white text-3xl font-bold
          focus:outline-none focus:ring-2
          transition-colors
          ${subtractMode
            ? "bg-gray-500 hover:bg-gray-600 focus:ring-gray-500"
            : "bg-red-500 hover:bg-red-600 focus:ring-red-500"}
        `}
        aria-pressed={subtractMode}
        aria-label="Enter subtract mode"
      >
        ×
      </button>
      <p className="mt-2 text-sm text-gray-600">
        {subtractMode ? t("subtractMode") : t("addMode")}
      </p>
    </div>
  );
}