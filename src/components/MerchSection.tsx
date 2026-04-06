import { motion } from "motion/react";
import { ShoppingBag, ArrowRight, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { db, collection, onSnapshot, query, orderBy, OperationType, handleFirestoreError } from "../lib/firebase";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  isNew?: boolean;
}

const fallbackProducts: Product[] = [
  {
    id: "1",
    name: "Midnight Serenade Vinyl",
    price: 35.00,
    image: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=2070&auto=format&fit=crop",
    category: "Limited Edition"
  },
  {
    id: "2",
    name: "Echoes Oversized Hoodie",
    price: 65.00,
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=1974&auto=format&fit=crop",
    category: "Best Seller"
  },
];

export default function MerchSection({ showViewMore = false }: { showViewMore?: boolean }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'products'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedProducts = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Product[];
      
      setProducts(fetchedProducts.length > 0 ? fetchedProducts : fallbackProducts);
      setLoading(false);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'products');
      setProducts(fallbackProducts);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <section id="merch" className="py-24 bg-zinc-950">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <h2 className="text-5xl font-serif mb-4">The <span className="italic text-gold-200">Collection</span></h2>
            <p className="text-zinc-500 font-mono text-sm tracking-widest uppercase">Official Aria Vance Merchandise</p>
          </div>
          {showViewMore && (
            <Link to="/merch" className="group flex items-center gap-2 text-gold-400 hover:text-gold-200 font-mono text-sm uppercase tracking-widest transition-all">
              View Full Store <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {loading ? (
            <div className="col-span-full py-12 text-center text-zinc-500 font-mono text-xs uppercase tracking-widest">Loading products...</div>
          ) : products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden mb-6 bg-zinc-900">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-gold-500 text-gold-950 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1">
                    <Star className="w-2 h-2 fill-current" />
                    {product.category}
                  </span>
                </div>
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button className="bg-white text-black px-6 py-3 rounded-full font-bold flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-all">
                    <ShoppingBag className="w-4 h-4" />
                    Add to Cart
                  </button>
                </div>
              </div>
              <h3 className="text-lg font-serif mb-1 group-hover:text-gold-400 transition-colors">{product.name}</h3>
              <p className="text-zinc-500 font-mono text-sm">${typeof product.price === 'number' ? product.price.toFixed(2) : product.price}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
