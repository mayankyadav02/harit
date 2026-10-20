export interface ConservationInitiative {
  id: string;
  title: string;
  subtitle: string;
  category: 'domestic' | 'birds' | 'wildlife' | 'water_fodder';
  categoryLabel: string;
  image: string;
  imageAlt: string;
  statsBadge: string;
  urgencyOrImpact: string;
  description: string;
  whyItMatters: string;
  actionGuide: {
    step: string;
    title: string;
    detail: string;
  }[];
  seasonalCare: {
    season: string;
    instruction: string;
  }[];
  dosAndDonts: {
    dos: string[];
    donts: string[];
  };
  recommendedMaterials: string[];
}

export const CONSERVATION_CATEGORIES = [
  { id: 'all', label: 'All Initiatives', count: 8 },
  { id: 'domestic', label: 'Domestic Animals', count: 2 },
  { id: 'birds', label: 'Birds & Sparrows', count: 2 },
  { id: 'wildlife', label: 'Wildlife & Corridors', count: 2 },
  { id: 'water_fodder', label: 'Water & Fodder Networks', count: 2 },
] as const;

export const CONSERVATION_INITIATIVES: ConservationInitiative[] = [
  {
    id: 'init-dom-01',
    title: 'Community Cattle Shade & Heatwave Havens',
    subtitle: 'Vernacular thatched shelters and high-roof resting groves for community cows, bulls, and goats',
    category: 'domestic',
    categoryLabel: 'Domestic Animals',
    image: '/images/conservation/domestic-cattle-shelter.jpg',
    imageAlt: 'Indian cattle resting in a well-ventilated thatched shelter with clean fodder',
    statsBadge: '45°C Thermal Shield',
    urgencyOrImpact: 'Critical during North & Central Indian May–June heatwaves',
    description: 'During severe summer months, street and village cattle face extreme heat stress, heat exhaustion, and dehydration. Our vernacular shelter initiative promotes low-cost bamboo, thatch, and tree groves that lower ground ambient temperature by 5°C to 8°C.',
    whyItMatters: 'Unlike indoor industrial barns, vernacular thatched canopies allow free air circulation while preventing asphalt radiation burn on animal hooves. An adult cow requires 50–70 liters of water daily when temperatures cross 40°C.',
    actionGuide: [
      {
        step: '01',
        title: 'Locate Natural Wind Corridors',
        detail: 'Build shelters oriented East-to-West with a minimum roof pitch of 10 feet. This reduces direct solar exposure and maximizes cross-breeze.',
      },
      {
        step: '02',
        title: 'Use Natural Thatched Bamboo Roofing',
        detail: 'Avoid corrugated tin sheets which trap radiant heat. Use local thatch grass, dried palm fronds, or khus mats sprinkled with water at midday.',
      },
      {
        step: '03',
        title: 'Elevate Dry Bedding & Sand Flooring',
        detail: 'Provide compacted clay or washed sand bedding. Wet concrete damages hooves and fosters bacterial infections.',
      },
      {
        step: '04',
        title: 'Electrolyte Hydration & Salt Licks',
        detail: 'Set up shallow cement troughs with fresh groundwater and hang rock salt (Sendha Namak) blocks to replenish mineral balance.',
      },
    ],
    seasonalCare: [
      {
        season: 'Peak Summer (April–June)',
        instruction: 'Sprinkle roofs with water at 12 PM and 3 PM. Provide water infused with jaggery and mustard oil drops for heat protection.',
      },
      {
        season: 'Monsoon (July–September)',
        instruction: 'Ensure rapid rainwater drainage around shelter perimeter to prevent foot rot (Khurpaka) and fungal skin conditions.',
      },
      {
        season: 'Winter (December–January)',
        instruction: 'Install temporary burlap (jute sack) windbreakers on northern sides to guard elderly cows and young calves from cold drafts.',
      },
    ],
    dosAndDonts: {
      dos: [
        'Ensure fresh clean drinking water is accessible 24/7 in shaded areas',
        'Clean manure and dung twice daily to prevent excessive fly and parasite breeding',
        'Plant indigenous shade trees like Neem, Banyan, and Peepal around resting perimeters',
      ],
      donts: [
        'Never tether animals with short metallic chains in direct noon sunlight',
        'Do not use asbestos or non-insulated metal tin sheets as roofing',
        'Avoid feeding plastic-wrapped vegetable waste or fermented moldy kitchen food',
      ],
    },
    recommendedMaterials: [
      'Treated bamboo poles',
      'Local thatch / coconut fronds / paddy straw',
      'Washed river sand for bedding',
      'Rock salt mineral blocks (Sendha Namak)',
      'Terracotta or cemented water basins',
    ],
  },
  {
    id: 'init-dom-02',
    title: 'Humane Gaushala Care & Indigenous Desi Breed Preservation',
    subtitle: 'Compassionate welfare, veterinary health camps & native breed support (Gir, Sahiwal, Rathi, Tharparkar)',
    category: 'domestic',
    categoryLabel: 'Domestic Animals',
    image: '/images/conservation/domestic-gaushala-care.jpg',
    imageAlt: 'Caretaker nurturing indigenous Indian cattle in a hygienic community gaushala',
    statsBadge: 'Native Zebu Breeds',
    urgencyOrImpact: 'Conserves biodiversity & ensures elderly cattle dignity',
    description: 'Indigenous Indian cattle (Bos indicus) possess the humped dorsal structure, dewlap cooling flap, and heat-resistant sweat glands uniquely adapted to tropical climates. This initiative supports transparent, humane community gaushalas with preventative veterinary care and dignified old-age shelters.',
    whyItMatters: 'Indigenous breeds have evolved over millennia to withstand tropical pests and climatic surges. Supporting compassionate gaushalas preserves genetic diversity and converts cattle waste into certified organic bio-fertilizer (Jeev Amrit).',
    actionGuide: [
      {
        step: '01',
        title: 'Dietary Balancing (Green & Dry Roughage)',
        detail: 'Feed a 60:40 balanced ratio of green succulent fodder (Maize/Napier) and dry roughage (wheat straw / Bhusa) with 1kg crushed oilseed cakes.',
      },
      {
        step: '02',
        title: 'Herbal Pest Repellent Smoke',
        detail: 'Burn dried cow dung cakes with dried Neem leaves and camphor at dusk to naturally repel mosquitoes and flies without synthetic chemicals.',
      },
      {
        step: '03',
        title: 'Hoof Trimming & Grooming',
        detail: 'Arrange monthly inspection of hooves. Brush coats with coarse coir brushes to stimulate blood circulation and remove ectoparasites.',
      },
      {
        step: '04',
        title: 'Jeev Amrit Bio-Digester Setup',
        detail: 'Collect fresh dung and urine in shaded concrete pits with jaggery and gram flour to manufacture microbial liquid fertilizers for farmers.',
      },
    ],
    seasonalCare: [
      {
        season: 'Summer',
        instruction: 'Bathe cattle with cool water before 9 AM; feed green succulent sorghum and provide free access to clean mineral water.',
      },
      {
        season: 'Monsoon',
        instruction: 'Vaccinate against Foot & Mouth Disease (FMD) and Black Quarter (BQ). Keep standing grounds completely dry with dry straw.',
      },
      {
        season: 'Winter',
        instruction: 'Add fenugreek (Methi) and mustard cake (Sarson Khal) to daily feed to help lactating and senior cows maintain body core heat.',
      },
    ],
    dosAndDonts: {
      dos: [
        'Maintain individual animal medical logs with deworming and vaccination dates',
        'Allow daily free-roaming exercise in open courtyards for at least 3 hours',
        'Provide clean water in non-algal troughs cleaned weekly with rock salt',
      ],
      donts: [
        'Never overcrowd sheds beyond recommended space (minimum 40 sq ft per adult cattle)',
        'Do not administer unprescribed oxytocin or synthetic hormonal stimulants',
        'Never allow stagnant urine accumulation inside resting quarters',
      ],
    },
    recommendedMaterials: [
      'Natural coir grooming brushes',
      'Indigenous herbal oils (Neem, Karanja oil)',
      'Sendha Namak (Pink rock salt)',
      'Organic jaggery and mustard seed cake',
      'Slotted non-slip rubber mats for elderly cows',
    ],
  },
  {
    id: 'init-bird-01',
    title: 'Pakshi Jalpatra — Clay Water Bowls Network',
    subtitle: 'Rooftop, balcony & street tree shallow earthenware hydration points for House Sparrows (Gauraiya) and urban birds',
    category: 'birds',
    categoryLabel: 'Birds & Sparrows',
    image: '/images/conservation/birds-sparrow-drinking.jpg',
    imageAlt: 'Indian House Sparrow drinking fresh water from an unglazed terracotta bowl on a terrace',
    statsBadge: '14,300+ Installed',
    urgencyOrImpact: 'Saves thousands of small songbirds from summer dehydration',
    description: 'During Indian summers, urban temperatures frequently exceed 42°C, evaporating natural puddles and roadside ditches. Small birds like House Sparrows, Bulbuls, and Sunbirds lose body moisture rapidly. Placing shallow baked terracotta bowls (Pakshi Jalpatra) provides immediate, life-saving hydration.',
    whyItMatters: 'Glass skyscrapers and concreted courtyards have destroyed ground-level watering holes. A single balcony water bowl often serves up to 40 visiting birds each day and prevents dehydration shock during midday heat spikes.',
    actionGuide: [
      {
        step: '01',
        title: 'Choose Unglazed Terracotta (Mittika)',
        detail: 'Use porous, unglazed earthenware. Natural clay allows micro-evaporation through its pores, keeping water naturally 3°C to 5°C cooler than the air.',
      },
      {
        step: '02',
        title: 'Shallow Depth with Resting Pebbles',
        detail: 'Keep the water depth between 1.5 to 2.5 inches. Place a clean rough stone in the center so tiny sparrows, honeybees, and butterflies do not drown.',
      },
      {
        step: '03',
        title: 'Predator-Safe Placement',
        detail: 'Place the pot at least 4 to 6 feet above ground level, with a clear 360-degree view so birds can spot approaching cats or predatory birds.',
      },
      {
        step: '04',
        title: 'Daily Dawn Water Replacement',
        detail: 'Empty and scrub the bowl every morning before 8 AM. Refill with fresh tap water to prevent mosquito larvae and algal buildup.',
      },
    ],
    seasonalCare: [
      {
        season: 'March to June (Summer Surge)',
        instruction: 'Check bowls twice daily (morning and 2 PM). Place bowls under shade foliage so water stays refreshingly cool.',
      },
      {
        season: 'July to September (Monsoon)',
        instruction: 'Scrub algae weekly using hot water and salt. Prevent rainwater overflow from stagnating into mosquito breeding pools.',
      },
      {
        season: 'November to February (Winter)',
        instruction: 'Keep water clean and move bowls to sunny morning spots where birds gather to warm up and bathe after dawn.',
      },
    ],
    dosAndDonts: {
      dos: [
        'Use porous terracotta instead of metal or plastic containers that heat up rapidly',
        'Place a rough stone in the middle for perching and insect safety',
        'Clean the bowl with plain water and coconut coir (no dishwashing chemicals)',
      ],
      donts: [
        'Never use deep buckets or vertical glass jars where fledglings can fall in and drown',
        'Do not place bowls near bushes where domestic cats can ambush drinking birds',
        'Never add ice cubes or refrigerated water; ambient well/tap water is healthiest',
      ],
    },
    recommendedMaterials: [
      'Unglazed Indian terracotta shallow bowl (8 to 12 inch diameter)',
      'Natural river pebbles or slate stone',
      'Jute hanging cords (for tree or railing hanging)',
      'Coir scrubbing brush for chemical-free cleaning',
    ],
  },
  {
    id: 'init-bird-02',
    title: 'Sparrow Revival Nestboxes & Garden Hydration',
    subtitle: '32mm anti-predator Gauraiya nest boxes, hanging seed feeders & native fruiting canopy corridors',
    category: 'birds',
    categoryLabel: 'Birds & Sparrows',
    image: '/images/conservation/birds-water-fountain.jpg',
    imageAlt: 'Garden bird bath and greenery welcoming native Indian songbirds and pollinators',
    statsBadge: '32mm Entrance Hole',
    urgencyOrImpact: 'Reversing 60% Gauraiya population decline in Indian metros',
    description: 'Modern glass-fronted architecture, sealed ventilation ducts, and manicured chemical gardens have eliminated traditional cavity nesting sites for the Indian House Sparrow (Gauraiya). Installing standardized 32mm wooden nestboxes provides predator-safe breeding chambers.',
    whyItMatters: 'House Sparrows are primary biocontrol agents in urban eco-systems; a single sparrow pair feeds thousands of soft caterpillars and larvae to their chicks during the breeding cycle.',
    actionGuide: [
      {
        step: '01',
        title: 'Precision 32mm Entrance Hole',
        detail: 'The hole diameter must be strictly 32mm (1.25 inches). This allows sparrows to enter while completely blocking aggressive pigeons, mynas, and crows.',
      },
      {
        step: '02',
        title: 'Install on Protected Balcony Walls',
        detail: 'Mount nestboxes 8 to 10 feet high on a quiet wall facing North or East, sheltered under roof eaves away from driving monsoon rain.',
      },
      {
        step: '03',
        title: 'Provide Grains & Millet Mix',
        detail: 'Hang a seed feeder nearby stocked with Foxtail millet (Kangni), Pearl millet (Bajra), and unpolished broken rice grains.',
      },
      {
        step: '04',
        title: 'Provide Dry Dust Bath Corners',
        detail: 'Keep a shallow tray filled with dry river silt or fine sand. Sparrows take regular dust baths to clean feathers and dislodge mites.',
      },
    ],
    seasonalCare: [
      {
        season: 'Breeding Season (Feb–June)',
        instruction: 'Do not disturb or open the nestbox. Provide nesting material nearby: dried Bermuda grass (Doob) and cotton fibers.',
      },
      {
        season: 'Post-Monsoon (October)',
        instruction: 'After fledglings have flown, gently clean out old nesting debris and wipe the interior with diluted neem extract.',
      },
      {
        season: 'Winter Months',
        instruction: 'Nestboxes serve as communal roosting shelters where 2-3 sparrows huddle to survive freezing nighttime temperatures.',
      },
    ],
    dosAndDonts: {
      dos: [
        'Choose unpainted seasoned pinewood, cedar, or recycled wood (minimum 15mm thickness)',
        'Ensure small drainage holes at the base of the nestbox for humidity control',
        'Grow native balcony shrubs like Curry leaf, Henna, and Hibiscus nearby',
      ],
      donts: [
        'Never attach perches below the hole—perches help predatory birds grab baby chicks',
        'Do not use plastic bottles or metallic cans as nest boxes (they overheat dangerously)',
        'Never spray synthetic pyrethroid insecticides or pest foggers near nesting walls',
      ],
    },
    recommendedMaterials: [
      'FSC certified wooden sparrow nestbox (32mm hole)',
      'Hanging tubular seed feeder with perch tray',
      'Kangni (Foxtail millet) and Bajra seeds',
      'Shallow earthenware dust-bath saucer',
    ],
  },
  {
    id: 'init-wild-01',
    title: 'Natural Waterhole Desilting & Forest Buffer Ponds',
    subtitle: 'Desilting seasonal water reservoirs, wildlife corridor protection & peaceful coexistence around sanctuaries',
    category: 'wildlife',
    categoryLabel: 'Wildlife & Corridors',
    image: '/images/conservation/wildlife-chital-sanctuary.jpg',
    imageAlt: 'Indian spotted deer herd drinking at a natural waterhole in a protected sanctuary',
    statsBadge: 'Sanctuary Buffers',
    urgencyOrImpact: 'Prevents wildlife from straying into highways & farm lands',
    description: 'When natural forest ponds dry up in April and May, wild ungulates (Chital, Sambar, Blackbuck) and carnivores are forced to cross highways and enter fringe agricultural fields searching for water, causing tragic road accidents and retaliatory conflict. Restoring earthen check dams and de-silting forest edge ponds saves lives on both sides.',
    whyItMatters: 'Healthy forest buffer ponds stabilize the groundwater table for adjacent rural farming communities while providing a safe perimeter where wildlife can drink without human confrontation.',
    actionGuide: [
      {
        step: '01',
        title: 'Community Desilting before Monsoons',
        detail: 'Coordinate with local forest gram panchayats in May to remove heavy sediment from traditional earthen bunds (Talab / Johad).',
      },
      {
        step: '02',
        title: 'Gradual Sloped Earthen Banks',
        detail: 'Build gently sloping pond edges (1:3 gradient). Steep concrete vertical drops cause young fawns and small animals to slip and drown.',
      },
      {
        step: '03',
        title: 'Zero Chemical Contamination Zone',
        detail: 'Ensure farm pesticide runoff and livestock washing are kept at least 200 meters away from natural wildlife watering channels.',
      },
      {
        step: '04',
        title: 'Native Buffer Reforestation',
        detail: 'Plant deep-rooting native riparian species (Arjun, Jamun, Bamboo) along waterhole embankments to prevent erosion and provide cooling canopy.',
      },
    ],
    seasonalCare: [
      {
        season: 'Pre-Monsoon (May)',
        instruction: 'Deepen water retention depressions and repair breaches in earthen stone-faced embankments.',
      },
      {
        season: 'Monsoon (July–Oct)',
        instruction: 'Inspect overflow weirs to ensure floodwaters drain naturally without washing away bank vegetation.',
      },
      {
        season: 'Post-Winter Dry Season',
        instruction: 'Monitor water levels and solar pump trickle lines where artificial replenishment is maintained by forest authorities.',
      },
    ],
    dosAndDonts: {
      dos: [
        'Maintain a minimum 500-meter silent buffer zone around natural forest watering holes',
        'Report wildlife distress or injured animals promptly to the state forest department',
        'Encourage community solar fencing for crop protection instead of illegal live electric wires',
      ],
      donts: [
        'Never dump single-use plastic bottles, snack packets, or liquor bottles near reserve fringes',
        'Do not play loud music or use vehicle high-beam lights along forest boundary roads',
        'Never attempt to feed wild deer, monkeys, or boar processed human food',
      ],
    },
    recommendedMaterials: [
      'Gabion wire mesh and local river boulders',
      'Saplings of Terminalia arjuna (Arjun) and Syzygium cumini (Jamun)',
      'Solar-powered low-voltage perimeter deterrent kits',
      'Community reflective wildlife crossing signboards',
    ],
  },
  {
    id: 'init-wild-02',
    title: 'Harmonious Coexistence & Corridor Restoration',
    subtitle: 'Community eco-monitoring, solar perimeter deterrents & mitigating human-wildlife encounters along migratory paths',
    category: 'wildlife',
    categoryLabel: 'Wildlife & Corridors',
    image: '/images/conservation/wildlife-chital-sanctuary.jpg',
    imageAlt: 'Protected wildlife corridor showing native Indian forest canopy and grassland ecosystem',
    statsBadge: 'Corridor Safety',
    urgencyOrImpact: 'Protects both farming livelihoods and majestic Indian wildlife',
    description: 'India harbors over 70% of the world’s wild tigers and 60% of Asian elephants alongside 1.4 billion people. Our coexistence framework champions community-led early-warning networks, predator-proof livestock corrals, and native scrub forest conservation along traditional migratory corridors.',
    whyItMatters: 'Conservation cannot succeed in isolation from community livelihoods. By equipping border communities with non-lethal solar deterrents and rapid crop-loss documentation, we build enduring tolerance and shared stewardship.',
    actionGuide: [
      {
        step: '01',
        title: 'Predator-Proof Night Livestock Pens',
        detail: 'Build chain-link covered night enclosures with 6-foot wire mesh to safeguard goats and calves from nocturnal leopards and hyenas.',
      },
      {
        step: '02',
        title: 'Fox-Light & Acoustic Deterrents',
        detail: 'Deploy randomized LED flashing solar lights (Foxlights) around farm perimeters. Herbivores and predators avoid the unpredictable visual stimulus.',
      },
      {
        step: '03',
        title: 'Early Warning WhatsApp Networks',
        detail: 'Participate in village wildlife tracking groups to broadcast animal sightings near roads so commuters and school children travel safely.',
      },
      {
        step: '04',
        title: 'Plant Bio-Shields along Field Borders',
        detail: 'Cultivate thorny unpalatable bio-hedges like Agave (Rambans), Lemon, and Cactus which deter wild boar and deer from entering crops.',
      },
    ],
    seasonalCare: [
      {
        season: 'Harvest Season (Kharif / Rabi)',
        instruction: 'Organize community night vigils with high-power torches; avoid venturing alone into sugarcane or tall mustard fields.',
      },
      {
        season: 'Summer Migration',
        instruction: 'Keep highway speeds under 40 km/h along signed forest corridors (e.g., NH-7, Kaziranga animal overpasses).',
      },
      {
        season: 'Monsoon Inundation',
        instruction: 'Provide dry highland refuges and safe passage routes for displaced animals moving away from flooded riverbanks.',
      },
    ],
    dosAndDonts: {
      dos: [
        'Travel in groups with bells or vocal signals when passing through forest fringe trails at dawn and dusk',
        'Keep village toilet areas well-lit and clear brushwood within 50 meters of residential dwellings',
        'Support fair compensation mechanisms for farmers reporting crop damage to forest rangers',
      ],
      donts: [
        'Never set up illegal electric live wires from agricultural power lines (major hazard to elephants & humans)',
        'Do not form aggressive stone-pelting mobs around trapped or disoriented wild animals',
        'Never retaliate against livestock loss with pesticide poisoning of carcasses',
      ],
    },
    recommendedMaterials: [
      'Chain-link wire mesh (10 gauge, 6ft height)',
      'Solar Foxlights (multi-colored random LED deterrents)',
      'Agave and Karonda thorny hedge planting rootstocks',
      'Reflective fluorescent vests for night village guards',
    ],
  },
  {
    id: 'init-water-01',
    title: 'Community Public Troughs & Rural Water Stations',
    subtitle: 'Continuous-supply cemented water basins for working bulls, stray cattle, stray animals, and wandering wildlife',
    category: 'water_fodder',
    categoryLabel: 'Water & Fodder Networks',
    image: '/images/conservation/water-points-trough.jpg',
    imageAlt: 'Sturdy village cement water trough filled with fresh water for animals',
    statsBadge: '250L Daily Capacity',
    urgencyOrImpact: 'Essential civic hydration infrastructure across Indian towns',
    description: 'In bustling market towns and rural crossroads, community cattle and working draft animals walk miles without finding safe drinking water. Our public trough blueprint installs durable, lime-washed cement troughs connected to handpump drain lines or rainwater harvesting tanks.',
    whyItMatters: 'A working bull pulling an agricultural cart in summer loses over 40 liters of water through sweat and respiration daily. Readily available clean troughs prevent fatal dehydration colics and kidney failure.',
    actionGuide: [
      {
        step: '01',
        title: 'Site Selection Near Greywater / Pump Outflows',
        detail: 'Build troughs beside village handpumps, temple wells, or rainwater sumps where overflow water can naturally refill the basin.',
      },
      {
        step: '02',
        title: 'Ergonomic Height for Multi-Species Access',
        detail: 'Construct walls 50cm high with a stepped 25cm low ramp on one corner so stray dogs, calves, and goats can also drink without strain.',
      },
      {
        step: '03',
        title: 'Weekly Rock Salt & Lime Sanitization',
        detail: 'Empty the trough weekly, scrub off algae using rock salt, and apply a fresh wash of natural slaked lime (Chuna) for antimicrobial safety.',
      },
      {
        step: '04',
        title: 'Shade Tree or Thatched Overhang',
        detail: 'Position the trough under the canopy of a Neem or Peepal tree to prevent the water from heating up during intense afternoon sun.',
      },
    ],
    seasonalCare: [
      {
        season: 'Summer Peak (March–June)',
        instruction: 'Assign volunteer caretakers from nearby shops to ensure the trough is refilled every morning and afternoon.',
      },
      {
        season: 'Monsoon (July–Sept)',
        instruction: 'Clear gravel and mud buildup from intake channels; check drain plugs to prevent stagnation during heavy rains.',
      },
      {
        season: 'Winter (Nov–Jan)',
        instruction: 'Inspect trough for concrete cracks caused by thermal contraction and seal with waterproof mortar.',
      },
    ],
    dosAndDonts: {
      dos: [
        'Maintain a continuous freshwater supply with float-valve shutoff mechanisms',
        'Plant a fast-growing Neem or Banyan tree beside newly built troughs',
        'Paint contact numbers of local veterinary surgeons and animal ambulances on the side',
      ],
      donts: [
        'Never allow chemical detergents or washing soaps to contaminate animal water troughs',
        'Do not build steep slippery embankments where calves could slide into deep water',
        'Never let stagnant water sit without weekly scrubbing (prevents dengue/malaria larvae)',
      ],
    },
    recommendedMaterials: [
      'High-grade reinforced masonry cement (PPC)',
      'Natural slaked lime (Chuna powder)',
      'Brass float valve mechanism (prevents water wastage)',
      'Course drainage gravel and terracotta overflow piping',
    ],
  },
  {
    id: 'init-water-02',
    title: 'Green Fodder Banks & Emergency Silage Drives',
    subtitle: 'Cultivating high-yield multi-cut perennial fodder grasses and community silage storage during droughts',
    category: 'water_fodder',
    categoryLabel: 'Water & Fodder Networks',
    image: '/images/conservation/fodder-green-harvest.jpg',
    imageAlt: 'Lush green multi-cut fodder grass harvest in an Indian organic farm',
    statsBadge: 'Drought Silage Banks',
    urgencyOrImpact: 'Prevents mass livestock distress sales and starvation in dry spells',
    description: 'During severe droughts and dry pre-monsoon spells across Maharashtra, Rajasthan, and Karnataka, green fodder prices skyrocket, causing catastrophic distress sales of productive cattle. HARIT’s Green Fodder Banks empower village collectives to grow perennial Super Napier, Sorghum (Chari), and Berseem clover with micro-drip irrigation.',
    whyItMatters: 'Dry wheat straw alone lacks the essential beta-carotene, digestible crude protein, and minerals necessary to sustain rumination. Supplying just 15kg of green succulent fodder daily maintains animal immunity and saves millions of cattle from hunger.',
    actionGuide: [
      {
        step: '01',
        title: 'Perennial Super Napier Cultivation',
        detail: 'Plant high-yielding Super Napier (CO-4/CO-5) root slips on unused village common land. It yields 6 to 8 cuts annually with modest irrigation.',
      },
      {
        step: '02',
        title: 'Pit Silage Preservation',
        detail: 'Chop surplus green maize and sorghum at 50% flowering; pack tightly in polythene-lined earthen pits with molasses and salt to ferment into nutritious silage.',
      },
      {
        step: '03',
        title: 'Community Residue Collection',
        detail: 'Collect surplus agricultural straw and pulses husk (Bhoosa) after harvest instead of field burning; store in elevated dry community sheds.',
      },
      {
        step: '04',
        title: 'Emergency Fodder Camps (Chara Chhaoni)',
        detail: 'Establish centralized distribution points where distress-hit smallholders and pastoralists can access clean fodder at nominal subsidized rates.',
      },
    ],
    seasonalCare: [
      {
        season: 'Summer Drought',
        instruction: 'Open silage pits and distribute vacuum-packed fodder bales to Gaushalas and dairy farmers facing dry pasture exhaustion.',
      },
      {
        season: 'Monsoon Sowing',
        instruction: 'Broadcast native drought-hardy legumes like Stylo and Cowpea alongside grass crops to naturally enrich soil nitrogen.',
      },
      {
        season: 'Winter Flush',
        instruction: 'Harvest nutrient-rich Berseem clover (Egyptian clover) and Lucerne, rich in calcium and digestible protein.',
      },
    ],
    dosAndDonts: {
      dos: [
        'Chop green fodder into 1-inch lengths using mechanical chaff cutters to prevent wastage',
        'Store dry fodder bundles at least 1 foot above ground on wooden pallets to prevent damp mold',
        'Equip fodder centers with digital weighing scales and fair allocation tokens for equal access',
      ],
      donts: [
        'Never feed moldy, blackened, or mushroom-infested straw (causes lethal aflatoxin poisoning)',
        'Never feed young sorghum (Jowar) under 45 days old or drought-stunted stalks (causes hydrocyanic acid toxicity)',
        'Do not burn post-harvest crop stubble; convert it to cattle feed or bio-char',
      ],
    },
    recommendedMaterials: [
      'Super Napier hybrid grass stem cuttings',
      'UV-stabilized 200-micron silage poly-film',
      'Motorized heavy-duty chaff cutter (Kutti machine)',
      'Wooden storage pallets and ventilated tarpaulins',
    ],
  },
];
