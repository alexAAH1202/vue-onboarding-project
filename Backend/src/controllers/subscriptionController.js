const User = require('../models/User');

exports.createSubscription = async (req, res) => {
  try {
    const { userId, tier, billingCycle, paymentDetails } = req.body;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.subscription = {
      tier,
      billingCycle,
      startDate: new Date(),
      endDate: calculateEndDate(billingCycle),
      status: 'active',
      paymentDetails
    };

    await user.save();
    res.status(201).json({ message: 'Subscription created successfully', subscription: user.subscription });
  } catch (error) {
    res.status(500).json({ message: 'Error creating subscription', error: error.message });
  }
};

exports.updateSubscription = async (req, res) => {
  try {
    const { userId, tier, billingCycle } = req.body;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.subscription.tier = tier || user.subscription.tier;
    user.subscription.billingCycle = billingCycle || user.subscription.billingCycle;
    user.subscription.endDate = calculateEndDate(user.subscription.billingCycle);

    await user.save();
    res.json({ message: 'Subscription updated successfully', subscription: user.subscription });
  } catch (error) {
    res.status(500).json({ message: 'Error updating subscription', error: error.message });
  }
};

exports.getSubscription = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user.subscription);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching subscription', error: error.message });
  }
};

exports.updateBusinessInfo = async (req, res) => {
  try {
    const { userId, businessName, businessAddress, abnAcn } = req.body;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.businessName = businessName || user.businessName;
    user.businessAddress = businessAddress || user.businessAddress;
    user.abnAcn = abnAcn || user.abnAcn;

    await user.save();
    res.json({ message: 'Business info updated successfully', businessInfo: {
      businessName: user.businessName,
      businessAddress: user.businessAddress,
      abnAcn: user.abnAcn
    }});
  } catch (error) {
    res.status(500).json({ message: 'Error updating business info', error: error.message });
  }
};

function calculateEndDate(billingCycle) {
  const endDate = new Date();
  if (billingCycle === 'monthly') {
    endDate.setMonth(endDate.getMonth() + 1);
  } else if (billingCycle === 'yearly') {
    endDate.setFullYear(endDate.getFullYear() + 1);
  }
  return endDate;
}
