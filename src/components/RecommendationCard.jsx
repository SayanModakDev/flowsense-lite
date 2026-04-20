import Card from './ui/Card';

export default function RecommendationCard({ recommendation }) {
  if (!recommendation) return null;

  return (
    <Card hover={false} className="p-6 mt-8 border-(--accent-border) bg-linear-to-br from-(--bg) to-(--accent-bg) shadow-2xl relative overflow-visible group">
      <div className="absolute -top-4 left-6 bg-(--accent) text-white text-[10px] font-black uppercase tracking-[0.2em] px-4 py-2 rounded-xl shadow-lg shadow-purple-500/20 translate-y-0 group-hover:-translate-y-1 transition-transform duration-300">
        AI Priority Pick
      </div>
      
      <div className="flex items-center justify-between mt-4 mb-6">
        <h2 className="text-2xl font-black text-(--text-h) leading-tight m-0 tracking-tight">
          {recommendation.recommendation}
        </h2>
        <div className="flex flex-col items-end">
          <span className="text-[10px] font-bold text-(--text) opacity-50 uppercase tracking-widest leading-none mb-1">Wait Time</span>
          <span className="text-sm font-black text-(--accent) bg-white dark:bg-slate-800 px-3 py-1 rounded-lg shadow-sm border border-(--border)">
            {recommendation.waitTime}
          </span>
        </div>
      </div>
      
      <div className="relative">
        <div className="absolute top-0 left-0 w-1 h-full bg-linear-to-b from-(--accent) to-transparent opacity-20 rounded-full" />
        <p className="text-sm text-(--text) leading-relaxed pl-5 font-medium italic opacity-90">
          "{recommendation.reason}"
        </p>
      </div>
    </Card>
  );
}
