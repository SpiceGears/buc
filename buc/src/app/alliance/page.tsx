"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useI18n } from "../../../src/i18n";

export default function AlliancePage() {
  const { t } = useI18n();
  const router = useRouter();

  const alliances = [
    {
      code: "blue",
      labelKey: "blueAlliance",
      btnClasses: `
        w-full max-w-md py-4 my-2 text-lg text-white
        bg-blue-500 rounded-lg shadow hover:bg-blue-600
        focus:outline-none focus:ring-2 focus:ring-blue-500
      `.trim(),
    },
    {
      code: "red",
      labelKey: "redAlliance",
      btnClasses: `
        w-full max-w-md py-4 my-2 text-lg text-white
        bg-red-500 rounded-lg shadow hover:bg-red-600
        focus:outline-none focus:ring-2 focus:ring-red-500
      `.trim(),
    },
  ];

  const selectAlliance = (code: "blue" | "red") => {
    localStorage.setItem("alliance", code);
    router.push("/counter");
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center px-4 bg-gray-50">
      <h1 className="text-2xl mb-6 text-gray-800">
        {t("chooseAlliance")}
      </h1>
      {alliances.map(({ code, labelKey, btnClasses }) => (
        <button
          key={code}
          onClick={() => selectAlliance(code as "blue" | "red")}
          className={btnClasses}
        >
          {t(labelKey as any)}
        </button>
      ))}
    </div>
  );
}