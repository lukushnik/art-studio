import ProductGrid from '@/components/product-grid';
import { Product } from '@/types';

async function fetchProducts(): Promise<Product[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`, {cache: 'no-cache'});
    if (!res.ok) {
      throw new Error('Failed to fetch products');
    }
    return res.json();
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

export default async function Home() {
  const products = await fetchProducts();

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Our Products</h1>
      <ProductGrid products={products} />
    </main>
  );
}
