import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, ShoppingBag, Plus, Minus, Trash2, ArrowRight, ShieldCheck, MapPin, Phone, User } from 'lucide-react';
import { FoodOrder } from '../types';

interface FoodCartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FoodCartDrawer: React.FC<FoodCartDrawerProps> = ({ isOpen, onClose }) => {
  const {
    cartItems,
    cartTotal,
    removeFromCart,
    updateCartQuantity,
    clearCart,
    addFoodOrder,
    currentUser,
    navigateTo,
  } = useApp();

  const [deliveryAddress, setDeliveryAddress] = useState({
    fullName: currentUser?.name || 'Vardhandharsha G.',
    phone: currentUser?.phone || '+91 98480 12345',
    street: 'Hotel Fortune Select Grand Ridge, Room 302',
    landmark: 'Near Shilparamam Junction',
    city: 'Tirupati',
  });

  const [isCheckingOut, setIsCheckingOut] = useState(false);

  if (!isOpen) return null;

  const deliveryFee = cartTotal > 0 ? 40 : 0;
  const taxes = Math.round(cartTotal * 0.05);
  const finalTotal = cartTotal + deliveryFee + taxes;

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (cartItems.length === 0) return;

    const orderRef = 'SWA-EAT-' + Math.floor(100000 + Math.random() * 900000);
    const newOrder: FoodOrder = {
      id: 'ord-' + Date.now(),
      orderRef,
      items: [...cartItems],
      restaurantName: cartItems[0]?.item.restaurantName || 'Swastik Verified Restaurant',
      deliveryAddress,
      subtotal: cartTotal,
      deliveryFee,
      taxes,
      totalAmount: finalTotal,
      status: 'Confirmed',
      orderedAt: new Date().toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit',
      }),
      paymentMethod: 'Demo Payment (Instant Confirmation)',
    };

    addFoodOrder(newOrder);
    onClose();
    navigateTo('my-bookings');
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between overflow-hidden animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-900 text-white">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="w-5 h-5 text-emerald-400" />
            <div>
              <h2 className="font-bold text-sm">Food Cart</h2>
              <p className="text-[11px] text-slate-300">
                {cartItems.length} items from {cartItems[0]?.item.restaurantName || 'Restaurants'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-white/10 rounded-lg text-slate-300 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {cartItems.length === 0 ? (
            <div className="text-center py-16 text-slate-400">
              <ShoppingBag className="w-12 h-12 mx-auto mb-3 text-slate-300 stroke-[1.2]" />
              <h3 className="font-semibold text-slate-700 text-base">Your Cart is Empty</h3>
              <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
                Discover mouth-watering South Indian tiffins, authentic Andhra thalis, and desserts!
              </p>
              <button
                onClick={() => {
                  onClose();
                  navigateTo('food');
                }}
                className="mt-5 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-xl shadow-md transition-colors"
              >
                Browse Food Menu
              </button>
            </div>
          ) : (
            <>
              {/* Cart Items list */}
              <div className="space-y-3">
                {cartItems.map(({ item, quantity }) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-3 rounded-xl border border-slate-100 bg-slate-50/60"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="w-14 h-14 rounded-lg object-cover shrink-0"
                      />
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span
                            className={`w-2 h-2 rounded-full shrink-0 ${
                              item.isVeg ? 'bg-emerald-500' : 'bg-rose-500'
                            }`}
                          />
                          <h4 className="text-xs font-semibold text-slate-800 truncate">{item.name}</h4>
                        </div>
                        <p className="text-xs font-bold text-emerald-700 mt-0.5">₹{item.price * quantity}</p>
                        <p className="text-[10px] text-slate-400">₹{item.price} each</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="flex items-center border border-slate-200 rounded-lg bg-white overflow-hidden shadow-2xs">
                        <button
                          onClick={() => updateCartQuantity(item.id, quantity - 1)}
                          className="p-1 hover:bg-slate-100 text-slate-600 transition-colors"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-2 text-xs font-semibold text-slate-800">{quantity}</span>
                        <button
                          onClick={() => updateCartQuantity(item.id, quantity + 1)}
                          className="p-1 hover:bg-slate-100 text-slate-600 transition-colors"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="p-1 text-slate-400 hover:text-rose-500 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Delivery Details Form */}
              <div className="border border-slate-200 rounded-2xl p-3.5 bg-white space-y-2.5">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold text-slate-800 flex items-center gap-1.5 uppercase tracking-wider">
                    <MapPin className="w-3.5 h-3.5 text-emerald-600" /> Delivery Address
                  </h3>
                </div>
                <div className="space-y-2 text-xs">
                  <div>
                    <label className="text-[11px] font-medium text-slate-500">Contact Person & Phone</label>
                    <div className="grid grid-cols-2 gap-2 mt-1">
                      <input
                        type="text"
                        value={deliveryAddress.fullName}
                        onChange={(e) => setDeliveryAddress({ ...deliveryAddress, fullName: e.target.value })}
                        className="w-full px-2.5 py-1.5 border border-slate-200 rounded-lg text-xs focus:ring-1 focus:ring-emerald-500 outline-hidden"
                        placeholder="Full Name"
                        required
                      />
                      <input
                        type="tel"
                        value={deliveryAddress.phone}
                        onChange={(e) => setDeliveryAddress({ ...deliveryAddress, phone: e.target.value })}
                        className="w-full px-2.5 py-1.5 border border-slate-200 rounded-lg text-xs focus:ring-1 focus:ring-emerald-500 outline-hidden"
                        placeholder="Mobile Number"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-medium text-slate-500">Street / Hotel Room / Locality</label>
                    <input
                      type="text"
                      value={deliveryAddress.street}
                      onChange={(e) => setDeliveryAddress({ ...deliveryAddress, street: e.target.value })}
                      className="mt-1 w-full px-2.5 py-1.5 border border-slate-200 rounded-lg text-xs focus:ring-1 focus:ring-emerald-500 outline-hidden"
                      placeholder="Street, Room or Apartment No"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[11px] font-medium text-slate-500">Landmark</label>
                      <input
                        type="text"
                        value={deliveryAddress.landmark}
                        onChange={(e) => setDeliveryAddress({ ...deliveryAddress, landmark: e.target.value })}
                        className="mt-1 w-full px-2.5 py-1.5 border border-slate-200 rounded-lg text-xs focus:ring-1 focus:ring-emerald-500 outline-hidden"
                        placeholder="Near Temple / Junction"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-medium text-slate-500">City</label>
                      <input
                        type="text"
                        value={deliveryAddress.city}
                        onChange={(e) => setDeliveryAddress({ ...deliveryAddress, city: e.target.value })}
                        className="mt-1 w-full px-2.5 py-1.5 border border-slate-200 rounded-lg text-xs focus:ring-1 focus:ring-emerald-500 outline-hidden"
                        placeholder="City"
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200/80 space-y-2 text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>Item Subtotal</span>
                  <span>₹{cartTotal}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Delivery & Packaging</span>
                  <span>₹{deliveryFee}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>GST & Restaurant Charges (5%)</span>
                  <span>₹{taxes}</span>
                </div>
                <div className="border-t border-slate-200 pt-2 flex justify-between font-bold text-sm text-slate-900">
                  <span>To Pay (Demo Mode)</span>
                  <span className="text-emerald-700">₹{finalTotal}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 p-2.5 bg-emerald-50 rounded-xl text-emerald-800 text-[11px] leading-relaxed">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Demo Payment: No actual charges. Real-time food prep & rider tracking simulation.</span>
              </div>
            </>
          )}
        </div>

        {/* Footer Actions */}
        {cartItems.length > 0 && (
          <div className="p-4 border-t border-slate-100 bg-white space-y-2">
            <button
              onClick={handlePlaceOrder}
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm rounded-xl shadow-md hover:shadow-lg flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <span>Place Demo Order • ₹{finalTotal}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={clearCart}
              className="w-full py-1.5 text-xs text-slate-400 hover:text-rose-600 transition-colors"
            >
              Clear Cart
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
