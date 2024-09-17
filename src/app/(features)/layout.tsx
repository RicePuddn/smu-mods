import Layout from "@/components/layout";

export default function FeatureLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Layout>{children}</Layout>;
}
