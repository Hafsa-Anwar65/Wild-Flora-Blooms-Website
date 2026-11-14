// ─────────────────────────────────────────────────────────────
// Mock data for the Wild Flora Blooms redesign mockup.
// Prices, sessions, enquiries and fees are illustrative only.
// ─────────────────────────────────────────────────────────────

// Photography. Each entry is an art-directed plate: `src` is where the
// studio's own photograph goes (leave null to show the tonal placeholder),
// `shot` is the brief for the photographer, `tones` drive the placeholder.
export const photos = {
  hero:        { src: null, shot: 'Loose garden armful on the studio bench, side light', tones: ['#3A4A3A', '#C98F7E', '#E9D6C4', '#8E9C7C', '#6D3F35'] },
  heroDetail:  { src: null, shot: 'Detail — ranunculus and sweet pea, petals edge-lit', tones: ['#D9C3B4', '#F2E4D8', '#B37C6E', '#A8B396'] },
  catEveryday: { src: null, shot: 'Everyday bouquet wrapped in kraft, held at the door', tones: ['#E3D5C3', '#D4A496', '#F4ECE2', '#8B9A7C'] },
  catSeasonal: { src: null, shot: 'Seasonal stems in a stoneware jug, late afternoon', tones: ['#C9B39A', '#E8C9A8', '#B7714F', '#7E8B6A'] },
  catNative:   { src: null, shot: 'Banksia, kangaroo paw and gum leaves on linen', tones: ['#5B5E46', '#B7643F', '#D7B98A', '#3E4A35'] },
  catPlants:   { src: null, shot: 'White Phalaenopsis orchid in a matte pot by a window', tones: ['#DCDCD0', '#F7F4EE', '#A3AE95', '#C7B7C0'] },
  catXmas:     { src: null, shot: 'Native Christmas wreath hung on a timber door', tones: ['#2E3B2C', '#6E7D5A', '#A6543A', '#C9B58F'] },

  posy:        { src: null, shot: 'Seasonal posy, top-down on ivory paper', tones: ['#EADCCB', '#E2AFA1', '#F6EEE5', '#9DAA8B'] },
  native:      { src: null, shot: 'Native garden bouquet, three-quarter view', tones: ['#7B7656', '#C9733F', '#E1C690', '#55634A'] },
  signature:   { src: null, shot: 'Signature bouquet, tall and loose, against plaster wall', tones: ['#E6D8CA', '#C99486', '#F3E3D7', '#7F8E73', '#A86C5E'] },
  orchid:      { src: null, shot: 'Phalaenopsis orchid, double stem, soft window light', tones: ['#E4E2DA', '#FBF8F3', '#B5BDA8', '#D7C3CC'] },
  wreath:      { src: null, shot: 'Christmas wreath, eucalyptus and dried proteas, flat lay', tones: ['#3C4834', '#7C8A63', '#B86A47', '#D9C6A0'] },
  dried:       { src: null, shot: 'Dried native bunch, paper daisies and grasses', tones: ['#D8C6A6', '#EAD9BB', '#B88A5C', '#A6A07C'] },
  jar:         { src: null, shot: 'Garden roses in a glass jar on a kitchen table', tones: ['#E8D9CF', '#D7A39A', '#F5EAE4', '#9EA88F'] },
  paw:         { src: null, shot: 'Kangaroo paw bunch, tied with cotton ribbon', tones: ['#B05E3A', '#D99A5B', '#6E7A55', '#E7D4B6'] },
  lily:        { src: null, shot: 'Peace lily in a terracotta pot on timber floor', tones: ['#B9C2AA', '#E9ECE1', '#6F805F', '#C47C5C'] },
  hoya:        { src: null, shot: 'Trailing hoya in a hanging planter', tones: ['#9AA88A', '#DCE2D2', '#5E6E52', '#E5D8C6'] },
  garland:     { src: null, shot: 'Christmas table garland with candles', tones: ['#33402F', '#8A9670', '#C49A62', '#E5D7BD'] },
  orchidWhite: { src: null, shot: 'Single-stem white orchid, close crop', tones: ['#ECEAE2', '#FFFFFF', '#C2CAB7', '#E2D2D8'] },

  wedding1:    { src: null, shot: 'Bride holding a loose garden bouquet, back-lit', tones: ['#E7DCCF', '#F6EFE7', '#D2A79B', '#93A087'] },
  wedding2:    { src: null, shot: 'Ceremony arbour of white and blush blooms', tones: ['#D9D3C4', '#F3EDE3', '#C9A29A', '#7D8C70'] },
  wedding3:    { src: null, shot: 'Long table styling with bud vases and candles', tones: ['#B7A58C', '#E8D6BC', '#8A6A55', '#5D6A52'] },
  workshop:    { src: null, shot: 'Hands building a hand-tied bouquet at the workshop table', tones: ['#CDB9A0', '#E9D8C2', '#9B6C59', '#7F8E70'] },
  workshop2:   { src: null, shot: 'Workshop table, stems laid out, scissors and twine', tones: ['#A9A58A', '#E2D9C4', '#7A6A54', '#C68D74'] },
  plantsHero:  { src: null, shot: 'Group of orchids and trailing plants on a sideboard', tones: ['#C6CCBC', '#F1F0EA', '#879577', '#D5BFC6'] },
  seasonal:    { src: null, shot: 'Spring buckets in the cool room, colour by colour', tones: ['#E3C4A5', '#F0DDC9', '#C77C62', '#8D9C76'] },
  voucher:     { src: null, shot: 'Hand-written gift card tucked into a posy', tones: ['#EBD8D0', '#F7EEE9', '#C79A8E', '#A2AC94'] },
  story:       { src: null, shot: 'The florist at work, early morning, studio window', tones: ['#B8AE98', '#E5DDCC', '#6E6B57', '#C08F78'] },
  story2:      { src: null, shot: 'Market buckets at dawn', tones: ['#7F8A6C', '#D6C4A4', '#A4654A', '#E8DDCB'] },
  ig1: { src: null, shot: 'Instagram — buckets of David Austin roses', tones: ['#E7CFC5', '#F4E6DF', '#C9897A', '#9BA88C'] },
  ig2: { src: null, shot: 'Instagram — waxflower close-up', tones: ['#E6DCE0', '#FAF5F6', '#C69FAD', '#8F9C82'] },
  ig3: { src: null, shot: 'Instagram — delivery van door, bouquets inside', tones: ['#BFB49F', '#E7DED0', '#7E8E6E', '#C2785B'] },
  ig4: { src: null, shot: 'Instagram — wedding buttonholes laid in a row', tones: ['#E6E0D3', '#F7F3EC', '#A9B49A', '#D9B5A9'] },
  ig5: { src: null, shot: 'Instagram — banksia pod on the bench', tones: ['#6E6A4E', '#B88B55', '#3F4A37', '#D8C29A'] },
  ig6: { src: null, shot: 'Instagram — workshop guests with finished bouquets', tones: ['#D5C4AE', '#EEE2D2', '#B07560', '#899878'] },
}

export const categories = [
  { id: 'everyday', name: 'Everyday Bouquets', blurb: 'Wrapped and ready, for no reason at all', photo: 'catEveryday' },
  { id: 'seasonal', name: 'Seasonal Blooms', blurb: 'Whatever the season is doing best', photo: 'catSeasonal' },
  { id: 'native', name: 'Native Flowers', blurb: 'Banksia, kangaroo paw, gum and wax', photo: 'catNative' },
  { id: 'plants', name: 'Indoor Plants', blurb: 'Orchids and easy-going greenery', photo: 'catPlants' },
  { id: 'christmas', name: 'Christmas Wreaths', blurb: 'Made in the studio from December', photo: 'catXmas' },
]

export const products = [
  {
    id: 'seasonal-posy', name: 'Seasonal Posy', category: 'seasonal', photo: 'posy', gallery: ['posy', 'heroDetail', 'seasonal'],
    short: 'A small, hand-tied posy of the week’s best stems. Easy to carry, easy to love.',
    description: 'Our posy changes with the market. We choose a handful of stems that are looking their best that week — perhaps ranunculus and sweet peas in spring, dahlias and rose hips later in the year — and tie them loosely with garden greenery. Wrapped in paper and finished with a cotton ribbon.',
    sizes: [{ label: 'Small', price: 65 }, { label: 'Medium', price: 85 }, { label: 'Large', price: 110 }],
    stock: 'in', tag: 'Changes weekly',
  },
  {
    id: 'native-garden-bouquet', name: 'Native Garden Bouquet', category: 'native', photo: 'native', gallery: ['native', 'catNative', 'paw'],
    short: 'Banksia, kangaroo paw, gum leaves and whatever native is flowering now.',
    description: 'A bouquet that looks like it came from a walk through the bush, gathered with a little more intention. Expect sculptural banksia and protea, the soft fuzz of kangaroo paw, silver gum and native grasses. Natives are long-lasting and many dry beautifully in the vase.',
    sizes: [{ label: 'Small', price: 95 }, { label: 'Medium', price: 125 }, { label: 'Large', price: 160 }],
    stock: 'in', tag: 'Long vase life',
  },
  {
    id: 'signature-bouquet', name: 'Signature Bouquet', category: 'everyday', photo: 'signature', gallery: ['signature', 'hero', 'heroDetail'],
    short: 'Our generous, garden-style bouquet — loose, layered and full of movement.',
    description: 'The bouquet we are known for. Designed in a loose, garden style with focal blooms, airy filler and trailing greenery so it looks natural in the vase rather than stiff and tight. We work to a palette of soft whites, blush and green unless you ask for something bolder.',
    sizes: [{ label: 'Small', price: 120 }, { label: 'Medium', price: 150 }, { label: 'Large', price: 195 }],
    stock: 'in', tag: 'Most gifted',
  },
  {
    id: 'phalaenopsis-orchid', name: 'Phalaenopsis Orchid', category: 'plants', photo: 'orchid', gallery: ['orchid', 'orchidWhite', 'plantsHero'],
    short: 'An elegant moth orchid in a ceramic pot. Flowers for months with little fuss.',
    description: 'Phalaenopsis are the easiest orchids to live with. Ours arrive potted in a simple matte ceramic with a moss top-dress and a care card. Keep in bright, indirect light and water lightly once a week — the flowers can last for months.',
    sizes: [{ label: 'Single stem', price: 85 }, { label: 'Double stem', price: 120 }],
    stock: 'low', tag: 'Plant',
  },
  {
    id: 'christmas-wreath', name: 'Christmas Wreath', category: 'christmas', photo: 'wreath', gallery: ['wreath', 'catXmas', 'garland'],
    short: 'Ready-made door wreath of eucalyptus, pine and dried native accents.',
    description: 'Made by hand in the studio on a natural vine base. Layers of fresh eucalyptus and pine with dried protea, banksia pods and seed heads, finished with a linen ribbon for hanging. The greenery dries gracefully, so it will see you through the season.',
    sizes: [{ label: '40 cm', price: 110 }, { label: '55 cm', price: 145 }],
    stock: 'in', tag: 'Seasonal',
  },
  {
    id: 'rose-garden-jar', name: 'Garden Roses in a Jar', category: 'everyday', photo: 'jar', gallery: ['jar', 'catEveryday', 'heroDetail'],
    short: 'Scented garden roses arranged in a reusable glass jar. No vase needed.',
    description: 'Arranged and delivered in water, so it can go straight onto the table. We use scented garden roses where we can get them, with a little foliage and a few smaller blooms to soften the shape.',
    sizes: [{ label: 'Standard', price: 90 }, { label: 'Generous', price: 130 }],
    stock: 'in', tag: 'Arrives in water',
  },
  {
    id: 'kangaroo-paw-bunch', name: 'Kangaroo Paw Bunch', category: 'native', photo: 'paw', gallery: ['paw', 'native', 'catNative'],
    short: 'A simple, single-variety bunch of WA’s own kangaroo paw.',
    description: 'Sometimes one flower says enough. A tied bunch of kangaroo paw in whatever colour is best at market — usually rust, red or soft yellow. Lasts up to two weeks with fresh water.',
    sizes: [{ label: 'Bunch', price: 55 }],
    stock: 'in', tag: 'Single variety',
  },
  {
    id: 'dried-native-bunch', name: 'Dried Native Bunch', category: 'native', photo: 'dried', gallery: ['dried', 'catNative', 'story2'],
    short: 'Paper daisies, grasses and seed pods that last all year.',
    description: 'For people who love flowers but are hard on them. A bunch of air-dried natives that keeps its colour and shape for many months. Keep out of direct sun and humidity.',
    sizes: [{ label: 'Small', price: 70 }, { label: 'Large', price: 95 }],
    stock: 'in', tag: 'Lasts for months',
  },
  {
    id: 'peace-lily', name: 'Peace Lily', category: 'plants', photo: 'lily', gallery: ['lily', 'plantsHero', 'hoya'],
    short: 'Forgiving, glossy and happy in low light. A good first plant.',
    description: 'Peace lilies tell you when they need water — they droop, you water, they bounce back. Delivered in a terracotta pot with a saucer and care card.',
    sizes: [{ label: 'Medium', price: 65 }, { label: 'Large', price: 95 }],
    stock: 'in', tag: 'Plant',
  },
  {
    id: 'trailing-hoya', name: 'Trailing Hoya', category: 'plants', photo: 'hoya', gallery: ['hoya', 'plantsHero', 'lily'],
    short: 'Waxy trailing leaves in a hanging planter, for a bright shelf or window.',
    description: 'A slow, steady grower that rewards patience with clusters of star-shaped flowers. Comes in a hanging planter with cord.',
    sizes: [{ label: 'Hanging', price: 55 }],
    stock: 'out', tag: 'Plant',
  },
  {
    id: 'christmas-garland', name: 'Christmas Table Garland', category: 'christmas', photo: 'garland', gallery: ['garland', 'wreath', 'catXmas'],
    short: 'A loose run of foliage and dried accents for the Christmas table.',
    description: 'Lay it down the middle of the table and add candles. Built from eucalyptus, olive and pine with dried native accents. Sold by length.',
    sizes: [{ label: '1.2 m', price: 85 }, { label: '2 m', price: 130 }],
    stock: 'low', tag: 'Seasonal',
  },
  {
    id: 'seasonal-bucket', name: 'Florist’s Choice Bucket', category: 'seasonal', photo: 'seasonal', gallery: ['seasonal', 'posy', 'catSeasonal'],
    short: 'A bucket of loose seasonal stems for you to arrange yourself.',
    description: 'Ideal for anyone who likes to play — or for a party where you want flowers in every room. Delivered in a bucket of water, unwrapped and unarranged, with a few notes on what is in it.',
    sizes: [{ label: 'Standard', price: 100 }, { label: 'Large', price: 150 }],
    stock: 'in', tag: 'Arrange yourself',
  },
]

export const featuredIds = ['seasonal-posy', 'native-garden-bouquet', 'signature-bouquet', 'phalaenopsis-orchid', 'christmas-wreath']

export const addOns = [
  { id: 'card', label: 'Hand-written card', price: 0 },
  { id: 'vase', label: 'Add a glass vase', price: 25 },
  { id: 'chocolate', label: 'Add chocolates', price: 18 },
]

export const workshops = [
  {
    id: 'hand-tied', title: 'Seasonal Hand-Tied Bouquet', photo: 'workshop', price: 145, duration: '2.5 hours',
    summary: 'Learn the spiral technique we use for every bouquet, then take home your own.',
    details: 'We start with conditioning and choosing stems, then build a hand-tied bouquet using the spiral method. All flowers, tools and wrapping are provided, along with a glass of something and a grazing plate.',
    sessions: [
      { id: 'ht-1', date: '2026-11-28', time: '10:00 am – 12:30 pm', capacity: 12, booked: 12 },
      { id: 'ht-2', date: '2026-12-05', time: '10:00 am – 12:30 pm', capacity: 12, booked: 10 },
      { id: 'ht-3', date: '2027-01-16', time: '2:00 pm – 4:30 pm', capacity: 12, booked: 3 },
    ],
  },
  {
    id: 'xmas-wreath', title: 'Christmas Wreath Workshop', photo: 'catXmas', price: 165, duration: '3 hours',
    summary: 'Build a full native and eucalyptus wreath on a vine base to hang on your door.',
    details: 'A December favourite. We provide the vine base, fresh and dried materials, wire and ribbon. You will learn how to build layers that hold their shape as they dry.',
    sessions: [
      { id: 'xw-1', date: '2026-12-06', time: '1:00 pm – 4:00 pm', capacity: 14, booked: 14 },
      { id: 'xw-2', date: '2026-12-12', time: '10:00 am – 1:00 pm', capacity: 14, booked: 13 },
      { id: 'xw-3', date: '2026-12-13', time: '10:00 am – 1:00 pm', capacity: 14, booked: 6 },
    ],
  },
  {
    id: 'table', title: 'Table Arrangement & Vessels', photo: 'workshop2', price: 155, duration: '2.5 hours',
    summary: 'Arrange a low table centrepiece in a vessel, using a reusable mechanic instead of foam.',
    details: 'We cover foam-free mechanics, shape and proportion, and how to make a few stems look abundant. You take home your arrangement and the vessel.',
    sessions: [
      { id: 'tb-1', date: '2027-02-06', time: '10:00 am – 12:30 pm', capacity: 10, booked: 4 },
      { id: 'tb-2', date: '2027-02-20', time: '10:00 am – 12:30 pm', capacity: 10, booked: 0 },
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
  { id: 'ENQ-1042', name: 'Charlotte Nguyen', email: 'charlotte@example.com', phone: '04XX XXX XXX', date: '2027-03-20', venue: 'Venue to be confirmed', guests: 120, budget: '$5,000 – $8,000', requirements: ['Bridal bouquet', 'Bridesmaids (4)', 'Ceremony arbour', 'Table centrepieces'], notes: 'Loving soft blush and white with lots of greenery. Outdoor ceremony.', received: '2026-11-14', quote: 'not-started', followUp: 'due', stage: 2 },
  { id: 'ENQ-1041', name: 'Priya & Tom', email: 'priya.t@example.com', phone: '04XX XXX XXX', date: '2027-02-13', venue: 'Winery (name supplied)', guests: 80, budget: '$3,000 – $5,000', requirements: ['Bridal bouquet', 'Buttonholes (6)', 'Bud vases'], notes: 'Would love natives — banksia and gum.', received: '2026-11-12', quote: 'draft', followUp: 'none', stage: 4 },
  { id: 'ENQ-1039', name: 'Hannah Morris', email: 'hannah.m@example.com', phone: '04XX XXX XXX', date: '2027-04-10', venue: 'Private property', guests: 150, budget: '$8,000+', requirements: ['Full styling', 'Hanging installation', 'Ceremony arbour'], notes: 'Large marquee, evening reception.', received: '2026-11-06', quote: 'sent', followUp: 'overdue', stage: 6 },
  { id: 'ENQ-1036', name: 'Lucy Bennett', email: 'lucy.b@example.com', phone: '04XX XXX XXX', date: '2027-01-23', venue: 'City restaurant', guests: 40, budget: '$1,500 – $3,000', requirements: ['Bridal bouquet', 'Table posies'], notes: 'Small and relaxed.', received: '2026-10-30', quote: 'accepted', followUp: 'none', stage: 8, invoice: 'awaiting' },
  { id: 'ENQ-1031', name: 'Sophie & Ari', email: 'sophie.ari@example.com', phone: '04XX XXX XXX', date: '2026-12-19', venue: 'Beachside venue', guests: 95, budget: '$5,000 – $8,000', requirements: ['Bridal party', 'Arbour', 'Centrepieces'], notes: '', received: '2026-10-12', quote: 'accepted', followUp: 'none', stage: 9, invoice: 'paid' },
  { id: 'ENQ-1028', name: 'Grace Whitfield', email: 'grace.w@example.com', phone: '04XX XXX XXX', date: '2027-05-08', venue: 'Garden venue', guests: 60, budget: '$3,000 – $5,000', requirements: ['Bridal bouquet', 'Ceremony florals'], notes: 'Following up after seeing workshop.', received: '2026-10-05', quote: 'sent', followUp: 'scheduled', stage: 6 },
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
