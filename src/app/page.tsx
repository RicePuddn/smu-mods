import { ModuleTreeComponent } from "@/components/ModuleTree";
import { modules } from "@/data/modules";

export default function Home() {
  return (
    <div>
      <ModuleTreeComponent
        moduleCode={"CS2309"}
        prereqTree={modules["CS2309"]!.preReq}
      />
    </div>
  );
}
