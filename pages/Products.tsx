import React from 'react';
import HeroVideo from '../components/HeroVideo';
import { ASSETS } from '../config/assets';

interface ProductSectionProps {
  id: string;
  title: string;
  images: string[];
}

const ProductSection: React.FC<ProductSectionProps> = ({ id, title, images }) => (
  <section id={id} className="py-20 border-b border-gray-100 last:border-0 scroll-mt-20">
    <div className="max-w-[95%] mx-auto px-4">
      <div className="flex items-center justify-between mb-8">
         <div className="flex items-center gap-4">
            <div className="w-2 h-10 bg-brand-green rounded-sm"></div>
            <h2 className="text-3xl font-bold text-brand-navy uppercase tracking-wide">{title}</h2>
         </div>
         <span className="hidden md:inline-block text-sm text-gray-400 italic font-light">
            Scroll to view more &rarr;
         </span>
      </div>
      
      {/* Horizontal Scrolling Gallery */}
      <div className="w-full overflow-x-auto pb-6 scrollbar-hide">
        <div className="flex gap-4 md:gap-6 min-w-max">
          {images.map((img, index) => (
            <div 
              key={index} 
              className="relative w-[280px] md:w-[350px] aspect-[3/4] flex-shrink-0 overflow-hidden rounded-sm bg-gray-100 group shadow-md hover:shadow-xl transition-all duration-300"
            >
              <img 
                src={img} 
                alt={`${title} product ${index + 1}`} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
                 <span className="text-white font-bold uppercase tracking-widest text-sm border-b border-white pb-1">View Detail</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

const Products = () => {
  // Use productPage assets (Indices 1-6 from product_page folder)
  const products = [
    { id: 'knit', title: 'Knit', images: ASSETS.images.productPage.knit },
    { id: 'woven', title: 'Woven', images: ASSETS.images.productPage.woven },
    { id: 'nightwear', title: 'Nightwear and Loungewear', images: ASSETS.images.productPage.nightwear },
    { id: 'denim', title: 'Denim', images: ASSETS.images.productPage.denim },
    { id: 'outerwear', title: 'Outer Wear', images: ASSETS.images.productPage.outerwear },
    { id: 'lingerie', title: 'Lingerie and Swimwear', images: ASSETS.images.productPage.lingerie },
    { id: 'activewear', title: 'Activewear, Workwear, Sportswear', images: ASSETS.images.productPage.activewear },
    { id: 'hometextile', title: 'Home Textile', images: ASSETS.images.productPage.hometextile },
    { id: 'uniform', title: 'Uniform and Healthcare wear', images: ASSETS.images.productPage.uniform },
    { id: 'sweater', title: 'Sweater', images: ASSETS.images.productPage.sweater },
    { id: 'disney', title: 'Disney and License Character Products', images: ASSETS.images.productPage.license },
  ];

  return (
    <div>
      {/* 
        Hero Video stays as the first image type (video)
      */}
      <HeroVideo 
        title="Our Product Lines" 
        subtitle="Diversified, High-Quality, and Wide-Ranging Product Categories"
        videoUrl={ASSETS.videos.products}
      />
      
      <div className="bg-white min-h-screen">
        <div className="max-w-[95%] mx-auto px-4 py-16 text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-[#1e3a8a] mb-6 font-serif">Product Categories</h2>
            <p className="text-gray-700 max-w-4xl mx-auto leading-relaxed text-lg md:text-xl font-light">
                Discover our extensive range of high-quality apparel. Each category represents our commitment to excellence, innovation, and diverse fashion needs.
            </p>
        </div>

        {products.map(product => (
          <ProductSection 
            key={product.id} 
            id={product.id} 
            title={product.title} 
            images={product.images} 
          />
        ))}

        {/* Call to Action at bottom */}
         <section className="py-20 bg-gray-50 text-center">
             <h2 className="text-2xl md:text-3xl font-bold text-brand-navy mb-6">Need a custom sourcing solution?</h2>
             <a href="mailto:ceo@apparelbd.com" className="inline-block bg-brand-green text-white px-10 py-4 text-sm font-bold uppercase tracking-widest hover:bg-brand-navy transition-all shadow-lg rounded-sm">
                 Contact Us
             </a>
         </section>
      </div>
    </div>
  );
};

export default Products;