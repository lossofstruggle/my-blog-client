"use client";

import ThreeCanvas from "@/component/ThreeCanvas";

export default function myself() {
  return (
    <div className="flex justify-center text-white ">
      <ThreeCanvas className="fixed inset-0 -z-10 opacity-60" />
    </div>
  );
}
