import React from "react";
import { Head } from "@inertiajs/react";
import HomeLayout from "@/Layouts/HomeLayout";
import { Preview } from "@/Components/Preview";
import { ArticleCover } from "./Components/ArticleCover";
import { RecentArticlesSidebar } from "./Components/RecentArticlesSidebar";

export default function ArticleView({ article, recentArticles }) {
    return (
        <HomeLayout>
            <Head title={article.title} />
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col lg:flex-row gap-10">
                
                {/* Contenedor 1: Artículo */}
                <div className="lg:w-2/3 space-y-8">
                    
                    <ArticleCover 
                        imageUrl={article.image_url} 
                        title={article.title}
                        categoryName={article.category?.name}
                        publishedAt={article.published_at}
                        userName={article.user?.name}
                    />
                    
                    {/* Contenido */}
                    <div className="prose prose-brand max-w-none pb-10 border-b border-brand-soft">
                        <Preview value={article.content} />
                    </div>
                </div>

                {/* Contenedor 2: Otros Artículos (NewsSection style) */}
                <RecentArticlesSidebar articles={recentArticles} />

            </div>
        </HomeLayout>
    );
}