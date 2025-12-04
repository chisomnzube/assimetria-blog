import Link from 'next/link';
import { formatDate, getReadingTime } from '@/lib/utils';

export default function ArticleCard({ article }) {
  return (
    <Link href={`/article/${article.id}`} className="group">
      <article className="relative bg-white/70 backdrop-blur border border-slate-200 rounded-2xl p-6 hover:shadow-xl hover:shadow-blue-100 hover:-translate-y-1 transition-all duration-300 cursor-pointer overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 rounded-full blur-2xl -z-10 group-hover:scale-150 transition-transform duration-500"></div>
        
        <div className="flex items-start gap-3 mb-3">
          <div className="w-1 h-16 bg-gradient-to-b from-blue-600 to-indigo-600 rounded-full"></div>
          <div className="flex-1">
            <h2 className="text-xl font-bold text-slate-900 leading-snug group-hover:text-blue-600 transition-colors mb-2">
              {article.title}
            </h2>
          </div>
        </div>
        
        <p className="text-slate-600 text-sm leading-relaxed mb-4 line-clamp-2">
          {article.excerpt}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <div className="flex items-center gap-1.5">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span className="font-medium">{article.author}</span>
            </div>
            <span className="text-slate-300">•</span>
            <time dateTime={article.created_at}>{formatDate(article.created_at)}</time>
            <span className="text-slate-300">•</span>
            <span>{getReadingTime(article.content)}</span>
          </div>
          <svg className="w-5 h-5 text-blue-600 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </div>
      </article>
    </Link>
  );
}
