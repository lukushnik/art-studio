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
      toast.error('Please fill out all required fields.');
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
        toast.success('Order Created');
        clearCart();
        router.push('/');
      } else {
        toast.error('Failed to place order.');
      }
    } catch (error) {
      console.error('Error placing order:', error);
      toast.error('An error occurred while placing the order.');
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
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-semibold mb-4">Shipping Address</h2>
          <form className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  placeholder="John"
                  value={formValues.firstName}
                  onChange={(e) => handleInputChange(e, 'firstName')}
                />
              </div>
              <div>
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  placeholder="Doe"
                  value={formValues.lastName}
                  onChange={(e) => handleInputChange(e, 'lastName')}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                placeholder="123 Main St"
                value={formValues.address}
                onChange={(e) => handleInputChange(e, 'address')}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  placeholder="New York"
                  value={formValues.city}
                  onChange={(e) => handleInputChange(e, 'city')}
                />
              </div>
              <div>
                <Label htmlFor="state">State</Label>
                <Select
                  onValueChange={(value) => setFormValues({ ...formValues, state: value })}
                >
                  <SelectTrigger id="state">
                    <SelectValue placeholder="Select state" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ny">New York</SelectItem>
                    <SelectItem value="ca">California</SelectItem>
                    <SelectItem value="tx">Texas</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="zipCode">Zip Code</Label>
                <Input
                  id="zipCode"
                  placeholder="12345"
                  value={formValues.zipCode}
                  onChange={(e) => handleInputChange(e, 'zipCode')}
                />
              </div>
              <div>
                <Label htmlFor="country">Country</Label>
                <Select
                  onValueChange={(value) => setFormValues({ ...formValues, country: value })}
                >
                  <SelectTrigger id="country">
                    <SelectValue placeholder="Select country" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="us">United States</SelectItem>
                    <SelectItem value="ca">Canada</SelectItem>
                    <SelectItem value="uk">United Kingdom</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </form>
        </div>
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Cart Summary</h2>
          {cartProducts.length === 0 ? (
            <p>Your cart is empty</p>
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
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
              <Button className="w-full" onClick={handlePlaceOrder} disabled={!isFormValid}>
                Place Order
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
