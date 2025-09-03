"use client";

import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";

const testimonials = [
  {
    quote:
      "John adalah developer yang luar biasa. Dia selalu memberikan solusi yang inovatif dan berkualitas tinggi. Proyek yang dia kerjakan selalu selesai tepat waktu.",
    name: "Sarah Johnson",
    title: "Project Manager, Tech Corp",
  },
  {
    quote:
      "Kemampuan teknis John sangat mengesankan. Dia mampu menguasai teknologi terbaru dengan cepat dan mengimplementasikannya dengan efektif.",
    name: "Michael Chen",
    title: "Senior Developer, Startup Inc",
  },
  {
    quote:
      "Kolaborasi dengan John sangat menyenangkan. Dia komunikatif, responsif, dan selalu terbuka terhadap feedback. Hasil kerja selalu melampaui ekspektasi.",
    name: "Lisa Rodriguez",
    title: "UI/UX Designer, Creative Agency",
  },
  {
    quote:
      "John memiliki pemahaman bisnis yang baik selain skill teknisnya. Dia selalu memberikan saran yang valuable untuk meningkatkan user experience.",
    name: "David Kim",
    title: "Product Owner, E-commerce Platform",
  },
  {
    quote:
      "Sebagai mentor, John sangat sabar dan detail dalam menjelaskan konsep-konsep kompleks. Dia benar-benar passionate dalam berbagi ilmu.",
    name: "Emma Thompson",
    title: "Junior Developer, Web Solutions",
  },
];

export default function ExperienceSection() {
  return (
    <section id="experience" className="py-20 bg-black">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Apa Kata Mereka
          </h2>
          <p className="text-lg text-neutral-300 max-w-3xl mx-auto">
            Testimoni dari klien dan kolega yang pernah bekerja sama dengan saya
          </p>
        </div>

        <div className="h-[40rem] rounded-md flex flex-col antialiased bg-white dark:bg-black dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden">
          <InfiniteMovingCards
            items={testimonials}
            direction="right"
            speed="slow"
          />
        </div>
      </div>
    </section>
  );
}
