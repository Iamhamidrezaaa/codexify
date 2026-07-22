"use client";

import { useEffect } from "react";

/** موس سیستم روی صفحات ادمین — کلاس کاستوم‌کursor را برمی‌دارد */
export function AdminNativeCursor() {
  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("has-custom-cursor");
    root.classList.add("admin-native-cursor");
    return () => {
      root.classList.remove("admin-native-cursor");
    };
  }, []);

  return null;
}
