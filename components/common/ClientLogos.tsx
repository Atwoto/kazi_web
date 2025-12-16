export default function ClientLogos() {
  const clients = [
    { name: "TechCorp", logo: "/client-1.svg" },
    { name: "InnovateLab", logo: "/client-2.svg" },
    { name: "Digital Solutions", logo: "/client-3.svg" },
    { name: "Creative Agency", logo: "/client-4.svg" },
    { name: "StartupHub", logo: "/client-5.svg" },
    { name: "Enterprise Co", logo: "/client-6.svg" },
  ];

  return (
    <div className="flex flex-wrap justify-center gap-8 md:gap-16">
      {clients.map((client) => (
        <div
          key={client.name}
          className="h-8 w-24 bg-gray-400/20 dark:bg-gray-600/50 rounded flex items-center justify-center opacity-60 hover:opacity-100 transition-opacity"
        >
          <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">
            {client.name}
          </span>
        </div>
      ))}
    </div>
  );
}
