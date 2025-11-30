import {
  Hero,
  FeaturedWork,
  GitHubActivity,
  Testimonials,
} from "@/components/sections";

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedWork />
      <GitHubActivity />
      <Testimonials />
    </>
  );
}
