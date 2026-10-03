"use client";

import { styles } from "@/styles/site.stylex";
import { styleClass } from "@/styles/classes";

import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

export function SearchReferenceButton({ reference }: { reference: string }) {
  const handleSearch = () => {
    window.open(`https://www.google.com/search?q=${encodeURIComponent(reference)}`, "_blank");
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      xstyle={styles.componentsCourseActionsStyle3}
      className="sx-componentsCourseActionsStyle3 ui-text-defined"
      onClick={handleSearch}
    >
      <Search className={styleClass("appNotFoundStyle11")} />
    </Button>
  );
}
