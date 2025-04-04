import { ShootingStars } from "@/components/ui/shooting-stars";
import { StarsBackground } from "@/components/ui/stars-background";

export default function Layout({ children }) {
  return (
    <>
      <section className="relative z-50">{children}</section>
      <ShootingStars />
      <StarsBackground />
    </>
  );
}
