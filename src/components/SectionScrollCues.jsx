"use client";
import { useEffect } from "react";

export default function SectionScrollCues() {
  useEffect(() => {
    const sections = Array.from(document.querySelectorAll(".section.marked"));
    if (!sections.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("is-inview");
            io.unobserve(e.target);
          }
        }
      },
      { threshold: 0.28, rootMargin: "0px 0px -10% 0px" }
    );

    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  return null;
}
