import React from 'react';

interface ProductBannerProps {
  title: string;
  description: string;
  image: string;
}

const ProductBanner: React.FC<ProductBannerProps> = ({ title, description, image }) => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-white">
        <div className="relative h-80 md:h-96 lg:h-[400px]">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
            <div className="text-white max-w-2xl">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-playfair font-bold mb-4">
                {title}
              </h1>
              <p className="text-lg md:text-xl font-inter opacity-90">
                {description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductBanner;