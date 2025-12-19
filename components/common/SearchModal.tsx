"use client";

import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Search, Loader2, ArrowRight, FileText, Tag, Briefcase } from "lucide-react";
import { searchData, SearchableItem } from "@/lib/search-data";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/context/LanguageContext";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const { t } = useLanguage();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchableItem[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setQuery("");
      setResults([]);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleSearch = async () => {
      if (!query.trim()) {
        setResults([]);
        return;
      }

      setIsSearching(true);
      
      // Simulate network delay for better UX feel
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const filtered = searchData.filter(item => {
        const titleMatch = item.title.toLowerCase().includes(query.toLowerCase());
        const descMatch = item.description.toLowerCase().includes(query.toLowerCase());
        const tagMatch = item.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()));
        
        return titleMatch || descMatch || tagMatch;
      });

      setResults(filtered);
      setIsSearching(false);
    };

    const debounce = setTimeout(handleSearch, 300);
    return () => clearTimeout(debounce);
  }, [query]);

  const getIcon = (type: SearchableItem['type']) => {
    switch (type) {
      case 'service': return <Briefcase className="w-4 h-4" />;
      case 'blog': return <FileText className="w-4 h-4" />;
      default: return <ArrowRight className="w-4 h-4" />;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] p-0 gap-0 overflow-hidden bg-white">
        <div className="p-4 border-b border-gray-100 flex items-center gap-3">
          <Search className="w-5 h-5 text-gray-400" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t.search.placeholder}
            className="border-none shadow-none focus-visible:ring-0 text-lg placeholder:text-gray-400 h-auto p-0"
            autoFocus
          />
          {isSearching && <Loader2 className="w-4 h-4 animate-spin text-blue-600" />}
        </div>

        <div className="max-h-[60vh] overflow-y-auto p-2">
          {results.length > 0 ? (
            <div className="space-y-1">
              {results.map((result) => (
                <Link
                  key={result.id}
                  href={result.url}
                  onClick={onClose}
                  className="flex items-start gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                >
                  <div className="mt-1 p-2 bg-blue-50 text-blue-600 rounded-md group-hover:bg-blue-100 transition-colors">
                    {getIcon(result.type)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                        {result.title}
                      </h4>
                      <Badge variant="secondary" className="text-xs capitalize font-normal">
                        {result.type}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-500 line-clamp-2 mb-2">
                      {result.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {result.tags.map(tag => (
                        <span key={tag} className="text-[10px] text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full flex items-center gap-1">
                          <Tag className="w-3 h-3" /> {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : query ? (
            <div className="p-8 text-center text-gray-500">
              <p>{t.search.noResults}</p>
            </div>
          ) : (
            <div className="p-4">
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                {t.search.quickLinks}
              </h3>
              <div className="grid grid-cols-2 gap-2">
                <Link href="/services" onClick={onClose} className="p-2 text-sm text-gray-600 hover:bg-gray-50 rounded-md">
                  All Services
                </Link>
                <Link href="/pricing" onClick={onClose} className="p-2 text-sm text-gray-600 hover:bg-gray-50 rounded-md">
                  Pricing
                </Link>
                <Link href="/contact" onClick={onClose} className="p-2 text-sm text-gray-600 hover:bg-gray-50 rounded-md">
                  Contact Us
                </Link>
                <Link href="/faq" onClick={onClose} className="p-2 text-sm text-gray-600 hover:bg-gray-50 rounded-md">
                  FAQ
                </Link>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}