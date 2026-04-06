import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Trash2, Edit2, Save, X, Music, Video, ShoppingBag, LogIn, LogOut, ShieldCheck, AlertCircle } from 'lucide-react';
import { auth, db, googleProvider, signInWithPopup, signOut, onAuthStateChanged, collection, doc, getDoc, getDocs, setDoc, deleteDoc, query, orderBy, Timestamp, OperationType, handleFirestoreError, FirebaseUser } from '../lib/firebase';

interface Track {
  id: string;
  title: string;
  album: string;
  duration: string;
  year: string;
  cover: string;
  createdAt: Timestamp;
}

interface Video {
  id: string;
  title: string;
  thumbnail: string;
  duration: string;
  views: string;
  category: string;
  description?: string;
  createdAt: Timestamp;
}

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  isNew?: boolean;
  createdAt: Timestamp;
}

export default function AdminDashboard() {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'tracks' | 'videos' | 'products'>('tracks');
  
  const [tracks, setTracks] = useState<Track[]>([]);
  const [videos, setVideos] = useState<Video[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  const [isAdding, setIsAdding] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form states
  const [trackForm, setTrackForm] = useState({ title: '', album: '', duration: '', year: '', cover: '', audioUrl: '' });
  const [videoForm, setVideoForm] = useState({ title: '', thumbnail: '', duration: '', views: '', category: '', description: '' });
  const [productForm, setProductForm] = useState({ name: '', price: 0, image: '', category: '', isNew: false });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      if (user) {
        // Check if admin
        try {
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          const userData = userDoc.data();
          if (userData?.role === 'admin' || user.email === 'mk.rabbani.cse@gmail.com') {
            setIsAdmin(true);
            fetchData();
          } else {
            setIsAdmin(false);
            setError("You don't have admin privileges.");
          }
        } catch (err) {
          console.error("Error checking admin status:", err);
          // Fallback for the default admin
          if (user.email === 'mk.rabbani.cse@gmail.com') {
            setIsAdmin(true);
            fetchData();
          }
        }
      } else {
        setIsAdmin(false);
      }
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const fetchData = async () => {
    try {
      const tracksSnap = await getDocs(query(collection(db, 'tracks'), orderBy('createdAt', 'desc')));
      setTracks(tracksSnap.docs.map(d => ({ id: d.id, ...d.data() } as Track)));

      const videosSnap = await getDocs(query(collection(db, 'videos'), orderBy('createdAt', 'desc')));
      setVideos(videosSnap.docs.map(d => ({ id: d.id, ...d.data() } as Video)));

      const productsSnap = await getDocs(query(collection(db, 'products'), orderBy('createdAt', 'desc')));
      setProducts(productsSnap.docs.map(d => ({ id: d.id, ...d.data() } as Product)));
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      console.error("Login error:", err);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  const handleAddTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      const newTrack = { ...trackForm, createdAt: Timestamp.now() };
      const trackRef = doc(collection(db, 'tracks'));
      await setDoc(trackRef, newTrack);
      setTracks([{ id: trackRef.id, ...newTrack }, ...tracks]);
      setTrackForm({ title: '', album: '', duration: '', year: '', cover: '', audioUrl: '' });
      setIsAdding(false);
    } catch (err) {
      handleFirestoreError(err, OperationType.CREATE, 'tracks');
    }
  };

  const handleAddVideo = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      const newVideo = { ...videoForm, createdAt: Timestamp.now() };
      const videoRef = doc(collection(db, 'videos'));
      await setDoc(videoRef, newVideo);
      setVideos([{ id: videoRef.id, ...newVideo }, ...videos]);
      setVideoForm({ title: '', thumbnail: '', duration: '', views: '', category: '', description: '' });
      setIsAdding(false);
    } catch (err) {
      handleFirestoreError(err, OperationType.CREATE, 'videos');
    }
  };

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      const newProduct = { ...productForm, createdAt: Timestamp.now() };
      const productRef = doc(collection(db, 'products'));
      await setDoc(productRef, newProduct);
      setProducts([{ id: productRef.id, ...newProduct }, ...products]);
      setProductForm({ name: '', price: 0, image: '', category: '', isNew: false });
      setIsAdding(false);
    } catch (err) {
      handleFirestoreError(err, OperationType.CREATE, 'products');
    }
  };

  const handleDelete = async (id: string, collectionName: string) => {
    if (!confirm(`Are you sure you want to delete this ${collectionName.slice(0, -1)}?`)) return;
    try {
      await deleteDoc(doc(db, collectionName, id));
      if (collectionName === 'tracks') setTracks(tracks.filter(t => t.id !== id));
      if (collectionName === 'videos') setVideos(videos.filter(v => v.id !== id));
      if (collectionName === 'products') setProducts(products.filter(p => p.id !== id));
    } catch (err) {
      handleFirestoreError(err, OperationType.DELETE, collectionName);
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-zinc-950 text-gold-400">Loading...</div>;

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-950 p-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-panel p-12 rounded-[2.5rem] border border-white/5 text-center max-w-md w-full"
        >
          <div className="w-20 h-20 bg-gold-500/10 rounded-full flex items-center justify-center mx-auto mb-8">
            <ShieldCheck className="w-10 h-10 text-gold-400" />
          </div>
          <h1 className="text-3xl font-serif mb-4">Admin Access</h1>
          <p className="text-zinc-500 mb-10 font-light">Please sign in with your authorized Google account to manage content.</p>
          <button 
            onClick={handleLogin}
            className="w-full py-4 bg-gold-500 text-gold-950 font-bold rounded-2xl flex items-center justify-center gap-3 hover:bg-gold-400 transition-all"
          >
            <LogIn className="w-5 h-5" />
            Sign in with Google
          </button>
        </motion.div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-950 p-6">
        <div className="glass-panel p-12 rounded-[2.5rem] border border-white/5 text-center max-w-md w-full">
          <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-8">
            <AlertCircle className="w-10 h-10 text-red-400" />
          </div>
          <h1 className="text-3xl font-serif mb-4 text-red-400">Access Denied</h1>
          <p className="text-zinc-500 mb-10 font-light">{error || "You don't have permission to access the dashboard."}</p>
          <button 
            onClick={handleLogout}
            className="w-full py-4 bg-white/5 text-white font-bold rounded-2xl flex items-center justify-center gap-3 hover:bg-white/10 transition-all"
          >
            <LogOut className="w-5 h-5" />
            Sign Out
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 pt-32 pb-24">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div>
            <h1 className="text-5xl font-serif mb-2">Admin <span className="italic text-gold-200">Dashboard</span></h1>
            <p className="text-zinc-500 font-mono text-xs uppercase tracking-widest">Manage your music, videos, and merchandise</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <div className="text-sm font-medium text-zinc-200">{user.displayName}</div>
              <div className="text-[10px] font-mono text-gold-400 uppercase tracking-widest">Administrator</div>
            </div>
            <button 
              onClick={handleLogout}
              className="p-3 rounded-2xl bg-white/5 border border-white/10 text-zinc-400 hover:text-white transition-all"
              title="Sign Out"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-12 overflow-x-auto pb-4 custom-scrollbar">
          <button 
            onClick={() => setActiveTab('tracks')}
            className={`px-8 py-4 rounded-2xl font-mono text-xs uppercase tracking-widest transition-all flex items-center gap-3 whitespace-nowrap ${
              activeTab === 'tracks' ? 'bg-gold-500 text-gold-950 font-bold' : 'bg-white/5 text-zinc-400 hover:bg-white/10'
            }`}
          >
            <Music className="w-4 h-4" />
            Tracks
          </button>
          <button 
            onClick={() => setActiveTab('videos')}
            className={`px-8 py-4 rounded-2xl font-mono text-xs uppercase tracking-widest transition-all flex items-center gap-3 whitespace-nowrap ${
              activeTab === 'videos' ? 'bg-gold-500 text-gold-950 font-bold' : 'bg-white/5 text-zinc-400 hover:bg-white/10'
            }`}
          >
            <Video className="w-4 h-4" />
            Videos
          </button>
          <button 
            onClick={() => setActiveTab('products')}
            className={`px-8 py-4 rounded-2xl font-mono text-xs uppercase tracking-widest transition-all flex items-center gap-3 whitespace-nowrap ${
              activeTab === 'products' ? 'bg-gold-500 text-gold-950 font-bold' : 'bg-white/5 text-zinc-400 hover:bg-white/10'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            Merch
          </button>
        </div>

        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-serif capitalize">{activeTab} List</h2>
          <button 
            onClick={() => setIsAdding(true)}
            className="px-6 py-3 bg-gold-500/10 border border-gold-500/20 text-gold-400 rounded-2xl font-mono text-xs uppercase tracking-widest hover:bg-gold-500/20 transition-all flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add New {activeTab.slice(0, -1)}
          </button>
        </div>

        {/* Add Form Modal */}
        <AnimatePresence>
          {isAdding && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsAdding(false)}
                className="absolute inset-0 bg-zinc-950/80 backdrop-blur-sm"
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="relative glass-panel w-full max-w-2xl rounded-[2.5rem] border border-white/10 overflow-hidden"
              >
                <div className="p-8 border-b border-white/5 flex items-center justify-between">
                  <h3 className="text-2xl font-serif capitalize">Add New {activeTab.slice(0, -1)}</h3>
                  <button onClick={() => setIsAdding(false)} className="p-2 text-zinc-500 hover:text-white transition-colors">
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <form 
                  onSubmit={activeTab === 'tracks' ? handleAddTrack : activeTab === 'videos' ? handleAddVideo : handleAddProduct}
                  className="p-8 space-y-6"
                >
                  {activeTab === 'tracks' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Title</label>
                        <input required value={trackForm.title} onChange={e => setTrackForm({...trackForm, title: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-gold-500/50 outline-none transition-all" placeholder="Song Title" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Album</label>
                        <input required value={trackForm.album} onChange={e => setTrackForm({...trackForm, album: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-gold-500/50 outline-none transition-all" placeholder="Album Name" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Duration</label>
                        <input required value={trackForm.duration} onChange={e => setTrackForm({...trackForm, duration: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-gold-500/50 outline-none transition-all" placeholder="3:45" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Year</label>
                        <input required value={trackForm.year} onChange={e => setTrackForm({...trackForm, year: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-gold-500/50 outline-none transition-all" placeholder="2024" />
                      </div>
                      <div className="md:col-span-2 space-y-2">
                        <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Cover Image URL</label>
                        <input required value={trackForm.cover} onChange={e => setTrackForm({...trackForm, cover: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-gold-500/50 outline-none transition-all" placeholder="https://..." />
                      </div>
                      <div className="md:col-span-2 space-y-2">
                        <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Audio File URL (Direct Link)</label>
                        <input value={trackForm.audioUrl} onChange={e => setTrackForm({...trackForm, audioUrl: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-gold-500/50 outline-none transition-all" placeholder="https://.../song.mp3" />
                      </div>
                    </div>
                  )}

                  {activeTab === 'videos' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="md:col-span-2 space-y-2">
                        <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Title</label>
                        <input required value={videoForm.title} onChange={e => setVideoForm({...videoForm, title: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-gold-500/50 outline-none transition-all" placeholder="Video Title" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Category</label>
                        <input required value={videoForm.category} onChange={e => setVideoForm({...videoForm, category: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-gold-500/50 outline-none transition-all" placeholder="Music Video" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Duration</label>
                        <input required value={videoForm.duration} onChange={e => setVideoForm({...videoForm, duration: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-gold-500/50 outline-none transition-all" placeholder="4:20" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Views</label>
                        <input required value={videoForm.views} onChange={e => setVideoForm({...videoForm, views: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-gold-500/50 outline-none transition-all" placeholder="1.2M" />
                      </div>
                      <div className="md:col-span-2 space-y-2">
                        <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Thumbnail URL</label>
                        <input required value={videoForm.thumbnail} onChange={e => setVideoForm({...videoForm, thumbnail: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-gold-500/50 outline-none transition-all" placeholder="https://..." />
                      </div>
                      <div className="md:col-span-2 space-y-2">
                        <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Description</label>
                        <textarea value={videoForm.description} onChange={e => setVideoForm({...videoForm, description: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-gold-500/50 outline-none transition-all h-24 resize-none" placeholder="Video description..." />
                      </div>
                    </div>
                  )}

                  {activeTab === 'products' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="md:col-span-2 space-y-2">
                        <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Product Name</label>
                        <input required value={productForm.name} onChange={e => setProductForm({...productForm, name: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-gold-500/50 outline-none transition-all" placeholder="Product Name" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Price ($)</label>
                        <input required type="number" value={productForm.price} onChange={e => setProductForm({...productForm, price: parseFloat(e.target.value)})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-gold-500/50 outline-none transition-all" placeholder="45.00" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Category</label>
                        <input required value={productForm.category} onChange={e => setProductForm({...productForm, category: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-gold-500/50 outline-none transition-all" placeholder="Apparel" />
                      </div>
                      <div className="md:col-span-2 space-y-2">
                        <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Image URL</label>
                        <input required value={productForm.image} onChange={e => setProductForm({...productForm, image: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-gold-500/50 outline-none transition-all" placeholder="https://..." />
                      </div>
                      <div className="flex items-center gap-3">
                        <input type="checkbox" checked={productForm.isNew} onChange={e => setProductForm({...productForm, isNew: e.target.checked})} className="w-5 h-5 rounded bg-white/5 border border-white/10 text-gold-500 focus:ring-gold-500" />
                        <label className="text-xs font-mono text-zinc-400 uppercase tracking-widest">Mark as New</label>
                      </div>
                    </div>
                  )}

                  <button type="submit" className="w-full py-4 bg-gold-500 text-gold-950 font-bold rounded-2xl flex items-center justify-center gap-3 hover:bg-gold-400 transition-all">
                    <Save className="w-5 h-5" />
                    Save {activeTab.slice(0, -1)}
                  </button>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* List View */}
        <div className="glass-panel rounded-[2.5rem] border border-white/5 overflow-hidden">
          <div className="divide-y divide-white/5">
            {activeTab === 'tracks' && tracks.map(track => (
              <div key={track.id} className="flex items-center gap-6 p-6 hover:bg-white/[0.02] transition-colors">
                <img src={track.cover} className="w-16 h-16 rounded-xl object-cover" referrerPolicy="no-referrer" />
                <div className="flex-1 min-w-0">
                  <h4 className="text-lg font-serif text-zinc-200">{track.title}</h4>
                  <p className="text-sm text-zinc-500">{track.album} • {track.year}</p>
                </div>
                <div className="flex items-center gap-3">
                  <button onClick={() => handleDelete(track.id, 'tracks')} className="p-3 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-all">
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}

            {activeTab === 'videos' && videos.map(video => (
              <div key={video.id} className="flex items-center gap-6 p-6 hover:bg-white/[0.02] transition-colors">
                <img src={video.thumbnail} className="w-24 aspect-video rounded-xl object-cover" referrerPolicy="no-referrer" />
                <div className="flex-1 min-w-0">
                  <h4 className="text-lg font-serif text-zinc-200">{video.title}</h4>
                  <p className="text-sm text-zinc-500">{video.category} • {video.views} views</p>
                </div>
                <div className="flex items-center gap-3">
                  <button onClick={() => handleDelete(video.id, 'videos')} className="p-3 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-all">
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}

            {activeTab === 'products' && products.map(product => (
              <div key={product.id} className="flex items-center gap-6 p-6 hover:bg-white/[0.02] transition-colors">
                <img src={product.image} className="w-16 h-16 rounded-xl object-cover" referrerPolicy="no-referrer" />
                <div className="flex-1 min-w-0">
                  <h4 className="text-lg font-serif text-zinc-200">{product.name}</h4>
                  <p className="text-sm text-zinc-500">{product.category} • ${product.price.toFixed(2)}</p>
                </div>
                <div className="flex items-center gap-3">
                  <button onClick={() => handleDelete(product.id, 'products')} className="p-3 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-all">
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}

            {(activeTab === 'tracks' ? tracks : activeTab === 'videos' ? videos : products).length === 0 && (
              <div className="p-24 text-center">
                <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
                  {activeTab === 'tracks' ? <Music className="w-10 h-10 text-zinc-700" /> : activeTab === 'videos' ? <Video className="w-10 h-10 text-zinc-700" /> : <ShoppingBag className="w-10 h-10 text-zinc-700" />}
                </div>
                <p className="text-zinc-500 font-light">No {activeTab} found. Start by adding your first {activeTab.slice(0, -1)}.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
