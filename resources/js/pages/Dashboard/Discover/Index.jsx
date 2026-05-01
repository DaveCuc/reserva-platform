import React from "react";
import { Head } from "@inertiajs/react";
import MainLayout from "@/Layouts/MainLayout";
import { SearchInput } from "./Components/SearchInput";
import { Categories } from "./Components/Categories";
import { ArticlesList } from "./Components/ArticlesList";

export default function DiscoverIndex({ categories, articles }) {
  return (
    <MainLayout>
      <Head title="Descubrir Artículos" />
      
      {/* Search Input móvil */}
      <div className="px-6 pt-6 md:hidden md:mb-0 block">
        <SearchInput />
      </div>
      
      <div className="p-6 space-y-6">
        <div className="bg-white p-4 rounded-xl shadow-sm border border-brand-soft">
           <Categories items={categories} />
        </div>
        
        <ArticlesList items={articles} />
      </div>
    </MainLayout>
  );
}
