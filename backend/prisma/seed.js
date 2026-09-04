const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main(){
  await prisma.eMIPlan.deleteMany();
  await prisma.variant.deleteMany();
  await prisma.product.deleteMany();

  const products = [
    {
      name: 'Apple iPhone 17 Pro',
      slug: 'iphone-17-pro',
      description: 'Flagship iPhone',
      variants: [
        {
          name: '256 GB / Silver',
          mrp: 129900,
          price: 119900,
          imageUrl: 'https://via.placeholder.com/400x400?text=iPhone+17+Pro+256',
          emiPlans: [
            { tenureMonths: 3, monthlyAmount: 39967, interestRate: 0, cashback: null, isZeroInterest: true },
            { tenureMonths: 12, monthlyAmount: 9992, interestRate: 10.5, cashback: '₹1000', isZeroInterest: false }
          ]
        },
        {
          name: '512 GB / Graphite',
          mrp: 149900,
          price: 139900,
          imageUrl: 'https://via.placeholder.com/400x400?text=iPhone+17+Pro+512',
          emiPlans: [
            { tenureMonths: 6, monthlyAmount: 23317, interestRate: 0, cashback: null, isZeroInterest: true },
            { tenureMonths: 12, monthlyAmount: 11658, interestRate: 8.5, cashback: '₹1500', isZeroInterest: false }
          ]
        }
      ]
    },
    {
      name: 'Samsung S24 Ultra',
      slug: 'samsung-s24-ultra',
      description: 'Samsung flagship',
      variants: [
        {
          name: '256 GB / Phantom Black',
          mrp: 119999,
          price: 109999,
          imageUrl: 'https://via.placeholder.com/400x400?text=Samsung+S24+256',
          emiPlans: [
            { tenureMonths: 3, monthlyAmount: 36666, interestRate: 0, cashback: null, isZeroInterest: true },
            { tenureMonths: 12, monthlyAmount: 9166, interestRate: 9.5, cashback: '₹500', isZeroInterest: false }
          ]
        },
        {
          name: '512 GB / Titanium',
          mrp: 139999,
          price: 129999,
          imageUrl: 'https://via.placeholder.com/400x400?text=Samsung+S24+512',
          emiPlans: [
            { tenureMonths: 6, monthlyAmount: 21666, interestRate: 0, cashback: null, isZeroInterest: true },
            { tenureMonths: 12, monthlyAmount: 10833, interestRate: 9.0, cashback: '₹800', isZeroInterest: false }
          ]
        }
      ]
    },
    {
      name: 'Google Pixel 9',
      slug: 'google-pixel-9',
      description: 'Google Pixel phone',
      variants: [
        {
          name: '128 GB / Snow',
          mrp: 79999,
          price: 74999,
          imageUrl: 'https://via.placeholder.com/400x400?text=Pixel+9+128',
          emiPlans: [
            { tenureMonths: 3, monthlyAmount: 24999, interestRate: 0, cashback: null, isZeroInterest: true },
            { tenureMonths: 9, monthlyAmount: 8333, interestRate: 7.5, cashback: '₹300', isZeroInterest: false }
          ]
        },
        {
          name: '256 GB / Obsidian',
          mrp: 89999,
          price: 84999,
          imageUrl: 'https://via.placeholder.com/400x400?text=Pixel+9+256',
          emiPlans: [
            { tenureMonths: 6, monthlyAmount: 14166, interestRate: 0, cashback: null, isZeroInterest: true },
            { tenureMonths: 12, monthlyAmount: 7083, interestRate: 6.5, cashback: '₹400', isZeroInterest: false }
          ]
        }
      ]
    }
  ];

  for(const p of products){
    const createdProduct = await prisma.product.create({
      data: {
        name: p.name,
        slug: p.slug,
        description: p.description,
        variants: {
          create: p.variants.map(v => ({
            name: v.name,
            mrp: v.mrp,
            price: v.price,
            imageUrl: v.imageUrl,
            emiPlans: { create: v.emiPlans }
          }))
        }
      },
      include: { variants: { include: { emiPlans: true } } }
    });
    console.log('Created', createdProduct.slug);
  }
}

main()
  .catch(e => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
