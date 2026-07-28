const stats = [
  {
    value: "4+",
    label: "Years Experience",
    description: "4+ years of delivering high-quality results across diverse industries",
  },
  {
    value: "400+",
    label: "Projects Completed",
    description:
      "Successfully completed 400+ projects, helping brands and sellers present their products with impact and clarity",
  },
  {
    value: "Global",
    label: "Remote Collaboration",
    description:
      "Working remotely with clients across multiple countries, delivering reliable communication and on-time results.",
  },
];

export default function App() {
  return (
    <section className="w-full py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-black grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-white/20">
          {stats.map((stat) => (
            <div key={stat.value} className="px-8 py-10 lg:px-12 lg:py-12 flex flex-col gap-4">
              <span
                className="text-white text-[56px] lg:text-[64px] font-bold leading-none"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                {stat.value}
              </span>
              <span
                className="text-white text-lg font-semibold leading-snug"
                style={{ fontFamily: "'Raleway', sans-serif" }}
              >
                {stat.label}
              </span>
              <p
                className="text-white/70 text-base font-normal leading-relaxed"
                style={{ fontFamily: "'Raleway', sans-serif" }}
              >
                {stat.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
