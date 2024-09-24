"use client";

import { ModuleTreeComponent } from "@/components/ModuleTree";
import { useModuleBankStore } from "@/stores/moduleBank/provider";
import type { Module } from "@/types/primitives/module";
import { useEffect, useState } from "react";

export default function Home() {
  const { getModule } = useModuleBankStore((state) => state);

  const [module, setModule] = useState<Module>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getModule("IS216")
      .catch((e) => console.log(e))
      .then((mod) => {
        if (!mod) return;
        setModule(mod);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      {!loading ? (
        !!module ? (
          <ModuleTreeComponent
            moduleCode={module.moduleCode}
            prereqTree={module.preReq}
          />
        ) : (
          <p>Module not found</p>
        )
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
