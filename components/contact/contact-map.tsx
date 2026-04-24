export function ContactMap() {
  return (
    <section className="relative h-full min-h-[560px] overflow-hidden rounded-3xl bg-white shadow-soft">
      <iframe
        title="KidNest location map"
        src="https://www.google.com/maps?q=245%20Blooming%20Kids%20Ave%2C%20New%20York%2C%20NY%2010012&z=14&output=embed"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="h-full min-h-[560px] w-full [filter:grayscale(100%)]"
      />
    </section>
  );
}
