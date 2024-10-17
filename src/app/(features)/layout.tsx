import Layout from "@/components/layout";
import { Toaster } from "@/components/ui/sonner";

export default function FeatureLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Layout>
      <Toaster richColors theme="light" closeButton />
      {children}
    </Layout>
  );
}
