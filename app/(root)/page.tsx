// import { Header, Hero } from "@/components";
import Image from "next/image";

import Header from "../../components/Header"; // adjust relative path
import Hero from "../../components/Hero";
import Features from "../../components/Features";


export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <Features />
    </>
  );
}
