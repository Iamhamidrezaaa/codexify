"use client";

import { useState } from "react";

export function AdminLogoutButton() {
  const [loading, setLoading] = useState(false);

  const onLogout = async () => {
    setLoading(true);
    try {
      await fetch("/api/admin/logout", { method: "POST" });
      window.location.href = "/adminha.html";
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={onLogout}
      disabled={loading}
      className="rounded-full border border-line px-4 py-2 text-sm text-fg transition hover:border-lime hover:text-lime disabled:opacity-60"
    >
      {loading ? "خروج…" : "خروج"}
    </button>
  );
}
