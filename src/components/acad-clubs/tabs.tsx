"use client";

import { useState } from "react";

export default function Tabs() {
  const [activeTab, setActiveTab] = useState("clubs");

  const tabs = [
    { id: "clubs", label: "Academic Clubs" },
    { id: "csp", label: "Community Service Projects" },
    { id: "others", label: "Others" },
  ];

  const tabContents: { [key: string]: string } = {
    clubs:
      "This is some placeholder content for the Clubs tab's associated content.",
    csp: "This is some placeholder content for the CSP tab's associated content.",
    others:
      "This is some placeholder content for the Others tab's associated content.",
  };

  return (
    <div>
      <div className="mb-4 border-b border-gray-200 dark:border-gray-700">
        <ul
          className="-mb-px flex flex-wrap text-center text-sm font-medium"
          role="tablist"
        >
          {tabs.map(({ id, label }) => (
            <li key={id} role="presentation" className="me-2">
              <button
                className={`inline-block rounded-t-lg border-b-2 p-4 ${
                  activeTab == id
                    ? "border-blue-500 text-blue-500"
                    : "border-transparent text-gray-500"
                }`}
                type="button"
                role="tab"
                aria-controls={id}
                aria-selected={activeTab == id}
                onClick={() => setActiveTab(id)}
              >
                {label}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div id="default-tab-content">
        {Object.keys(tabContents).map((tabKey) => (
          <div
            key={tabKey}
            className={`rounded-lg bg-gray-50 p-4 dark:bg-gray-800 ${
              activeTab == tabKey ? "block" : "hidden"
            }`}
            role="tabpanel"
            aria-labelledby={`${tabKey}-tab`}
          >
            <p className="text-grey-400 text-sm dark:text-gray-400">
              {tabContents[tabKey]}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
