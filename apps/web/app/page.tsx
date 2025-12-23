import HeroClient from "@/components/home/HeroClient";

// Server Component - No data fetching needed for homepage
export default function HomePage() {
  return <HeroClient />;
}

// Use dynamic rendering due to animations and interactivity
export const dynamic = 'force-dynamic';
