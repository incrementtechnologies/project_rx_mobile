/**
 * TEST DATA FOR PRODUCT THUMBNAILS
 */

const mainFeaturedProduct = {
  id: 0,
  merchant_id: 0,
  title: 'Whopper Jr.',
  img_url: 'i.ytimg.com/vi/SI9lBmIhYDs/maxresdefault.jpg'
}

const featuredProducts = [
  {
    id: 0,
    merchant_id: 0,
    text: 'Deals up to 50% OFF',
    img_url:
      'd1sag4ddilekf6.cloudfront.net/compressed/merchants/2-CY6UPAMWNB3KUA/hero/8d1709e4b3154a729f331433c97432ac_1579168237757907381.jpeg',
  },
  {
    id: 1,
    merchant_id: 1,
    text: 'Barkada Meals!',
    img_url:
      'www.sunstar.com.ph/uploads/images/2019/11/12/190406.jpg',
  },
  {
    id: 2,
    merchant_id: 0,
    text: 'New Shops!',
    img_url:
      'www.balambanliempo.com/assets/images/2-676x450-676x450.jpg',
  },
  {
    id: 3,
    merchant_id: 1,
    text: 'Deals up to 50% OFF',
    img_url:
      'd1sag4ddilekf6.cloudfront.net/compressed/merchants/2-CY6UPAMWNB3KUA/hero/8d1709e4b3154a729f331433c97432ac_1579168237757907381.jpeg',
  },
  {
    id: 4,
    merchant_id: 0,
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
    merchant_id: 0,
    title: 'Minute Burger - Tres De Abril',
    tags: ['Filipino', 'Burgers', 'Quick Bites'],
    distance: 1.7,
    price: 450,
    img_url: 'd1sag4ddilekf6.cloudfront.net/compressed/merchants/2-CY6UPAMWNB3KUA/hero/8d1709e4b3154a729f331433c97432ac_1579168237757907381.jpeg',
    video_url: 'd1sag4ddilekf6.cloudfront.net/compressed/merchants/2-CY6UPAMWNB3KUA/hero/8d1709e4b3154a729f331433c97432ac_1579168237757907381.jpeg',
    png_img_url: 'jollibeeusa.com/wp-content/uploads/2019/03/lgchickjoy.png',
    ratings: {
      avg: 5.0,
      total: 786
    },
    delivery_time: 15,
    promo: ['25% OFF', 'FREE DELIVERY']
  },
  {
    id: 1,
    merchant_id: 1,
    title: 'The Neighborhood Cafe - Banawa',
    tags: ['Asian', 'Coffee & Tea', 'Beverages'],
    distance: 1.9,
    price: 720,
    img_url: 'www.sunstar.com.ph/uploads/images/2019/11/12/190406.jpg',
    video_url: null,
    png_img_url: 'freepikpsd.com/wp-content/uploads/2019/10/chickenjoy-png-2.png',
    ratings: {
      avg: 4.9,
      total: 302
    },
    delivery_time: 7,
    promo: ['25% OFF']
  },
  {
    id: 2,
    merchant_id: 0,
    title: 'Balamban Liempo - Punta Princesa',
    tags: ['Filipino', 'City Choices', 'Meat'],
    distance: 2.1,
    price: 622,
    img_url: 'www.balambanliempo.com/assets/images/2-676x450-676x450.jpg',
    video_url: 'www.balambanliempo.com/assets/images/2-676x450-676x450.jpg',
    png_img_url: 'jollibeeusa.com/wp-content/uploads/2018/11/2pc1side.png',
    ratings: {
      avg: 4.5,
      total: 1003
    },
    delivery_time: 25,
    promo: ['FREE DELIVERY']
  },
  {
    id: 3,
    merchant_id: 1,
    title: 'Pungko-Pungko sa Punta - Punta Princesa',
    tags: ['Filipino', 'Street Food', 'Quick Bites'],
    distance: 2.3,
    price: 90,
    img_url: 'res.cloudinary.com/dvlzsjbb9/image/upload/v1594141565/64faeaf5715a4e10871b029de577d93f_1580720411412861278_uc77it.jpg',
    video_url: null,
    png_img_url: 'jollibeeusa.com/wp-content/uploads/2018/11/2pccjsp.png',
    ratings: {
      avg: 4.5,
      total: 10
    },
    delivery_time: 5,
    promo: []
  }
]

const merchants = [
  {
    id: 0,
    name: 'Jollibee - Mandaue Jollibee',
    address: 'Mandaue City, Cebu',
    logo: 'https://cdn.vox-cdn.com/thumbor/oskH-S7kDoBoj17N8fACeGhD8J8=/0x0:1000x1081/1200x800/filters:focal(212x166:372x326)/cdn.vox-cdn.com/uploads/chorus_image/image/65971728/Jollibee.0.jpg',
    distance: 2.3,
    ratings: {
      avg: 4,
      totalReviews: 306
    },
    delivery_time: 15,
    tags: ['Filipino', 'Chicken', 'Fast Food'],
    merchant_products: [
      { category: 'Bucket Meals', products },
      { category: 'Chicken Joy', products },
      { category: 'Yumburger', products },
      { category: 'Family Favorites', products },
    ]
  },
  {
    id: 1,
    name: 'Chowking - IT Park',
    address: 'Cebu IT Park',
    logo: 'https://images.summitmedia-digital.com/spotph/images/articles/2016/chowking.jpg',
    distance: 0.7,
    ratings: {
      avg: 4.5,
      totalReviews: 239
    },
    delivery_time: 25,
    tags: ['Fast Food', 'Chicken', 'Quick Bites'],
    merchant_products: [
      { category: 'Bucket Meals', products },
      { category: 'Chicken Joy', products },
      { category: 'Yumburger', products },
      { category: 'Family Favorites', products },
    ]
  },
  {
    id: 2,
    name: 'Jollibee - Banilad Cebu',
    address: 'Banilad, Cebu',
    logo: 'https://cdn.vox-cdn.com/thumbor/oskH-S7kDoBoj17N8fACeGhD8J8=/0x0:1000x1081/1200x800/filters:focal(212x166:372x326)/cdn.vox-cdn.com/uploads/chorus_image/image/65971728/Jollibee.0.jpg',
    distance: 5,
    ratings: {
      avg: 4.9,
      totalReviews: 706
    },
    delivery_time: 15,
    tags: ['Filipino', 'Chicken', 'Fast Food'],
    merchant_products: [
      { category: 'Bucket Meals', products },
      { category: 'Chicken Joy', products },
      { category: 'Yumburger', products },
      { category: 'Family Favorites', products },
    ]
  },
  {
    id: 3,
    name: 'Chowking - Ayala Center',
    address: 'Ayala Center',
    logo: 'https://images.summitmedia-digital.com/spotph/images/articles/2016/chowking.jpg',
    distance: 1.7,
    ratings: {
      avg: 4.6,
      totalReviews: 1301
    },
    delivery_time: 25,
    tags: ['Fast Food', 'Chicken', 'Quick Bites'],
    merchant_products: [
      { category: 'Bucket Meals', products },
      { category: 'Chicken Joy', products },
      { category: 'Yumburger', products },
      { category: 'Family Favorites', products },
    ]
  }
]

const UserLocation = {
  latitude: 10.3500708,
  longitude: 123.9155313
}

export {
  mainFeaturedProduct,
  featuredProducts,
  promo,
  products,
  merchants,
  UserLocation
}