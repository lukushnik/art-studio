import { useEffect } from 'react';
import { Minus, Plus, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { useCartStore } from '@/stores/cartStore';
import { useAuthStore } from '@/stores/userStore';
import {useRouter} from 'next/navigation';

export default function CartMenu() {
  const cart = useCartStore((state) => state.cart);
  const updateCart = useCartStore((state) => state.updateCart);
  const { token } = useAuthStore();
  const router = useRouter();

  console.log('cart', cart)
  const updateQuantity = async (id: string, change: number) => {
    if (!cart) return;

    try {
      const updatedItem = cart.cartProduct.find((item) => item.productId === id);

      if (!updatedItem) return;

      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cart/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          productId: id,
          quantity: change,
        }),
      });

      const updatedCartProduct = cart.cartProduct
        .map((item) =>
          item.productId === id
            ? { ...item, productAmount: Math.max(0, item.productAmount + change) }
            : item
        )
        .filter((item) => item.productAmount > 0);

      updateCart({
        ...cart,
        cartProduct: updatedCartProduct,
        total: updatedCartProduct
          .reduce(
            (sum, item) =>
              sum + parseFloat(item.productPrice) * item.productAmount,
            0
          )
          .toFixed(2),
      });
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  };

  const totalItems = cart
    ? cart.cartProduct.reduce((sum, item) => sum + item.productAmount, 0)
    : 0;

  useEffect(() => {
    if (cart && totalItems < 0) {
      console.warn('Detected invalid cart state.');
    }
  }, [cart, totalItems]);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <ShoppingCart className="h-4 w-4" />
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
              {totalItems}
            </span>
          )}
          <span className="sr-only">Відкрити кошик</span>
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Ваш кошик</SheetTitle>
        </SheetHeader>
        <div className="mt-8">
          {cart?.cartProduct.length === 0 ? (
            <p className="text-center text-muted-foreground">Ваш кошик порожній</p>
          ) : (
            <>
              <ul className="space-y-4">
                {cart?.cartProduct
                  .filter((item) => item.productAmount > 0)
                  .map((item) => (
                    <li
                      key={item.productId}
                      className="flex items-center p-2 rounded space-x-4 py-2"
                    >
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-medium truncate">
                          {item.product.name}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          ${parseFloat(item.productPrice).toFixed(2)}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => updateQuantity(item.productId, -1)}
                          aria-label={`Зменшити кількість ${item.product.name}`}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="w-8 text-center">{item.productAmount}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => updateQuantity(item.productId, 1)}
                          aria-label={`Збільшити кількість ${item.product.name}`}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </li>
                  ))}
              </ul>
              <div className="mt-4">
                <Button
                  variant="default"
                  size="lg"
                  className="w-full"
                  onClick={() => router.push('/checkout')}
                >
                  Оформити замовлення
                </Button>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
