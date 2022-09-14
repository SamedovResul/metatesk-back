import Stripe from 'stripe'
const stripe = new Stripe('sk_test_51LQnpDELTeCubC9jQCgv0InaaFjoI44nGiGH4o3KTwgRmNw9sTvPVtJrU9UoFl0Atq21Xqf0JEu98EEXAiyze5Zv004xrJFQxl')

export const stripePayment = async (req,res) =>{
  let { amount, id} = req.body
  try {
		console.log(req.body)
    const payment = await stripe.paymentIntents.create({
			amount,
			currency: "USD",
			description: "Metatesk",
			payment_method: id,
			confirm: true
		})
		// console.log("Payment", payment)
		res.json({
			message: "Payment successful",
			success: true
		})
  } catch (error) {
    console.log("Error", error)
		res.json({
			message: "Payment failed",
			success: false
		})
  }

}