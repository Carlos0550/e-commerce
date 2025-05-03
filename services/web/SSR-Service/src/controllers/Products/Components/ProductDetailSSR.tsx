import React from 'react';
import { FaCartPlus, FaWhatsapp } from 'react-icons/fa';

export interface ProductImages {
  name: string;
  path: string;
  size: number;
  type: string;
}

interface Props {
  product_id: string;
  product_name: string;
  product_description: string;
  product_price: string;
  product_stock: string;
  product_category?: string;
  product_images: ProductImages[];
  buildPath: (path: string) => string;
}

function ProductDetailSSR({
  product_id,
  product_name,
  product_description,
  product_price,
  product_images,
  buildPath
}: Props) {
  const mainImage = product_images[0] ? buildPath(product_images[0].path) : "";
  return (
    <article className="product-detail">
      <div className="product-layout">
        <section className="product-images-section">
          {mainImage && (
            <div className="main-image-wrapper">
              <img
                src={mainImage}
                alt={product_name}
                className="main-product-image"
              />
            </div>
          )}
          <div className="thumbnail-gallery">
            {product_images.slice(1).map((image, i) => (
              <figure key={i} className="product-image-wrapper thumbnail">
                <img
                  src={buildPath(image.path)}
                  alt={`${product_name} miniatura ${i + 1}`}
                  className="product-image"
                />
              </figure>
            ))}
          </div>
        </section>

        <header className="product-header">
          <h1 className="product-title">{product_name}</h1>
          <p className="product-price">${product_price}</p>
          <div className="product-actions">
            <button className="add-to-cart">Agregar al <FaCartPlus /></button>
            <button className="buy-now">Comprar directamente <FaWhatsapp size={20} /></button>
          </div>
          <section className="product-info-section">
            <div
              className="product-description"
              dangerouslySetInnerHTML={{ __html: product_description }}
            ></div>
          </section>
        </header>
      </div>
    </article>
  );
}

export default ProductDetailSSR;
