import React from 'react'
import { formatPriceCalculation } from '../../utils/formatPrice'
// Displays final order details before payment
const OrderSummary = ({
    totalPrice,
    cart,
    address,
    paymentMethod
}) => {

  return (
    <div className="container mx-auto px-4 mb-8">
      <div className="flex flex-wrap">
        {/* ===========================
            Left Section
            Billing + Payment + Items
        =========================== */}
        <div className="w-full lg:w-8/12 pr-4">
          <div className="space-y-4">
            {/* ===========================
                Billing Address
            =========================== */}
            <div className="p-4 border rounded-lg shadow-xs">
                <h2 className="text-2xl font-semibold mb-2">
                    Billing Address
                </h2>
                {/* Display selected checkout address */}
                <p>
                    <strong>Building Name: </strong>
                    {address?.buildingName}
                </p>
                <p>
                    <strong>City: </strong>
                    {address?.city}
                </p>
                <p>
                    <strong>Street: </strong>
                    {address?.street}
                </p>
                <p>
                    <strong>State: </strong>
                    {address?.state}
                </p>
                <p>
                    <strong>Pincode: </strong>
                    {address?.pincode}
                </p>
                <p>
                    <strong>Country: </strong>
                    {address?.country}
                </p>
            </div>
            {/* ===========================
                Selected Payment Method
            =========================== */}
            <div className="p-4 border rounded-lg shadow-xs">
                <h2 className="text-2xl font-semibold mb-2">
                    Payment Method
                </h2>
                {/* Stripe / Paypal */}
                <p>
                    <strong>Method: </strong>
                    {paymentMethod}
                </p>
            </div>

            {/* ===========================
                Ordered Products
            =========================== */}
            <div className="pb-4 border rounded-lg shadow-xs mb-6">

                <h2 className="text-2xl font-semibold mb-2">
                    Order Items
                </h2>
                <div className="space-y-2">
                    {/* Loop through every product in cart */}
                    {cart?.map((item) => (
                        <div
                            key={item?.productId}
                            className="flex items-center"
                        >
                            {/* Product Image */}
                            <img
                                src={`${import.meta.env.VITE_BACK_END_URL}/images/${item?.image}`}
                                alt="Product"
                                className="w-12 h-12 rounded-sm"
                            />
                            {/* Product Details */}
                            <div className="text-gray-500">
                                {/* Product Name */}
                                <p>
                                    {item?.productName}
                                </p>
                                {/* Quantity × Price = Total */}
                                <p>
                                    {item?.quantity} x $
                                    {item?.specialPrice}
                                    {" = $"}
                                    {
                                        formatPriceCalculation(
                                            item?.quantity,
                                            item?.specialPrice
                                        )
                                    }
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
          </div>
        </div>
        {/* ===========================
            Right Section
            Final Price Summary
        =========================== */}
        <div className="w-full lg:w-4/12 mt-4 lg:mt-0">
            <div className="border rounded-lg shadow-xs p-4 space-y-4">
                <h2 className="text-2xl font-semibold mb-2">
                    Order Summary
                </h2>
                <div className="space-y-2">
                    {/* Total Product Price */}
                    <div className="flex justify-between">
                        <span>Products</span>
                        <span>
                            $
                            {formatPriceCalculation(
                                totalPrice,
                                1
                            )}
                        </span>
                    </div>
                    {/* Tax */}
                    <div className="flex justify-between">
                        <span>Tax (0%)</span>
                        <span>$0.00</span>
                    </div>
                    {/* Final Amount */}
                    <div className="flex justify-between font-semibold">
                        <span>SubTotal</span>
                        <span>
                            $
                            {formatPriceCalculation(
                                totalPrice,
                                1
                            )}
                        </span>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default OrderSummary;