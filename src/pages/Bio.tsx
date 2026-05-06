import BioCanvas from "@/components/bio/BioCanvas";

export default function Bio() {
  return (
    <>
      <title>The Hood Oracle — Brand Bio | Akashic Lenses</title>
      <meta name="description" content="A 3D scroll-driven brand bio for THE HOOD ORACLE — six lenses, one agentic guide, transmitted from the N3UR0 district of Agentropolis." />
      <link rel="canonical" href="https://hoodoracle.lovable.app/bio" />
      <main className="relative w-full h-screen overflow-hidden bg-background">
        <h1 className="sr-only">The Hood Oracle — Akashic Lenses brand bio</h1>
        <BioCanvas />
      </main>
    </>
  );
}
