'use client';

import Image from 'next/image';
import { Product } from '@/types';
import styles from './productCard.module.scss';
import { buttonTitles } from '@/constants/texts';
import AppButton from '../appButton/AppButton';
import { useAuth } from '@/hooks/useAuth';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { user } = useAuth();

  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <Image
          src={product.thumbnail}
          alt={product.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={false}
        />
      </div>

      <div className={styles.content}>
        <h3 className={styles.title}>{product.title}</h3>
        <span className={styles.category}>{product.category}</span>
        <span className={styles.price}>{product.price}</span>
        {user && <AppButton className={styles.addToCartBtn}>{buttonTitles.add}</AppButton>}
      </div>
    </div>
  );
}
