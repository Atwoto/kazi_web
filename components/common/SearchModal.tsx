"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Search, X } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { searchContent, SearchableItem } from "@/lib/search-data";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchableItem[]>([]);
  const router = useRouter();

  useEffect(() => {
    if (query.trim() === "") {
      setResults([]);
      return;
    }

    const searchResults = searchContent(query);
    setResults(searchResults.slice(0, 8)); // Limit to 8 results
  }, [query]);

  const handleResultClick = () => {
    setQuery("");
    setResults([]);
    onClose();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] flex flex-col p-0">
        <DialogHeader className="px-6 py-4 border-b">
          <div className="flex items-center gap-3">
            <Search className="w-5 h-5 text-gray-400" />
            <DialogTitle className="text-xl font-heading">Search</DialogTitle>
            <button
              onClick={onClose}
              className="ml-auto p-1 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </DialogHeader>

        <div className="p-6 border-b">
          <Input
            type="text"
            placeholder="Search for services, pages, or content..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            className="h-12 text-lg"
            autoFocus
          />
        </div>

        <div className="flex-1 overflow-y-auto">
          {query.trim() === "" ? (
            <div className="p-6 text-center text-gray-500">
              <Search className="w-12 h-12 mx-auto mb-3 opacity-30" />
              <p>Start typing to search...</p>
              <p className="text-sm mt-2">Search for services, pages, or any content</p>
            </div>
          ) : results.length === 0 ? (
            <div className="p-6 text-center text-gray-500">
              <p>No results found for "{query}"</p>
              <p className="text-sm mt-2">Try different keywords or browse our services</p>
            </div>
          ) : (
            <div className="p-4">
              <div className="space-y-2">
                {results.map((result) => (
                  <Link
                    key={result.id}
                    href={result.url}
                    onClick={handleResultClick}
                    className="block p-4 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-start gap-3">
                      <div className="mt-1">
                        {result.type === "service" && <div className="w-2 h-2 rounded-full bg-blue-500 mt-2" />}
                        {result.type === "page" && <div className="w-2 h-2 rounded-full bg-green-500 mt-2" />}
                        {result.type === "blog" && <div className="w-2 h-2 rounded-full bg-purple-500 mt-2" />}
                        {result.type === "portfolio" && <div className="w-2 h-2 rounded-full bg-orange-500 mt-2" />}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-gray-900">{result.title}</h3>
                          <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full capitalize">
                            {result.type}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1 line-clamp-2">{result.description}</p>
                        {result.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-2">
                            {result.tags.slice(0, 3).map((tag) => (
                              <span key={tag} className="text-xs text-gray-500">
                                #{tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        {results.length > 0 && (
          <div className="px-6 py-3 border-t bg-gray-50 text-sm text-gray-600">
            Press <kbd className="px-1.5 py-0.5 bg-white rounded border">ESC</kbd> to close
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
