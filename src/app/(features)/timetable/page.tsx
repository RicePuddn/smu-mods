"use client";

import { ModuleTreeComponent } from "@/components/ModuleTree";
import PrerequisiteStatusList from "@/components/PreRequisiteList";
import { useModuleStore } from "@/stores/StoreProviders";
import type { Module } from "@/types/primitives/module";
import { useEffect, useState } from "react";

export default function TimeTablePage() {
  const { getModule } = useModuleStore((state) => state);

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
          <>
            <ModuleTreeComponent
              moduleCode={module.moduleCode}
              prereqTree={module.preReq}
            />
            <PrerequisiteStatusList
              preReqTree={module.preReq}
              completedModules={["IS113"]}
            />
          </>
        ) : (
          <p>Module not found</p>
        )
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
