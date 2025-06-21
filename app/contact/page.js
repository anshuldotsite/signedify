const contacts = [
  {
    title: 'Say Hello',
    email: 'signedifyinc@gmail.com',
    phone: '+1 (437) 268-4015',
  },
  {
    title: 'Socials',
    instagram: 'Signedify Inc',
    x: '@signedifyinc',
  },
  {
    title: 'Location',
    address: '106 Seagram Drive, Waterloo, ON N2L 3G5, Canada',
  },
  {
    title: 'Team',
    name: 'Anshul, Evan, Jason, Richard',
  },
];

export default function Contact() {
  return (
    <main
      id="contact"
      className="flex min-h-screen flex-col bg-white lg:flex-row"
    >
      <div className="flex flex-col justify-center p-8 lg:w-1/2 lg:px-16">
        <h1 className="text-4xl font-bold tracking-tight text-black sm:text-5xl">
          Get in touch
        </h1>
        <p className="mt-6 text-xl font-semibold leading-8 text-blue-500">
          We're happy to connect—reach out through any of the methods below!
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 p-8 sm:grid-cols-2 lg:w-1/2 lg:place-content-center">
        {contacts.map((contact) => {
          const { title, ...fields } = contact;
          return (
            <div
              key={title}
              className="rounded-2xl bg-slate-50 p-8 shadow-sm"
            >
              <h2 className="text-lg font-semibold leading-7 text-black">
                {title}
              </h2>

              <div className="mt-3 space-y-1">
                {Object.entries(fields).map(([key, value]) =>
                  key === 'email' ? (
                    <a
                      key={key}
                      href={`mailto:${value}`}
                      className="block text-sm leading-6 font-semibold text-blue-500"
                    >
                      {value}
                    </a>
                  ) : key.toLowerCase() === 'address' ? ( // Use .toLowerCase() for robustness
                    <a
                      key={key}
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(value)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-sm leading-6 font-semibold text-blue-500"
                    >
                      {value}
                    </a>
                  ) : (
                    <p
                      key={key}
                      className="text-sm leading-6 font-semibold text-blue-500"
                    >
                      {key.charAt(0).toUpperCase() + key.slice(1)}: {value}
                    </p>
                  )
                )}
              </div>

            </div>
          );
        })}
      </div>
    </main>
  );
}
