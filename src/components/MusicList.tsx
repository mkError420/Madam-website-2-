import { motion, AnimatePresence } from "motion/react";
import { Play, Pause, Download, Share2, Heart, Clock, MoreHorizontal, ListMusic, X, GripVertical, Trash2, Music } from "lucide-react";
import { useState, useEffect } from "react";
import { db, collection, getDocs, query, orderBy, onSnapshot, OperationType, handleFirestoreError } from "../lib/firebase";
import { useMusic } from "../context/MusicContext";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface Track {
  id: string;
  title: string;
  album: string;
  duration: string;
  year: string;
  cover: string;
}

const fallbackTracks: Track[] = [
  { id: "1", title: "Echoes in the Dark", album: "Midnight Serenade", duration: "3:45", year: "2024", cover: "https://picsum.photos/seed/music1/400/400" },
  { id: "2", title: "Midnight Serenade", album: "Midnight Serenade", duration: "4:12", year: "2024", cover: "https://picsum.photos/seed/music2/400/400" },
  { id: "3", title: "Velvet Skies", album: "Midnight Serenade", duration: "3:28", year: "2024", cover: "https://picsum.photos/seed/music3/400/400" },
  { id: "4", title: "Neon Heartbeat", album: "Midnight Serenade", duration: "3:56", year: "2024", cover: "https://picsum.photos/seed/music4/400/400" },
  { id: "5", title: "Shadow Waltz", album: "Midnight Serenade", duration: "4:05", year: "2024", cover: "https://picsum.photos/seed/music5/400/400" },
];

interface SortableQueueItemProps {
  track: Track;
  onRemove: (id: string) => void;
  key?: string | number;
}

function SortableQueueItem({ track, onRemove }: SortableQueueItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: track.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : 'auto',
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`flex items-center gap-4 p-3 rounded-xl border border-white/5 bg-zinc-900/50 group ${isDragging ? 'opacity-50' : ''}`}
    >
      <button {...attributes} {...listeners} className="cursor-grab active:cursor-grabbing text-zinc-600 hover:text-zinc-400">
        <GripVertical className="w-4 h-4" />
      </button>
      <img src={track.cover} alt={track.title} className="w-10 h-10 rounded-lg object-cover" />
      <div className="flex-1 min-w-0">
        <div className="text-sm font-medium text-zinc-200 truncate">{track.title}</div>
        <div className="text-[10px] text-zinc-500 truncate">{track.album}</div>
      </div>
      <button 
        onClick={() => onRemove(track.id)}
        className="p-2 text-zinc-600 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  );
}

export default function MusicList() {
  const { playTrack, currentTrack, isPlaying } = useMusic();
  const [hoveredTrack, setHoveredTrack] = useState<string | null>(null);
  const [queue, setQueue] = useState<Track[]>([]);
  const [isQueueOpen, setIsQueueOpen] = useState(false);
  const [tracks, setTracks] = useState<Track[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'tracks'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedTracks = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Track[];
      
      setTracks(fetchedTracks.length > 0 ? fetchedTracks : fallbackTracks);
      setLoading(false);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'tracks');
      setTracks(fallbackTracks);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const addToQueue = (track: Track) => {
    if (!queue.find(t => t.id === track.id)) {
      setQueue([...queue, track]);
      setIsQueueOpen(true);
    }
  };

  const removeFromQueue = (id: string) => {
    setQueue(queue.filter(t => t.id !== id));
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setQueue((items) => {
        const oldIndex = items.findIndex((t) => t.id === active.id);
        const newIndex = items.findIndex((t) => t.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  return (
    <section className="py-24 bg-zinc-950 relative">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-4xl font-serif">Full <span className="italic text-gold-200">Discography</span></h2>
          <div className="flex items-center gap-6">
            <div className="hidden md:flex gap-4">
              <button className="px-4 py-2 rounded-full border border-white/10 text-xs font-mono uppercase tracking-widest hover:bg-white/5 transition-all">All</button>
              <button className="px-4 py-2 rounded-full border border-white/10 text-xs font-mono uppercase tracking-widest hover:bg-white/5 transition-all">Albums</button>
              <button className="px-4 py-2 rounded-full border border-white/10 text-xs font-mono uppercase tracking-widest hover:bg-white/5 transition-all">Singles</button>
            </div>
            <button 
              onClick={() => setIsQueueOpen(!isQueueOpen)}
              className="relative p-3 rounded-full bg-gold-500/10 border border-gold-500/20 text-gold-400 hover:bg-gold-500/20 transition-all"
            >
              <ListMusic className="w-5 h-5" />
              {queue.length > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-gold-500 text-gold-950 text-[10px] font-bold rounded-full flex items-center justify-center">
                  {queue.length}
                </span>
              )}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-12 items-start">
          <div className="glass-panel rounded-3xl overflow-hidden border border-white/5">
            {/* Table Header */}
            <div className="hidden md:grid grid-cols-[auto_1fr_1fr_1fr_auto] gap-8 px-8 py-4 border-b border-white/5 text-[10px] font-mono text-zinc-500 uppercase tracking-[0.2em]">
              <div className="w-8">#</div>
              <div>Title</div>
              <div>Album</div>
              <div>Release</div>
              <div className="flex justify-end pr-4"><Clock className="w-3 h-3" /></div>
            </div>

            {/* Track List */}
            <div className="divide-y divide-white/5">
              {loading ? (
                <div className="p-12 text-center text-zinc-500 font-mono text-xs uppercase tracking-widest">Loading tracks...</div>
              ) : tracks.map((track, index) => (
                <motion.div
                  key={track.id}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  viewport={{ once: true }}
                  onMouseEnter={() => setHoveredTrack(track.id)}
                  onMouseLeave={() => setHoveredTrack(null)}
                  className="grid grid-cols-[auto_1fr_auto] md:grid-cols-[auto_1fr_1fr_1fr_auto] gap-4 md:gap-8 px-6 md:px-8 py-4 items-center hover:bg-white/[0.02] transition-colors group cursor-pointer"
                >
                  {/* ID / Play Icon */}
                  <div className="w-8 flex justify-center">
                    {hoveredTrack === track.id || (currentTrack?.id === track.id && isPlaying) ? (
                      <button onClick={(e) => {
                        e.stopPropagation();
                        playTrack(track);
                      }}>
                        {currentTrack?.id === track.id && isPlaying ? (
                          <Pause className="w-4 h-4 text-gold-400 fill-current" />
                        ) : (
                          <Play className="w-4 h-4 text-gold-400 fill-current" />
                        )}
                      </button>
                    ) : (
                      <span className={`text-xs font-mono ${currentTrack?.id === track.id ? 'text-gold-400' : 'text-zinc-600'}`}>
                        0{index + 1}
                      </span>
                    )}
                  </div>

                  {/* Title & Cover */}
                  <div className="flex items-center gap-4 min-w-0">
                    <img 
                      src={track.cover} 
                      alt={track.title} 
                      className="w-10 h-10 md:w-12 md:h-12 rounded-lg object-cover flex-shrink-0"
                      referrerPolicy="no-referrer"
                    />
                    <div className="min-w-0">
                      <div className="text-sm md:text-base font-medium text-zinc-200 truncate group-hover:text-gold-200 transition-colors">{track.title}</div>
                      <div className="text-xs text-zinc-500 md:hidden">{track.album}</div>
                    </div>
                  </div>

                  {/* Album (Desktop) */}
                  <div className="hidden md:block text-sm text-zinc-500 truncate">
                    {track.album}
                  </div>

                  {/* Year (Desktop) */}
                  <div className="hidden md:block text-sm text-zinc-500 font-mono">
                    {track.year}
                  </div>

                  {/* Duration & Actions */}
                  <div className="flex items-center gap-4 md:gap-8 justify-end">
                    <div className="hidden sm:flex items-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={() => addToQueue(track)}
                        className="text-zinc-500 hover:text-gold-400 transition-colors"
                        title="Add to Queue"
                      >
                        <ListMusic className="w-4 h-4" />
                      </button>
                      <button className="text-zinc-500 hover:text-gold-400 transition-colors"><Heart className="w-4 h-4" /></button>
                      <button className="text-zinc-500 hover:text-gold-400 transition-colors"><Download className="w-4 h-4" /></button>
                    </div>
                    <span className="text-xs font-mono text-zinc-500 w-10 text-right">{track.duration}</span>
                    <button className="text-zinc-600 hover:text-white transition-colors"><MoreHorizontal className="w-4 h-4" /></button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Queue Sidebar */}
          <AnimatePresence>
            {isQueueOpen && (
              <motion.div
                initial={{ opacity: 0, x: 20, width: 0 }}
                animate={{ opacity: 1, x: 0, width: 320 }}
                exit={{ opacity: 0, x: 20, width: 0 }}
                className="glass-panel rounded-3xl border border-white/5 overflow-hidden flex flex-col h-[600px] sticky top-24"
              >
                <div className="p-6 border-b border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <ListMusic className="w-5 h-5 text-gold-400" />
                    <h3 className="font-serif text-xl">Queue</h3>
                  </div>
                  <button 
                    onClick={() => setIsQueueOpen(false)}
                    className="p-2 text-zinc-500 hover:text-white transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
                  {queue.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-center p-8">
                      <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4">
                        <Music className="w-8 h-8 text-zinc-600" />
                      </div>
                      <p className="text-zinc-500 text-sm">Your queue is empty. Add some tracks to get started.</p>
                    </div>
                  ) : (
                    <DndContext
                      sensors={sensors}
                      collisionDetection={closestCenter}
                      onDragEnd={handleDragEnd}
                    >
                      <SortableContext
                        items={queue.map(t => t.id)}
                        strategy={verticalListSortingStrategy}
                      >
                        <div className="space-y-3">
                          {queue.map((track) => (
                            <SortableQueueItem 
                              key={track.id} 
                              track={track} 
                              onRemove={removeFromQueue}
                            />
                          ))}
                        </div>
                      </SortableContext>
                    </DndContext>
                  )}
                </div>

                {queue.length > 0 && (
                  <div className="p-6 border-t border-white/5">
                    <button 
                      onClick={() => setQueue([])}
                      className="w-full py-3 text-xs font-mono uppercase tracking-widest text-zinc-500 hover:text-red-400 transition-colors"
                    >
                      Clear Queue
                    </button>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Load More */}
        <div className="mt-12 text-center">
          <button className="px-10 py-4 border border-white/10 rounded-full text-sm font-mono uppercase tracking-widest hover:bg-white/5 transition-all text-zinc-400 hover:text-white">
            Load More Tracks
          </button>
        </div>
      </div>
    </section>
  );
}
