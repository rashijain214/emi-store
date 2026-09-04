const express = require('express');
const router = express.Router();
const prisma = require('../prismaClient');

router.get('/', async (req, res) => {
  const products = await prisma.product.findMany({ select: { id: true, name: true, slug: true } });
  res.json(products);
});

router.get('/:slug', async (req, res) => {
  const { slug } = req.params;
  const product = await prisma.product.findUnique({
    where: { slug },
    include: { variants: { include: { emiPlans: true } } }
  });
  if(!product) return res.status(404).json({ error: 'Not found' });
  res.json(product);
});

module.exports = router;
