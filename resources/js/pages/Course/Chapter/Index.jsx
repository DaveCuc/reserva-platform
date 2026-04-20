import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { File } from 'lucide-react';
import CourseLayout from '@/Layouts/CourseLayout';
import { VideoPlayer } from './Components/VideoPlayer';
import { CourseEnrollButton } from './Components/CourseEnrollButton';
import { CourseProgressButton } from './Components/CourseProgressButton';
import { Banner } from '@/Components/banner';

export default function ChapterIndex({ 
  course, 
  chapter, 
  attachments, 
  nextChapter, 
  userProgress, 
  purchase, 
  progressCount 
}) {
  const isCompleted = !!userProgress?.is_completed;
  const isChapterLocked = !chapter.is_free && !purchase;
  // Solo se marca como autocompletado si NO estaba completado antes.
  const completeOnEnd = !isCompleted;

  return (
    <CourseLayout course={course} progressCount={progressCount} purchase={purchase}>
      <Head title={`${chapter.title} - ${course.title}`} />
      
      {userProgress?.is_completed && (
        <Banner variant="success" label="Ya completaste este capítulo." />
      )}
      {isChapterLocked && (
        <Banner variant="warning" label="Necesitas comprar este curso para ver este capítulo." />
      )}

      <div className="flex flex-col max-w-4xl mx-auto pb-20">
        <div className="p-4">
          <VideoPlayer
            chapterId={chapter.id}
            title={chapter.title}
            courseId={course.id}
            nextChapterId={nextChapter?.id}
            isLocked={isChapterLocked}
            completeOnEnd={completeOnEnd}
            videoUrl={chapter.video_url}
          />
        </div>
        
        <div className="p-4 flex flex-col md:flex-row items-center justify-between border-b">
          <h2 className="text-2xl font-semibold mb-2 md:mb-0">
            {chapter.title}
          </h2>
          {purchase ? (
            <CourseProgressButton
              chapterId={chapter.id}
              courseId={course.id}
              nextChapterId={nextChapter?.id}
              isCompleted={isCompleted}
            />
          ) : (
            <CourseEnrollButton
              courseId={course.id}
              price={course.price}
            />
          )}
        </div>
        
        <div className="p-4">
          {/* El Rich Text Editor suele guardar HTML nativo o estructuras Tiptap (quilljs) */}
          <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: chapter.description }} />
        </div>
        
        {!!attachments?.length && (
          <div className="p-4 border-t">
            <h3 className="font-semibold text-lg mb-2 text-brand-text">Archivos Adjuntos</h3>
            <div className="space-y-2">
              {attachments.map((attachment) => (
                <a 
                  href={attachment.url?.startsWith('http') ? attachment.url : `/storage/${attachment.url}`}
                  target="_blank"
                  key={attachment.id}
                  className="flex items-center p-3 w-full bg-brand-pale border border-brand-soft text-brand-text font-semibold rounded-md hover:opacity-75 transition"
                >
                  <File className="h-4 w-4 mr-3" />
                  <p className="line-clamp-1">
                    {attachment.name}
                  </p>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </CourseLayout>
  );
}
