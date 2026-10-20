import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Search,
  BookOpen,
  Sparkles,
  ArrowRight,
  Clock,
  CheckCircle2,
  Download,
  ChevronLeft,
  X,
  Tag,
} from 'lucide-react';
import { MOCK_ARTICLES } from '@/data/mockData';
import type { EducationArticle } from '@/types';

export const Education: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const articleParam = searchParams.get('article');

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const activeArticle = articleParam
    ? MOCK_ARTICLES.find((a) => a.id === articleParam) || null
    : null;

  const categories = [
    { id: 'all', label: 'All Knowledge Guides' },
    { id: 'rooftop', label: 'Rooftop Agriculture' },
    { id: 'birds', label: 'Sparrow & Bird Care' },
    { id: 'seasonal', label: 'Kharif, Rabi & Zaid Cycles' },
    { id: 'compost', label: 'Soil & Composting' },
  ];

  const filteredArticles = MOCK_ARTICLES.filter((art) => {
    const matchesSearch =
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory =
      selectedCategory === 'all' || art.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleSelectArticle = (art: EducationArticle) => {
    setSearchParams({ article: art.id });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToList = () => {
    setSearchParams({});
  };

  const handleSimulateDownload = () => {
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 4000);
  };

  return (
    <div className="space-y-16 py-12 sm:py-16">
      {activeArticle ? (
        /* ARTICLE DETAIL READER VIEW */
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {/* Back button */}
          <button
            onClick={handleBackToList}
            className="inline-flex items-center gap-2 text-xs font-semibold text-golden-yellow hover:underline"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Back to All Learning Guides</span>
          </button>

          {/* Article Header */}
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              <span className="badge-emerald">{activeArticle.categoryLabel}</span>
              <span className="text-xs text-ivory-muted flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {activeArticle.readTime}
              </span>
              <span className="text-xs text-ivory-muted">• {activeArticle.date}</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl font-bold text-ivory leading-tight">
              {activeArticle.title}
            </h1>

            <p className="text-base text-ivory-dark leading-relaxed">
              {activeArticle.summary}
            </p>

            {/* Author Profile */}
            <div className="flex items-center justify-between pt-4 pb-2 border-y border-emerald/20 text-xs">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-golden-yellow/20 border border-golden-yellow/40 flex items-center justify-center font-bold text-golden-yellow">
                  {activeArticle.author.split(' ').map((n) => n[0]).join('')}
                </div>
                <div>
                  <h4 className="font-bold text-ivory">{activeArticle.author}</h4>
                  <p className="text-ivory-muted">{activeArticle.authorTitle}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleSimulateDownload}
                  className="btn-outline-gold text-xs py-2 px-3.5 flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Download PDF Guide</span>
                </button>
              </div>
            </div>

            {downloadSuccess && (
              <div className="p-3.5 rounded-xl bg-emerald/20 border border-emerald/40 text-leaf-light text-xs font-semibold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>Simulated PDF Guide generation complete: "HARIT-Guide-{activeArticle.slug}.pdf"</span>
              </div>
            )}
          </div>

          {/* Featured Cover Image */}
          <div className="aspect-[16/9] rounded-3xl overflow-hidden bg-forest-deeper border border-emerald/30 shadow-nature-lg">
            <img
              src={activeArticle.coverImage}
              alt={activeArticle.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Article Body Sections */}
          <div className="space-y-8 text-ivory-dark text-sm sm:text-base leading-relaxed">
            {activeArticle.sections.map((sec, idx) => (
              <section key={idx} className="space-y-3">
                <h3 className="font-serif text-2xl font-bold text-ivory">
                  {sec.heading}
                </h3>
                <p className="text-ivory-dark leading-relaxed">{sec.text}</p>
                {sec.bullets && (
                  <ul className="space-y-2 pt-2">
                    {sec.bullets.map((b, bIdx) => (
                      <li key={bIdx} className="flex items-start gap-2.5 text-xs sm:text-sm">
                        <CheckCircle2 className="w-4 h-4 text-leaf-light shrink-0 mt-0.5" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}

            {/* Pro Tips Box */}
            <div className="p-6 rounded-2xl bg-forest-dark border border-golden-yellow/40 space-y-3">
              <div className="flex items-center gap-2 text-golden-yellow font-bold text-sm">
                <Sparkles className="w-4 h-4" />
                <span>Eminent Agronomist Field Tips</span>
              </div>
              <div className="space-y-2">
                {activeArticle.proTips.map((tip, tIdx) => (
                  <div key={tIdx} className="flex items-start gap-2 text-xs sm:text-sm text-ivory-dark">
                    <span className="text-golden-yellow font-bold">•</span>
                    <span>{tip}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tags */}
            <div className="pt-4 flex flex-wrap items-center gap-2">
              <span className="text-xs text-ivory-muted font-mono flex items-center gap-1">
                <Tag className="w-3.5 h-3.5" /> Tags:
              </span>
              {activeArticle.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 rounded-lg bg-forest-deeper border border-emerald/30 text-xs text-leaf-light"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </article>
      ) : (
        /* ARTICLES DIRECTORY VIEW */
        <div className="space-y-16">
          {/* Header */}
          <section className="relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-forest-deeper/90 border border-golden-yellow/40 text-xs font-semibold text-golden-yellow shadow-gold">
                <BookOpen className="w-3.5 h-3.5 text-golden-yellow" />
                <span>HARIT GYAN — ECOLOGICAL AGRONOMY & BOTANICAL RESEARCH</span>
              </div>

              <h1 className="font-serif text-4xl sm:text-6xl font-black text-ivory tracking-tight max-w-4xl mx-auto leading-tight">
                Environmental & Balcony Learning Hub
              </h1>

              <p className="text-base sm:text-lg text-ivory-dark max-w-2xl mx-auto leading-relaxed">
                Peer-reviewed guides for rooftop agriculture, reviving Indian House Sparrows, zero-odor balcony composting, and understanding traditional Kharif/Rabi planting cycles.
              </p>
            </div>
          </section>

          {/* Search & Categories */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="p-4 sm:p-6 rounded-2xl bg-forest-dark border border-emerald/25 shadow-nature space-y-4">
              <div className="relative">
                <Search className="w-4 h-4 text-ivory-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search articles, soil mix recipes, sparrow hole dimensions, Kharif planting calendar..."
                  className="input-field text-xs pl-10 py-2.5"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-ivory-muted hover:text-ivory"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Category tabs */}
              <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-emerald/20">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      selectedCategory === cat.id
                        ? 'bg-golden-yellow text-forest-dark font-bold shadow-gold'
                        : 'bg-forest-deeper text-ivory-dark border border-emerald/20 hover:border-golden-yellow/40'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>
          </section>

          {/* Articles Grid */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredArticles.map((art) => (
                <div
                  key={art.id}
                  onClick={() => handleSelectArticle(art)}
                  className="card-3d flex flex-col justify-between group cursor-pointer overflow-hidden p-0"
                >
                  <div>
                    <div className="aspect-[16/9] w-full overflow-hidden bg-forest-deeper relative">
                      <img
                        src={art.coverImage}
                        alt={art.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-3 left-3">
                        <span className="badge-emerald text-[11px]">
                          {art.categoryLabel}
                        </span>
                      </div>
                      <div className="absolute bottom-3 right-3">
                        <span className="px-2 py-1 rounded bg-forest-deeper/80 text-ivory-muted text-[10px] font-mono">
                          {art.readTime}
                        </span>
                      </div>
                    </div>

                    <div className="p-6 space-y-3">
                      <div className="text-[11px] text-ivory-muted">
                        <span>By {art.author}</span> • <span>{art.date}</span>
                      </div>
                      <h3 className="font-serif font-bold text-xl text-ivory group-hover:text-golden-yellow transition-colors line-clamp-2">
                        {art.title}
                      </h3>
                      <p className="text-xs text-ivory-dark line-clamp-3 leading-relaxed">
                        {art.summary}
                      </p>
                    </div>
                  </div>

                  <div className="p-6 pt-0 mt-2 flex items-center justify-between border-t border-emerald/20 text-xs text-golden-yellow font-bold">
                    <span>Read Full Guide</span>
                    <div className="flex items-center gap-1 group-hover:translate-x-1.5 transition-transform">
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      )}
    </div>
  );
};
