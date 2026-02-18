import { Hero } from "@/components/hero";
import { SkillsBento } from "@/components/skills-bento";
import { ProjectDeck } from "@/components/project-deck";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <main className="bg-[#f5f5f7] dark:bg-[#050505] min-h-screen">
      <Hero />
      <SkillsBento />
      <ProjectDeck />
      <Footer />
    </main>
  );
}
