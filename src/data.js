// ─────────────────────────────────────────────────────────────
// Mock data for the Wild Flora Blooms redesign mockup.
// Prices, sessions, enquiries and fees are illustrative only.
// ─────────────────────────────────────────────────────────────

// Photography — the client's own photos, served from the live site's image CDN.
// Before launch, download these into /public/images and point `src` at them.
// Entries with src: null show a tonal placeholder plus the shot brief.
const SC = 'https://static.showit.co'
const img = (path, size = 1200) => `${SC}/${size}/${path}`

export const LOGO = img('lV6ZGONC7pk5hGPmbdRf4w/shared/wild_flora_print_transparent.png', 800)

export const photos = {
  lora:        { src: img('UWTZwWkYD515eUSh8_DWfA/shared/751f1d42-88fc-4ffb-9440-37a4be8fd86e.jpg', 800), alt: 'Lora from Wild Flora Blooms, a Coogee florist specialising in seasonal flowers', shot: 'Lora portrait', tones: ['#A9B08E', '#F2F0EC', '#7B2E3E', '#5E7A3E'] },
  // Weddings
  w1:  { src: img('OWAL2WugyI9D6fMrTqxrXw/shared/4bdbd658-2d4f-41b1-b785-26c3283405e3.jpg'), alt: 'Bride and bridesmaids holding custom wedding bouquets by Wild Flora Blooms, Coogee wedding florist', shot: 'Bridal party', tones: ['#C9C2B6', '#E9C9C3', '#F4EFEA', '#8E9A7A'] },
  w2:  { src: img('6-NyyOtvdr_z_9Me6ULCkg/shared/5efbd7c4-5e99-4fa2-927e-51dfad93d192.jpg'), alt: 'Wedding bouquet with bridal heels, rings and invitations, flowers by Wild Flora Blooms', shot: 'Wedding flat lay', tones: ['#EDE6E0', '#F8F4F0', '#D9B1A8', '#A2AC86'] },
  w3:  { src: img('33seg8GX3cm2DCWDkHqEYA/shared/wild_flora_blooms_7.jpg'), alt: 'Wedding flowers by Wild Flora Blooms', shot: 'Wedding flowers', tones: ['#D7CFC4', '#EBD4CD', '#9AA483', '#F5F0EA'] },
  w4:  { src: img('lv9x6gVlS8uVPqzU8pECRg/shared/1ae5959d-6e67-4e9b-bef2-f2d1c20fa604.jpg'), alt: 'Bride and bridesmaids holding seasonal wedding bouquets by Wild Flora Blooms, Coogee and Perth wedding florist', shot: 'Bridesmaids', tones: ['#B8B2A6', '#E7C8C4', '#F3EEE9', '#7F8C6B'] },
  w5:  { src: img('mhODckkZ1t8jaXzTtpTg7Q/shared/6fddb432-30bb-4d07-a876-e7245d951e64.jpg'), alt: 'Close-up of a bridal bouquet by Wild Flora Blooms', shot: 'Bridal bouquet close-up', tones: ['#E4D9D1', '#F2E1DC', '#C99A90', '#93A07E'] },
  w6:  { src: img('zfChDbpJBUwOn8vHB3sUeA/shared/wild_flora_blooms_9.jpg'), alt: 'Wedding flowers by Wild Flora Blooms', shot: 'Wedding flowers', tones: ['#D3CCC0', '#E8D2CB', '#A2AC86', '#F4EFEA'] },
  w7:  { src: img('tdm3zFUYTdVdjouKOjtA_Q/shared/wild_flora_blooms_6.jpg'), alt: 'Wedding flowers by Wild Flora Blooms', shot: 'Wedding flowers', tones: ['#CFC8BC', '#E5CFC8', '#94A07F', '#F2EDE8'] },
  w8:  { src: img('2VHcyevGMEP8EVMcOSdF9g/shared/wild_flora_blooms_16.jpg'), alt: 'Wedding flowers by Wild Flora Blooms', shot: 'Wedding flowers', tones: ['#D8D1C6', '#EAD5CE', '#9DA785', '#F6F1EC'] },
  w9:  { src: img('WWw3AcEz335VMY52ORlECQ/shared/wild_flora_blooms_5.jpg'), alt: 'Wedding flowers by Wild Flora Blooms', shot: 'Wedding flowers', tones: ['#D1CABF', '#E6D0C9', '#97A281', '#F3EEE9'] },
  w10: { src: img('j0eHI-xzbTgQ8rvsCMHXwQ/shared/dcc8b390-4d97-4862-b6ba-267d7be1c114.jpg'), alt: 'Wedding flowers by Wild Flora Blooms', shot: 'Wedding flowers', tones: ['#D6CFC4', '#E9D3CC', '#9BA583', '#F5F0EB'] },
  w11: { src: img('XFxjMKb7GGdZWu7XFcABSQ/shared/edae0d0e-5cdd-49f7-8fef-fd55d5c82d3a.jpg'), alt: 'Wedding flowers by Wild Flora Blooms', shot: 'Wedding flowers', tones: ['#D4CDC2', '#E7D1CA', '#99A382', '#F4EFEA'] },
  w12: { src: img('LFLZC42AjeH-fJLNz5xkHA/shared/b5309d28-6a8b-4feb-8a24-3a8a74166c3a.jpg'), alt: 'Wedding flowers by Wild Flora Blooms', shot: 'Wedding flowers', tones: ['#D2CBC0', '#E8D2CB', '#98A281', '#F3EEE9'] },
  // Seasonal arrangements
  s1:  { src: img('pzHbn8DRFogN54y6VVWSMA/shared/081e74a4-e9b2-404a-a87a-3866aff7bb64.jpg'), alt: 'Seasonal flower arrangement by Wild Flora Blooms, Coogee florist using locally grown blooms', shot: 'Seasonal arrangement', tones: ['#D8C9B6', '#E9B9A6', '#F4ECE2', '#8B9A7C'] },
  s2:  { src: img('XGB_1I5U9JGQpFz_G79v8A/shared/wild_flora_blooms_15.jpg'), alt: 'Seasonal bouquet by Wild Flora Blooms, Coogee florist', shot: 'Seasonal bouquet', tones: ['#D5C4B0', '#E4B3A0', '#F2E8DE', '#86967A'] },
  s3:  { src: img('TSS9LIpnGZeRHW6sd_WSxw/shared/22421ce2-0bc1-4731-9791-5e530a32a8ba_1.jpg'), alt: 'Seasonal bouquet by Wild Flora Blooms, Coogee florist', shot: 'Seasonal bouquet', tones: ['#DCCDBA', '#EDBFAD', '#F5EEE5', '#8E9D7F'] },
  s4:  { src: img('XHN8ARXRJnJfLCQe9tL0NQ/shared/wild_flora_blooms_8.jpg'), alt: 'Seasonal bouquet by Wild Flora Blooms, Coogee florist', shot: 'Seasonal bouquet', tones: ['#D3C2AE', '#E2B19E', '#F1E7DC', '#84947A'] },
  s5:  { src: img('8qaYKVByyCj7TqjtOyDg7w/shared/f04eb2a5-4a27-41f1-aeef-f6b91050e6fe.jpg'), alt: 'Seasonal bouquet by Wild Flora Blooms, Coogee florist', shot: 'Seasonal bouquet', tones: ['#D9CAB7', '#EABCA9', '#F4EDE4', '#8A997B'] },
  s6:  { src: img('Z_XoPPT4GRpJtE9YVbe_CA/shared/8ecd7b64-b787-499d-ae6e-5999d2e3b9b8.jpg'), alt: 'Seasonal bouquet by Wild Flora Blooms, Coogee florist', shot: 'Seasonal bouquet', tones: ['#D6C6B2', '#E7B6A3', '#F3EAE0', '#88987B'] },
  s7:  { src: img('chejtFsHdGzkhfYfQwXvug/shared/9935b6ef-448c-4122-a42e-310bd3dbda89.jpg'), alt: 'Seasonal bouquet by Wild Flora Blooms, Coogee florist', shot: 'Seasonal bouquet', tones: ['#DBCCB9', '#ECBEAC', '#F5EEE6', '#8C9B7D'] },
  s8:  { src: img('e94BX47zaUtmwPvfCgcRIA/shared/wild_flora_blooms_11.jpg'), alt: 'Seasonal bouquet by Wild Flora Blooms, Coogee florist', shot: 'Seasonal bouquet', tones: ['#D4C3AF', '#E3B29F', '#F2E9DE', '#85957A'] },
  s9:  { src: img('pYnI9Sqzl_KUhpSmMzuHVQ/shared/86fe1554-2ab4-40e8-9718-988ee202dcea.jpg'), alt: 'Seasonal bouquet by Wild Flora Blooms, Coogee florist', shot: 'Seasonal bouquet', tones: ['#DACBB8', '#EBBDAB', '#F5EDE4', '#8B9A7C'] },
  s10: { src: img('s-3-YKTlhe1LZVUasLOXNg/shared/85da20f4-562d-43e3-86d3-86467944aaab.jpg'), alt: 'Seasonal bouquet by Wild Flora Blooms, Coogee florist', shot: 'Seasonal bouquet', tones: ['#D7C7B3', '#E8B7A4', '#F3EBE1', '#89997B'] },
  s11: { src: img('PaAxAnYkS4TBy43swWx3XA/shared/43216749-639b-4b79-a016-ce8fb5ae6465.jpg'), alt: 'Seasonal bouquet by Wild Flora Blooms, Coogee florist', shot: 'Seasonal bouquet', tones: ['#D9C9B5', '#E9BAA7', '#F4ECE3', '#8A997C'] },
  s12: { src: `${SC}/1200/bw1e9hbl0VOmqYAEU1JKsg/343812/wild_flora_blooms_4.jpg`, alt: 'Seasonal bouquet by Wild Flora Blooms, Coogee florist', shot: 'Seasonal bouquet', tones: ['#D5C5B1', '#E6B5A2', '#F2E9DF', '#87977A'] },
  // Events & workshops
  e1:  { src: img('omif4s20m6i4Ou3IVyEPxQ/shared/478d8b7f-87be-4b61-86dd-c590b1c6aeb6.jpg'), alt: 'Wedding table centrepieces by Wild Flora Blooms, Coogee wedding and event florist', shot: 'Table centrepieces', tones: ['#BDB5A8', '#E3C7BE', '#8C9878', '#F1ECE6'] },
  e2:  { src: img('TK_qU8PtHP-tgnn0BiLSpQ/shared/wild_flora_blooms_2.jpg'), alt: 'Flower crown created by Wild Flora Blooms for workshops and special events', shot: 'Flower crown', tones: ['#6F7D4E', '#E3B5B0', '#F1D7CF', '#A3A57A'] },
  e3:  { src: img('wZk9iwd5obVecCWvcamSmw/shared/60961ee3-c5cd-4a7c-be29-5629f6c670e4.jpg'), alt: 'Event table floral arrangements by Wild Flora Blooms, Coogee florist', shot: 'Event tables', tones: ['#C7C0B4', '#E8A887', '#F2ECE5', '#8E9A79'] },
  e4:  { src: img('dbpII0SOYMhnHGMlqqh7Sg/shared/wild_flora_blooms_18.jpg'), alt: 'Wrist corsage for a formal event by Wild Flora Blooms, Coogee and Perth florist', shot: 'Wrist corsage', tones: ['#D9D1C7', '#EBC9C2', '#A2AC86', '#F6F1EC'] },
  e5:  { src: img('XM0tMKoUSQRgFPjwJ2kmNQ/shared/wild_flora_blooms_10.jpg'), alt: 'Arbour floral arrangement by Wild Flora Blooms for ceremony styling', shot: 'Ceremony arbour', tones: ['#B8B0A3', '#E7C6C5', '#F3EEE8', '#7D8B68'] },
  e6:  { src: img('mxn6xID39dfyu4YJdPpCgQ/shared/ad7c4c96-3711-47ea-9065-817ed1f0b72d.jpg'), alt: 'Floral wreath created at a workshop by Wild Flora Blooms, Perth florist', shot: 'Workshop wreath', tones: ['#E4DFD9', '#B5462F', '#E79C4A', '#6C7B48'] },
  e7:  { src: img('_9Hp9Wol4B_lzzZZ7YsVdw/shared/c3881f9a-4fa2-468f-abd4-a3dc3a6395c4.jpg'), alt: 'Seasonal floral arrangement by Wild Flora Blooms using locally grown blooms', shot: 'Seasonal arrangement', tones: ['#D3C3AF', '#E6B4A1', '#F2E9DF', '#86967A'] },
  e8:  { src: img('8OVSKK4lK5Zow-XmMpI8Gw/shared/b18f5828-d148-4992-a782-00fbb3227d1d.jpg'), alt: 'Floral gift box by Wild Flora Blooms featuring seasonal, locally grown flowers', shot: 'Floral gift box', tones: ['#E3D6CC', '#E9B3A8', '#F5EEE8', '#93A07E'] },
  e9:  { src: img('u0RMnj2hDcWYmDZaKrNZtw/shared/1fd62bb0-6979-48e7-835f-9cb92d66e1f0.jpg'), alt: 'Floral wreath created at a workshop by Wild Flora Blooms, Perth florist', shot: 'Workshop wreath', tones: ['#7A2F2A', '#F1F0EB', '#D9D6CD', '#6B7B4C'] },
  e10: { src: img('waxquc0ofa2NGqlGVP_O-g/shared/a814454b-02b5-40d0-a3a6-4184d1b8773e.jpg'), alt: 'Floral wreath created at a workshop by Wild Flora Blooms, Perth florist', shot: 'Workshop wreath', tones: ['#E6E1DA', '#BF5A35', '#E4A04F', '#62723F'] },
  e11: { src: img('wBUG5n3in-GTrUhiGsVOMw/shared/16ecf856-34b2-4ff2-9d0e-da521b92edaa.jpg'), alt: 'Floral wreath created at a workshop by Wild Flora Blooms, Perth florist', shot: 'Workshop wreath', tones: ['#E3DED6', '#B9523A', '#E2A156', '#67773F'] },
  // No photo yet — studio to supply
  orchid:      { src: null, shot: 'Phalaenopsis orchid in a ceramic pot', tones: ['#E4E2DA', '#FBF8F3', '#B5BDA8', '#D7C3CC'] },
  orchidWhite: { src: null, shot: 'White Phalaenopsis, close crop', tones: ['#ECEAE2', '#FFFFFF', '#C2CAB7', '#E2D2D8'] },
  native:      { src: null, shot: 'Native bouquet with banksia, kangaroo paw and gum', tones: ['#7B7656', '#C9733F', '#E1C690', '#55634A'] },
  voucher:     { src: null, shot: 'Gift voucher card tucked into a posy', tones: ['#EBD8D0', '#F7EEE9', '#C79A8E', '#A2AC94'] },
}

export const galleries = {
  wedding: ['w1', 'w2', 'w3', 'w4', 'w5', 'w6', 'w7', 'w8', 'w9', 'w10', 'w11', 'w12'],
  events: ['e1', 'e2', 'e3', 'e4', 'e5', 'e6', 'e7', 'e8', 'e9', 'e10', 'e11'],
  seasonal: ['s1', 's2', 's3', 's4', 's5', 's6', 's7', 's8', 's9', 's10', 's11', 's12'],
}

export const categories = [
  { id: 'seasonal', name: 'Seasonal Bouquets', blurb: 'Locally grown blooms that reflect the season', photo: 's1' },
  { id: 'native', name: 'Native Bouquets', blurb: 'Australian natives, gathered loosely', photo: 'native' },
  { id: 'plants', name: 'Phalaenopsis Orchids', blurb: 'Potted orchids that flower for months', photo: 'orchid' },
  { id: 'christmas', name: 'Christmas Wreaths', blurb: 'Ready-made wreaths, made by hand', photo: 'e6' },
]

export const products = [
  {
    id: 'seasonal-posy', name: 'Seasonal Posy', category: 'seasonal', photo: 's2', gallery: ['s2', 's5', 's9'],
    short: 'A small, hand-tied posy of the week’s best locally grown stems.',
    description: 'A sweet, hand-tied posy that changes with the season. Lora chooses a handful of locally grown stems that are looking their best that week and ties them loosely with garden greenery, wrapped and finished with ribbon.',
    sizes: [{ label: 'Small', price: 65 }, { label: 'Medium', price: 85 }, { label: 'Large', price: 110 }],
    stock: 'in', tag: 'Changes weekly',
  },
  {
    id: 'seasonal-bouquet', name: 'Seasonal Bouquet', category: 'seasonal', photo: 's1', gallery: ['s1', 's3', 's7'],
    short: 'Our signature garden-style bouquet. Natural, textured and full of movement.',
    description: 'Fresh bouquets created using locally sourced blooms that reflect the colours and textures of the current season. Designed in a loose, natural style so it looks just as lovely in the vase as it does in hand.',
    sizes: [{ label: 'Small', price: 120 }, { label: 'Medium', price: 150 }, { label: 'Large', price: 195 }],
    stock: 'in', tag: 'Most loved',
  },
  {
    id: 'floral-gift-box', name: 'Floral Gift Box', category: 'seasonal', photo: 'e8', gallery: ['e8', 's4', 's6'],
    short: 'Seasonal flowers arranged in a keepsake gift box. No vase needed.',
    description: 'A floral gift box filled with seasonal, locally grown flowers, arranged to sit straight on a table or bench. A lovely option for birthdays, thank-yous and new arrivals.',
    sizes: [{ label: 'Standard', price: 95 }, { label: 'Generous', price: 135 }],
    stock: 'in', tag: 'Ready to display',
  },
  {
    id: 'native-bouquet', name: 'Native Bouquet', category: 'native', photo: 'native', gallery: ['native', 's8', 's10'],
    short: 'Banksia, kangaroo paw, gum and whatever native is flowering now.',
    description: 'An earthy bouquet of Australian natives: sculptural banksia and protea, kangaroo paw, silver gum and native grasses. Natives are long-lasting and many dry beautifully in the vase.',
    sizes: [{ label: 'Small', price: 95 }, { label: 'Medium', price: 125 }, { label: 'Large', price: 160 }],
    stock: 'in', tag: 'Long vase life',
  },
  {
    id: 'native-posy', name: 'Native Posy', category: 'native', photo: 'native', gallery: ['native'],
    short: 'A smaller gathering of natives and seasonal foliage.',
    description: 'All the texture of our native bouquet in a smaller, hand-tied posy. Easy to gift and easy to place on a desk or bedside table.',
    sizes: [{ label: 'Posy', price: 70 }],
    stock: 'in', tag: 'Native',
  },
  {
    id: 'phalaenopsis-orchid', name: 'Phalaenopsis Orchid', category: 'plants', photo: 'orchid', gallery: ['orchid', 'orchidWhite'],
    short: 'An elegant moth orchid in a ceramic pot. Flowers for months with little fuss.',
    description: 'Phalaenopsis are the easiest orchids to live with. Delivered potted in a simple ceramic with a care card. Keep in bright, indirect light and water lightly once a week and the flowers can last for months.',
    sizes: [{ label: 'Single stem', price: 85 }, { label: 'Double stem', price: 120 }],
    stock: 'low', tag: 'Plant',
  },
  {
    id: 'christmas-wreath', name: 'Christmas Wreath', category: 'christmas', photo: 'e6', gallery: ['e6', 'e10', 'e11'],
    short: 'Ready-made door wreath of foliage, seasonal blooms and dried accents.',
    description: 'Made by hand in the studio on a natural base, with layers of fresh foliage, seasonal flowers and dried accents, finished with a ribbon for hanging. The greenery dries gracefully, so it will see you through the festive season.',
    sizes: [{ label: '40 cm', price: 110 }, { label: '55 cm', price: 145 }],
    stock: 'in', tag: 'Seasonal',
  },
  {
    id: 'christmas-wreath-white', name: 'Soft White Christmas Wreath', category: 'christmas', photo: 'e9', gallery: ['e9', 'e6', 'e11'],
    short: 'A softer wreath in whites and greens for a classic front door.',
    description: 'The same hand-made wreath in a palette of soft whites and greens. Finished with a natural ribbon for hanging.',
    sizes: [{ label: '40 cm', price: 110 }, { label: '55 cm', price: 145 }],
    stock: 'low', tag: 'Seasonal',
  },
]

export const featuredIds = ['seasonal-bouquet', 'seasonal-posy', 'native-bouquet', 'phalaenopsis-orchid', 'christmas-wreath']

export const testimonials = [
  { names: 'Julia and Lewis', text: 'I honestly couldn’t have asked for a more incredible wedding florist than Wild Flora Blooms. From the very beginning, Lora was so warm, professional, and easy to communicate with. She really took the time to understand my vision and brought it to life even more beautifully than I imagined. Lora’s creativity, attention to detail, and passion for what she does truly shines through in her work. I felt completely confident leaving everything in her hands, and she delivered above and beyond. I’m so grateful for the role she played in making our day so special. I would recommend Wild Flora Blooms to anyone without hesitation.' },
  { names: 'Laura and Tom', text: 'Lora went out of her way to make sure my vision was captured in her designs. The flowers held up for days after the wedding. She was flexible, approachable and easy to talk to about my bouquets. We had added boutonnieres at the last minute and Lora was happy to put them together to match the bridesmaids. Everything was amazing, thank you for making my day special and perfect. She was always honest, responsive, and very professional which made my day super easy.' },
  { names: 'Georgia and Chris', text: 'My husband and I had such a wonderful experience with Lora! From the very beginning, she was incredibly attentive and thoughtful. She took the time to call and check in on our colour palette and really took the time to understand the overall vision for our day. Lora offered fantastic ideas and suggestions that elevated everything beyond what we had imagined, while still staying true to the style we wanted. On the big day, she delivered everything right on time and set up the flowers beautifully. Every arrangement looked stunning and perfectly brought the whole wedding together. We would highly recommend her to anyone looking for a talented and reliable florist!' },
]

export const contact = {
  phone: '0407 219 797', tel: '0407219797', email: 'wildflorablooms@gmail.com',
  hours: 'Monday to Friday, 9am to 5pm', area: 'Coogee, just south of Perth',
  instagram: 'https://www.instagram.com/wildflorablooms/', facebook: 'https://www.facebook.com/profile.php?id=61572138651906',
}

export const addOns = [
  { id: 'card', label: 'Hand-written card', price: 0 },
  { id: 'vase', label: 'Add a glass vase', price: 25 },
  { id: 'chocolate', label: 'Add chocolates', price: 18 },
]

export const workshops = [
  {
    id: 'wreath', title: 'Wreath Making Workshop', photo: 'e10', price: 145, duration: '2.5 hours',
    summary: 'Build your own seasonal wreath with Lora, using fresh foliage, flowers and dried accents.',
    details: 'All materials, tools and the wreath base are provided. You will learn how to layer foliage and blooms so your wreath holds its shape as it dries. Perfect for the lead-up to Christmas.',
    sessions: [
      { id: 'wr-1', date: '2026-11-28', time: '10:00 am to 12:30 pm', capacity: 10, booked: 10 },
      { id: 'wr-2', date: '2026-12-05', time: '10:00 am to 12:30 pm', capacity: 10, booked: 8 },
      { id: 'wr-3', date: '2026-12-12', time: '2:00 pm to 4:30 pm', capacity: 10, booked: 3 },
    ],
  },
  {
    id: 'bouquet', title: 'Create Your Own Bouquet', photo: 's3', price: 125, duration: '2 hours',
    summary: 'Learn to build a hand-tied bouquet from locally grown, seasonal stems, then take it home.',
    details: 'We cover conditioning, choosing stems and the spiral technique Lora uses for every bouquet. Flowers, tools and wrapping are all included.',
    sessions: [
      { id: 'bq-1', date: '2027-01-17', time: '10:00 am to 12:00 pm', capacity: 10, booked: 9 },
      { id: 'bq-2', date: '2027-02-07', time: '10:00 am to 12:00 pm', capacity: 10, booked: 2 },
    ],
  },
  {
    id: 'crown', title: 'Flower Crown Workshop', photo: 'e2', price: 95, duration: '1.5 hours',
    summary: 'Make a fresh flower crown, a favourite for hens parties and birthdays.',
    details: 'A relaxed, social session. Lora guides you through wiring and taping each bloom so your crown is comfortable and lasts through the celebration.',
    sessions: [
      { id: 'fc-1', date: '2027-02-21', time: '11:00 am to 12:30 pm', capacity: 12, booked: 12 },
      { id: 'fc-2', date: '2027-03-07', time: '11:00 am to 12:30 pm', capacity: 12, booked: 5 },
    ],
  },
]

export const voucherAmounts = [50, 75, 100, 150, 200]

// Store settings the studio would configure. Values shown in the UI
// as clearly marked demo/placeholder values.
export const storeConfig = {
  deliveryFeeDemo: 15,
  cutoffTime: null, // e.g. '11:00 am' — set by the studio
  deliveryDays: null, // e.g. 'Monday to Saturday'
}

export const enquiries = [
  { id: 'ENQ-1042', name: 'Charlotte Nguyen', email: 'charlotte@example.com', phone: '04XX XXX XXX', date: '2027-03-20', venue: 'Venue to be confirmed', guests: 120, budget: '$5,000 to $8,000', requirements: ['Bridal bouquet', 'Bridesmaids (4)', 'Ceremony arbour', 'Table centrepieces'], notes: 'Loving soft blush and white with lots of greenery. Outdoor ceremony.', received: '2026-11-14', quote: 'not-started', followUp: 'due', stage: 2 },
  { id: 'ENQ-1041', name: 'Priya & Tom', email: 'priya.t@example.com', phone: '04XX XXX XXX', date: '2027-02-13', venue: 'Winery (name supplied)', guests: 80, budget: '$3,000 to $5,000', requirements: ['Bridal bouquet', 'Buttonholes (6)', 'Bud vases'], notes: 'Would love natives, especially banksia and gum.', received: '2026-11-12', quote: 'draft', followUp: 'none', stage: 4 },
  { id: 'ENQ-1039', name: 'Hannah Morris', email: 'hannah.m@example.com', phone: '04XX XXX XXX', date: '2027-04-10', venue: 'Private property', guests: 150, budget: '$8,000+', requirements: ['Full styling', 'Hanging installation', 'Ceremony arbour'], notes: 'Large marquee, evening reception.', received: '2026-11-06', quote: 'sent', followUp: 'overdue', stage: 6 },
  { id: 'ENQ-1036', name: 'Lucy Bennett', email: 'lucy.b@example.com', phone: '04XX XXX XXX', date: '2027-01-23', venue: 'City restaurant', guests: 40, budget: '$1,500 to $3,000', requirements: ['Bridal bouquet', 'Table posies'], notes: 'Small and relaxed.', received: '2026-10-30', quote: 'accepted', followUp: 'none', stage: 8, invoice: 'awaiting' },
  { id: 'ENQ-1031', name: 'Sophie & Ari', email: 'sophie.ari@example.com', phone: '04XX XXX XXX', date: '2026-12-19', venue: 'Beachside venue', guests: 95, budget: '$5,000 to $8,000', requirements: ['Bridal party', 'Arbour', 'Centrepieces'], notes: '', received: '2026-10-12', quote: 'accepted', followUp: 'none', stage: 9, invoice: 'paid' },
  { id: 'ENQ-1028', name: 'Grace Whitfield', email: 'grace.w@example.com', phone: '04XX XXX XXX', date: '2027-05-08', venue: 'Garden venue', guests: 60, budget: '$3,000 to $5,000', requirements: ['Bridal bouquet', 'Ceremony florals'], notes: 'Following up after seeing workshop.', received: '2026-10-05', quote: 'sent', followUp: 'scheduled', stage: 6 },
]

export const workflowSteps = [
  'Customer submits enquiry',
  'Details captured',
  'Owner reviews',
  'Quote prepared in Xero',
  'Quote sent to customer',
  'Follow-up reminders',
  'Customer accepts',
  'Invoice generated in Xero',
  'Payment tracked',
]

export const fmt = (n) => `$${Number(n).toFixed(n % 1 ? 2 : 0)}`
export const fmt2 = (n) => `$${Number(n).toFixed(2)}`
export const niceDate = (iso, opts = { weekday: 'short', day: 'numeric', month: 'short' }) =>
  new Date(iso + 'T00:00:00').toLocaleDateString('en-AU', opts)
