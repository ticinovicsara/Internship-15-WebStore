import { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faTimes } from "@fortawesome/free-solid-svg-icons";
import { toast, ToastContainer } from "react-toastify";

export const CartIcon = () => {
  const [cart, setCart] = useState<
    { id: number; title: string; price: number }[]
  >([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateCart = () => {
      const storedCart = localStorage.getItem("cart");
      if (storedCart) {
        setCart(JSON.parse(storedCart));
      }
    };

    window.addEventListener("cartUpdated", updateCart);
    window.addEventListener("storage", updateCart);

    return () => {
      window.removeEventListener("cartUpdated", updateCart);
      window.removeEventListener("storage", updateCart);
    };
  }, []);

  const groupedCart = cart.reduce((acc, item) => {
    const existingItem = acc.find((i) => i.id === item.id);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      acc.push({ ...item, quantity: 1 });
    }
    return acc;
  }, [] as { id: number; title: string; price: number; quantity: number }[]);

  const removeItemFromCart = (id: number) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));

    toast.dismiss();
    toast.success("Product removed successfully!");

    window.dispatchEvent(new Event("cartUpdated"));
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="cart-container" ref={dropdownRef}>
      <div
        className="cart-icon-wrapper"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        <FontAwesomeIcon icon={faShoppingCart} className="cart-icon" />
        {groupedCart.length > 0 && (
          <span className="cart-count">{groupedCart.length}</span>
        )}
      </div>

      {isDropdownOpen && (
        <div className="cart-dropdown">
          {groupedCart.length === 0 ? (
            <p className="empty-cart">No items in cart</p>
          ) : (
            groupedCart.map((item) => (
              <div key={item.id} className="cart-item">
                <p>
                  {item.title} (x{item.quantity})
                </p>
                <span>{(item.price * item.quantity).toFixed(2)} &euro;</span>
                <FontAwesomeIcon
                  icon={faTimes}
                  className="remove-icon"
                  onClick={() => removeItemFromCart(item.id)}
                />
              </div>
            ))
          )}
        </div>
      )}
      <ToastContainer
        position="bottom-left"
        autoClose={3000}
        hideProgressBar={true}
        rtl={false}
      />
    </div>
  );
};
