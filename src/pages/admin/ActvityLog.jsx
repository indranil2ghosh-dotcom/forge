import React from "react";
import { activityLogs } from "../data/demoData";

export default function ActivityLog() {
  return (
    <div className="p-6 bg-[#0B1220] min-h-screen text-white">

      {/* Header */}
      <h1 className="text-2xl font-bold mb-2">Activity Log</h1>
      <p className="text-gray-400 mb-6">
        Capability assessment history and audit trail
      </p>

      {/* Search */}
      <input
        placeholder="Search by partner, capability, vertical, or message..."
        className="w-full mb-6 h-12 px-4 bg-[#0F172A] border border-gray-700 rounded-md"
      />

      {/* List */}
      <div className="space-y-4">
        {activityLogs.map((log) => (
          <div
            key={log.id}
            className="p-5 rounded-xl bg-[#111827] border border-gray-800 hover:border-gray-600 transition"
          >

            {/* Message */}
            <p className="font-semibold text-lg mb-2">
              {log.message}
            </p>

            {/* Meta */}
            <div className="text-sm text-gray-400 flex flex-wrap gap-2 items-center">
              <span>{log.company}</span>
              <span>{log.project}</span>

              {/* Category */}
              <span className="px-2 py-1 bg-gray-700 rounded text-xs">
                {log.category}
              </span>

              {/* Type Badge */}
              <span
                className={`px-2 py-1 rounded text-xs ${
                  log.type === "Admin Feedback"
                    ? "bg-yellow-600"
                    : "bg-purple-600"
                }`}
              >
                {log.type}
              </span>

              {/* User */}
              <span>by {log.user}</span>
            </div>

            {/* Time */}
            <p className="text-xs text-gray-500 mt-2">
              {log.time}
            </p>

          </div>
        ))}
      </div>

    </div>
  );
}