import type { Metadata } from "next";
import { StackConfigProvider } from "@/components/StackConfigProvider";
import StoreOrder from "@/components/store/StoreOrder";
import StoreSections from "@/components/store/StoreSections";
import StoreStickyBar from "@/components/store/StoreStickyBar";
import { SERVES_PER_PACK } from "@/lib/order";

export const metadata: Metadata = {
  title: "Black Forest Powerhouse · Athlete | Smoothie Operator",
  description: `Easy nutrition, café flavour. Black Forest Powerhouse on the Athlete stack, in packs of ${SERVES_PER_PACK} serves. Each serve is a frozen pouch and a powder pouch.`,
};

export default function StorePage() {
  return (
    <StackConfigProvider>
      <StoreSections>
        <StoreOrder />
      </StoreSections>
      <StoreStickyBar />
    </StackConfigProvider>
  );
}
