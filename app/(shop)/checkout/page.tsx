'use client';

import { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { useCartStore } from '@/stores/cartStore';
import { useAuthStore } from '@/stores/userStore';
import { toast } from 'sonner';
import { CheckoutItem } from '@/components/checkout-item';
import { useRouter } from 'next/navigation';

export default function Checkout() {
  const cart = useCartStore((state) => state.cart);
  const clearCart = useCartStore((state) => state.clearCart);

  const { token } = useAuthStore();
  const router = useRouter();
  const cartProducts = cart?.cartProduct?.filter((item) => item.productAmount > 0) ?? [];

  const [formValues, setFormValues] = useState({
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, field: string) => {
    setFormValues({ ...formValues, [field]: e.target.value });
  };

  const isFormValid = Object.values(formValues).every((value) => value.trim() !== '');

  const handlePlaceOrder = async () => {
    if (!isFormValid) {
      toast.error('Будь ласка, заповніть всі поля.');
      return;
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cart/place-order`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({}),
      });

      if (response.ok) {
        toast.success('Замовлення створено');
        clearCart();
        router.push('/');
      } else {
        toast.error('Не вдалося зробити замовлення.');
      }
    } catch (error) {
      console.error('Помилка при створенні замовлення:', error);
      toast.error('Сталася помилка при створенні замовлення.');
    }
  };

  const subtotal = cartProducts.reduce(
    (sum, item) => sum + parseFloat(item.productPrice) * item.productAmount,
    0
  );
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Оформлення замовлення</h1>
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-semibold mb-4">Адреса доставки</h2>
          <form className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">Ім&#39;я</Label>
                <Input
                  id="firstName"
                  placeholder="Іван"
                  value={formValues.firstName}
                  onChange={(e) => handleInputChange(e, 'firstName')}
                />
              </div>
              <div>
                <Label htmlFor="lastName">Прізвище</Label>
                <Input
                  id="lastName"
                  placeholder="Іванов"
                  value={formValues.lastName}
                  onChange={(e) => handleInputChange(e, 'lastName')}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="address">Адреса</Label>
              <Input
                id="address"
                placeholder="вул. Центральна, 123"
                value={formValues.address}
                onChange={(e) => handleInputChange(e, 'address')}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  placeholder="Київ"
                  value={formValues.city}
                  onChange={(e) => handleInputChange(e, 'city')}
                />
              </div>
              <div>
                <Label htmlFor="state">Область</Label>
                <Select
                  onValueChange={(value) => setFormValues({ ...formValues, state: value })}
                >
                  <SelectTrigger id="state">
                    <SelectValue placeholder="Оберіть область" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ny">Київська</SelectItem>
                    <SelectItem value="ca">Одеська</SelectItem>
                    <SelectItem value="tx">Львівська</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="zipCode">Поштовий індекс</Label>
                <Input
                  id="zipCode"
                  placeholder="12345"
                  value={formValues.zipCode}
                  onChange={(e) => handleInputChange(e, 'zipCode')}
                />
              </div>
              <div>
                <Label htmlFor="country">Країна</Label>
                <Select
                  onValueChange={(value) => setFormValues({ ...formValues, country: value })}
                >
                  <SelectTrigger id="country">
                    <SelectValue placeholder="Оберіть країну" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="us">Україна</SelectItem>
                    <SelectItem value="ca">Польща</SelectItem>
                    <SelectItem value="uk">Німеччина</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </form>
        </div>
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Сума кошику</h2>
          {cartProducts.length === 0 ? (
            <p>Ваш кошик порожній</p>
          ) : (
            <>
              <div className="space-y-2">
                {cartProducts.map((item) => (
                  <CheckoutItem
                    key={item.productId}
                    name={item.product.name}
                    price={parseFloat(item.productPrice)}
                    quantity={item.productAmount}
                  />
                ))}
              </div>
              <div className="border-t pt-4">
                <div className="flex justify-between">
                  <span>Підсумок</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Податок</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-semibold">
                  <span>Загальна сума</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
              <Button className="w-full" onClick={handlePlaceOrder} disabled={!isFormValid}>
                Оформити замовлення
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
