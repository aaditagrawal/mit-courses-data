"use client"

import { Button } from '@/components/ui/button';
import { Share2, Search } from 'lucide-react';

export function ShareButton() {
    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: document.title,
                    url: window.location.href,
                });
            } catch (err) {
                // User cancelled or share failed
                console.log('Share cancelled');
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
            className="h-8 w-8 text-muted-foreground hover:text-foreground"
            onClick={handleShare}
        >
            <Share2 className="w-4 h-4" />
        </Button>
    );
}

export function SearchReferenceButton({ reference }: { reference: string }) {
    const handleSearch = () => {
        window.open(`https://www.google.com/search?q=${encodeURIComponent(reference)}`, '_blank');
    };

    return (
        <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 text-muted-foreground hover:text-foreground ml-2"
            onClick={handleSearch}
        >
            <Search className="w-4 h-4" />
        </Button>
    );
}
