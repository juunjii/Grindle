import { HeaderProduct, Features, Help, Footer } from "@/components/index";
import { Hero } from "./Hero";

export default function Home() {
  return (
    <>
      <HeaderProduct />
      <Hero />
      <Features />
      <Help />
      <Footer />
    </>
  );
}
