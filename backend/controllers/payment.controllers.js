import Stripe from 'stripe';
import Order from '../models/order.model.js';
import Cart from '../models/cart.model.js';
import Payment from '../models/payment.model.js';
import CartItem from '../models/cartItem.model.js';
import Shipping from '../models/shipping.model.js';
import { asyncHandler } from '../middlewares/error.middlewares.js';

const stripe = new Stripe(process.env.STRIPE_KEY_SECRET);

export const createPayment = asyncHandler(async (request, response, next) => {
  const { orderId, shippingAddress, shippingName } = request.body;

  try {
    const order = await Order.findById(orderId);
    if (!order) {
      return response.status(404).json({ message: 'Order not found' });
    }

    // Check if order is already paid
    if (order.status === 'paid') {
      return response.status(400).json({ message: 'Order is already paid' });
    }

    const customer = await stripe.customers.create({
      description: 'Customer for order ' + order._id,
      email: request.user.email,
    });

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(order.totalPrice * 100),
      currency: 'php',
      customer: customer.id,
      payment_method: 'pm_card_visa',
      off_session: true,
      confirm: true,
      description: 'Payment for Order',
      metadata: {
        orderId: order._id.toString(),
      },
    });

    let paymentStatus = 'pending';

    if (paymentIntent.status === 'succeeded') {
      paymentStatus = 'succeeded';

      // Update order status
      order.status = 'paid';
      const savedOrder = await order.save();

      // Create Shipping record with status 'Pending' and name
      const shipping = new Shipping({
        orderId: savedOrder._id,
        name: shippingName,
        address: shippingAddress,
        status: 'Pending',
      });
      const savedShipping = await shipping.save();

      // Clear the cart associated with the user
      const cart = await Cart.findOne({ userId: order.userId });
      if (cart) {
        await CartItem.deleteMany({ cartId: cart._id });
        cart.items = [];
        await cart.save();
      }

      // Create Payment record
      const payment = new Payment({
        orderId: savedOrder._id,
        paymentIntentId: paymentIntent.id,
        amount: savedOrder.totalPrice,
        status: paymentStatus,
      });
      const savedPayment = await payment.save();

      response.status(201).json({
        message: 'Payment successfully processed',
        payment: savedPayment,
        order: savedOrder,
        shipping: savedShipping,
      });
    } else if (paymentIntent.status === 'requires_action') {
      paymentStatus = 'pending';

      // Create Payment record for pending status
      const payment = new Payment({
        orderId: order._id,
        paymentIntentId: paymentIntent.id,
        amount: order.totalPrice,
        status: paymentStatus,
      });
      const savedPayment = await payment.save();

      response.status(201).json({
        message: 'Payment requires authentication',
        payment: savedPayment,
        order: order,
      });
    } else {
      paymentStatus = 'failed';

      // Create Payment record for failed status
      const payment = new Payment({
        orderId: order._id,
        paymentIntentId: paymentIntent.id,
        amount: order.totalPrice,
        status: paymentStatus,
      });
      const savedPayment = await payment.save();

      response.status(400).json({
        message: 'Payment failed',
        payment: savedPayment,
        order: order,
      });
    }
  } catch (error) {
    next(error);
  }
});


export const handleWebhook = asyncHandler(async (request, response, next) => {
  const sig = request.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      request.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (error) {
    return response.status(400).send(`Webhook Error: ${error.message}`);
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;

    try {
      const order = await Order.findById(session.metadata.orderId).populate(
        'userId'
      );
      if (order) {
        order.status = 'paid';
        await order.save();

        const payment = new Payment({
          orderId: order._id,
          paymentIntentId: session.payment_intent,
          amount: session.amount_total / 100,
        });
        await payment.save();

        const cart = await Cart.findOne({ userId: order.userId });
        if (cart) {
          await CartItem.deleteMany({ cartId: cart._id });
          cart.items = [];
          await cart.save();
        }
      }
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  }

  response.status(200).json({ received: true });
});
