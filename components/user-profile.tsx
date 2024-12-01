'use client';

import { useState, useEffect } from 'react';
import { useAuthStore } from '@/stores/userStore';
import { useCartStore } from '@/stores/cartStore'; // Import the cart store
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export default function UserProfile() {
  const { token, user } = useAuthStore(); // Retrieve user data from Zustand store
  const { orders, fetchCart } = useCartStore(); // Use the cart store
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);

  useEffect(() => {
    if (token) {
      fetchCart(token)
    }
  }, [token, fetchCart]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPhotoUrl(url);
    }
  };

  if (!user) {
    return (
      <div className="text-center">
        <p className="text-lg">Please log in to view your profile.</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>User Profile</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Avatar className="w-24 h-24">
              <AvatarImage src={photoUrl || undefined} alt={user.name} />
              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-2xl font-bold">{user.name}</h2>
              <p className="text-sm text-muted-foreground">ID: {user.id}</p>
              <p className="text-sm text-muted-foreground">Phone: {user.phone}</p>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="photo-upload">Upload Photo</Label>
            <Input
              id="photo-upload"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Order History</CardTitle>
        </CardHeader>
        <CardContent>
          {orders.length === 0 ? (
            <p className="text-muted-foreground">No orders found.</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell>{order.id}</TableCell>
                    <TableCell>{new Date(order.createdAt).toLocaleDateString()}</TableCell>
                    <TableCell>${parseFloat(order.total).toFixed(2)}</TableCell>
                    <TableCell>
  <span
    className={`px-2 py-1 rounded-full text-sm font-medium ${
      order.isOrdered ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
    }`}
  >
    {order.isOrdered ? 'Completed' : 'Active'}
  </span>
                    </TableCell>

                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
