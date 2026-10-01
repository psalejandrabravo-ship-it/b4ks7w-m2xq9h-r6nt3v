import { CaminoSwitch } from "@/components/camino/screens";
import { SessionProvider } from "@/components/camino/session";

export function CaminoApp() {
  return (
    <SessionProvider>
      <CaminoSwitch />
    </SessionProvider>
  );
}
