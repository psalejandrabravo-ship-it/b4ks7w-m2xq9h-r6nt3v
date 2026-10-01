import { createFileRoute } from "@tanstack/react-router";
import { CaminoApp } from "@/components/camino/app";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return <CaminoApp />;
}
