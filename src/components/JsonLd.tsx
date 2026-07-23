export default function JsonLd() {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Petr Piskáček",
    "alternateName": "Peter Pix",
    "givenName": "Petr",
    "familyName": "Piskáček",
    "email": "ppix50@gmail.com",
    "url": "https://petrpiskacek.cz",
    "sameAs": [
      "https://petrpiskacek.online",
      "https://petrpiskacek.cloud",
      "https://github.com/Peter-Pix",
    ],
    "jobTitle": "AI Solutions Architect",
    "knowsAbout": [
      "Artificial Intelligence",
      "Machine Learning",
      "LLM",
      "Software Development",
      "Psychology",
      "Next.js",
      "React",
      "TypeScript",
    ],
    "description": "Stavím AI systémy, které reálně pracují. 20 let v IT, psychologie a generativní AI.",
    "image": "https://petrpiskacek.cz/og-image.png",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
    />
  );
}
