import React from 'react';
import HeroVideo from '../components/HeroVideo';
import { ASSETS } from '../config/assets';

interface ProductSectionProps {
  id: string;
  title: string;
  image: string;
}

const ProductSection: React.FC<ProductSectionProps> = ({ id, title, image }) => (
  <section id={id} className="py-16 border-b border-gray-100 last:border-0 scroll-mt-20">
    <div className="max-w-7xl mx-auto px-4">
      <div className="flex items-center gap-4 mb-8">
         <div className="w-2 h-10 bg-brand-green rounded-sm"></div>
         <h2 className="text-3xl font-bold text-brand-navy">{title}</h2>
      </div>
      <div className="w-full h-[400px] bg-gray-100 rounded-lg overflow-hidden relative group shadow-lg">
        <img src={image} alt={title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
        <div className="absolute inset-0 bg-brand-navy/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <div className="text-center">
                <h3 className="text-2xl text-white font-serif italic mb-2">{title} Collection</h3>
                <p className="text-white/80 uppercase tracking-widest text-sm">View Details</p>
            </div>
        </div>
      </div>
    </div>
  </section>
);

const Products = () => {
  const products = [
    { id: 'knit', title: 'Knit', image: 'https://images.unsplash.com/photo-1620799140408-ed5341cd2431?q=80&w=2000&auto=format&fit=crop' },
    { id: 'woven', title: 'Woven', image: 'https://images.unsplash.com/photo-1520218508822-998633d997a6?q=80&w=2000&auto=format&fit=crop' },
    { id: 'nightwear', title: 'Nightwear and Loungewear', image: 'https://images.unsplash.com/photo-1571513722275-4b41940954b3?q=80&w=2000&auto=format&fit=crop' },
    { id: 'denim', title: 'Denim', image: 'https://images.unsplash.com/photo-1542272617-08f08630329f?q=80&w=2000&auto=format&fit=crop' },
    { id: 'outerwear', title: 'Outer Wear', image: 'https://images.unsplash.com/photo-1544022613-e87ca75a784a?q=80&w=2000&auto=format&fit=crop' },
    { id: 'lingerie', title: 'Lingerie and Swimwear', image: 'https://images.unsplash.com/photo-1596482103565-d603a1163152?q=80&w=2000&auto=format&fit=crop' },
    { id: 'activewear', title: 'Activewear, Workwear, Sportswear', image: 'https://images.unsplash.com/photo-1518459031867-a89b944bffe4?q=80&w=2000&auto=format&fit=crop' },
    { id: 'hometextile', title: 'Home Textile', image: 'https://images.unsplash.com/photo-1522771753035-4a503f3a6352?q=80&w=2000&auto=format&fit=crop' },
    { id: 'sweater', title: 'Sweater', image: 'https://images.unsplash.com/photo-1611090159492-3866d936e788?q=80&w=2000&auto=format&fit=crop' },
    { id: 'uniform', title: 'Uniform and Healthcare wear', image: 'https://images.unsplash.com/photo-1584467541268-b040f83be3dd?q=80&w=2000&auto=format&fit=crop' },
    { id: 'disney', title: 'Disney and License Character Products', image: 'https://images.unsplash.com/photo-1535572290543-523a3d6e1b0c?q=80&w=2000&auto=format&fit=crop' },
    { id: 'jute', title: 'Jute Crafts, Shoes and Others', image: 'https://images.unsplash.com/photo-1550974797-0dc2a420952d?q=80&w=2000&auto=format&fit=crop' },
  ];

  return (
    <div>
      {/* 
        Using centralized video config
        Video: Close up of fabric texture/hands feeling material 
      */}
      <HeroVideo 
        title="Our Product Lines" 
        subtitle="Diversified, High-Quality, and Wide-Ranging Product Categories"
        videoUrl={ASSETS.videos.products}
      />
      
      <div className="bg-white min-h-screen">
        {products.map(product => (
          <ProductSection 
            key={product.id} 
            id={product.id} 
            title={product.title} 
            image={product.image} 
          />
        ))}
      </div>
    </div>
  );
};

export default Products;