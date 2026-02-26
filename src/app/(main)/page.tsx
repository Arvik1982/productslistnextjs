import { Product } from '@/types';
import ProductCard from '@/components/productCard/ProductCard';
import styles from './page.module.scss';
import { titles } from '@/constants/texts';
import { productsApi } from '@/services/productsApi';

async function getProducts() {
  const response = await productsApi.getProducts(12);
  return response.data.products as Product[];
}

export default async function HomePage() {
  const products = await getProducts();

  return (
    <div className="container">
      <h1 className={styles.pageTitle}>{titles.productsTitle}</h1>
      <div className={styles.productsGrid}>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
