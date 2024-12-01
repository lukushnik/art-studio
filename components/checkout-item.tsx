
interface CartItemProps {
  name: string;
  price: number;
  quantity: number;
}

export function CheckoutItem({name, price, quantity}: CartItemProps) {
  return (
    <div className="flex items-center space-x-4 py-2">
      <div className="flex-1">
        <h3 className="font-semibold">{name}</h3>
        <p className="text-sm text-gray-500">${price.toFixed(2)}</p>
      </div>
      <div className="flex items-center space-x-2">
        <span>{quantity}</span>
      </div>
    </div>
  );
}
