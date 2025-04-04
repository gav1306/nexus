import { BackgroundBeams } from "@/components/ui/background-beams";

export default function Layout({ children }) {
  return (
    <>
      <section className="relative z-50">{children}</section>
      <BackgroundBeams />
    </>
  );
}
