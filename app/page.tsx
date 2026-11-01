import AnnouncementBar from "@/components/AnnouncementBar";
import Hero from "@/components/Hero";
import Blueprint from "@/components/Blueprint";
import StackConfigurator from "@/components/StackConfigurator";
import FlavorMenu from "@/components/FlavorMenu";
import SignUpFooter from "@/components/SignUpFooter";
import { StackConfigProvider } from "@/components/StackConfigProvider";

export default function Home() {
  return (
    <StackConfigProvider>
      <main>
        <AnnouncementBar />
        <Hero />
        <Blueprint />
        <FlavorMenu />
        <StackConfigurator />
        <SignUpFooter />
      </main>
    </StackConfigProvider>
  );
}
