const prisma = require('../../../backend/src/prismaClient');

module.exports = async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { slug } = req.query;
    const product = await prisma.product.findUnique({
      where: { slug },
      include: { variants: { include: { emiPlans: true } } }
    });

    if (!product) {
      return res.status(404).json({ error: 'Not found' });
    }

    return res.status(200).json(product);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to load product' });
  }
};