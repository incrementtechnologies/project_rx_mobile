/**
 * TEST DATA FOR PRODUCT THUMBNAILS
 */

const mainFeaturedProduct = {
  id: 0,
  title: 'Whopper Jr.',
  img_url: 'i.ytimg.com/vi/SI9lBmIhYDs/maxresdefault.jpg'
}

const featuredProducts = [
  {
    id: 0,
    text: 'Deals up to 50% OFF',
    img_url:
      'd1sag4ddilekf6.cloudfront.net/compressed/merchants/2-CY6UPAMWNB3KUA/hero/8d1709e4b3154a729f331433c97432ac_1579168237757907381.jpeg',
  },
  {
    id: 1,
    text: 'Barkada Meals!',
    img_url:
      'www.sunstar.com.ph/uploads/images/2019/11/12/190406.jpg',
  },
  {
    id: 2,
    text: 'New Shops!',
    img_url:
      'www.balambanliempo.com/assets/images/2-676x450-676x450.jpg',
  },
  {
    id: 3,
    text: 'Deals up to 50% OFF',
    img_url:
      'd1sag4ddilekf6.cloudfront.net/compressed/merchants/2-CY6UPAMWNB3KUA/hero/8d1709e4b3154a729f331433c97432ac_1579168237757907381.jpeg',
  },
  {
    id: 4,
    text: 'Barkada Meals!',
    img_url:
      'www.sunstar.com.ph/uploads/images/2019/11/12/190406.jpg',
  },
]

const promo = {
  heading: 'Express your love with Runway Express.',
  caption: 'Refer 5 friends and get a ₱100 coupon on us!'
}

const products = [
  {
    id: 0,
    title: 'Minute Burger - Tres De Abril',
    tags: ['Filipino', 'Burgers', 'Quick Bites'],
    distance: 1.7,
    img_url:
      'd1sag4ddilekf6.cloudfront.net/compressed/merchants/2-CY6UPAMWNB3KUA/hero/8d1709e4b3154a729f331433c97432ac_1579168237757907381.jpeg',
    ratings: {
      avg: 5.0,
      total: 786
    },
    promo: ['25% OFF', 'FREE DELIVERY'],
    price:150,
  },
  {
    id: 1,
    title: 'The Neighborhood Cafe - Banawa',
    tags: ['Asian', 'Coffee & Tea', 'Beverages'],
    distance: 1.9,
    img_url:
      'www.sunstar.com.ph/uploads/images/2019/11/12/190406.jpg',
    ratings: {
      avg: 4.9,
      total: 302
    },
    promo: ['25% OFF'],
    price:200,
  },
  {
    id: 2,
    title: 'Balamban Liempo - Punta Princesa',
    tags: ['Filipino', 'City Choices', 'Meat'],
    distance: 2.1,
    img_url:
      'www.balambanliempo.com/assets/images/2-676x450-676x450.jpg',
    ratings: {
      avg: 4.5,
      total: 1003
    },
    promo: ['FREE DELIVERY'],
    price:300,
  },
  {
    id: 3,
    title: 'Pungko-Pungko sa Punta - Punta Princesa',
    tags: ['Filipino', 'Street Food', 'Quick Bites'],
    distance: 2.3,
    img_url:
      'res.cloudinary.com/dvlzsjbb9/image/upload/v1594141565/64faeaf5715a4e10871b029de577d93f_1580720411412861278_uc77it.jpg',
    ratings: {
      avg: 4.5,
      total: 10
    },
    promo: [],
    price:400,
  }
]

export {
  mainFeaturedProduct,
  featuredProducts,
  promo,
  products,
}