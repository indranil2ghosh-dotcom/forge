import React from "react";

export default function ActivityCard({ log }) {
  return (
    <div className="flex gap-4 p-5 rounded-xl bg-[#111827] border border-gray-800 hover:border-gray-600 transition">

      {/* Icon */}
      <div
        className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
          log.role === "admin"
            ? "bg-yellow-600/20 text-yellow-500"
            : "bg-purple-600/20 text-purple-400"
        }`}
      >
        💬
      </div>

      {/* Content */}
      <div className="flex-1">

        {/* Message */}
        <p className="text-lg font-semibold text-white mb-2">
          {log.message}
        </p>

        {/* Meta Info */}
        <div className="flex flex-wrap items-center gap-2 text-sm text-gray-400">

          <span>{log.company}</span>
          <span>{log.project}</span>

          {/* Category */}
          {log.category && (
            <span className="px-2 py-1 rounded bg-gray-700 text-xs text-gray-300">
              {log.category}
            </span>
          )}

          {/* Type Badge */}
          {log.type && (
            <span
              className={`px-2 py-1 rounded text-xs font-medium ${
                log.type === "Admin Feedback"
                  ? "bg-yellow-600/20 text-yellow-400"
                  : "bg-purple-600/20 text-purple-300"
              }`}
            >
              {log.type}
            </span>
          )}

          {/* User */}
          <span className="italic">by {log.user}</span>
        </div>

        {/* Time */}
        <p className="text-xs text-gray-500 mt-2">
          {log.time}
        </p>

      </div>
    </div>
  );
}