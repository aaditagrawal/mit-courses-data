"use client";

import { styles } from "@/styles/site.stylex";
import { styleClass } from "@/styles/classes";

import { Button } from "@/components/ui/button";
import { Share2, Search } from "lucide-react";

export function ShareButton() {
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: document.title,
          url: window.location.href,
        });
      } catch {
        // User cancelled or share failed
        console.log("Share cancelled");
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      // Could add a toast notification here
    }
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      xstyle={styles.componentsCourseActionsStyle1}
      className="sx-componentsCourseActionsStyle1 ui-text-defined"
      onClick={handleShare}
    >
      <Share2 className={styleClass("appNotFoundStyle11")} />
    </Button>
  );
}

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
