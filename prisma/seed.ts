import { PrismaClient } from '../generated/prisma/index.js'
import { PrismaMariaDb } from '@prisma/adapter-mariadb'
import mariadb from 'mariadb'

const pool = mariadb.createPool({
  host: '127.0.0.1',
  user: 'root',
  password: 'root',
  database: 'heroes_factory',
  port: 3306,
})

const adapter = new PrismaMariaDb(pool)
const prisma = new PrismaClient({ adapter })

const realHeroes = [
  { name: 'Bruce Wayne', nickname: 'Batman', universe: 'DC', main_power: 'Intellect & Gadgets' },
  { name: 'Clark Kent', nickname: 'Superman', universe: 'DC', main_power: 'Super Strength & Flight' },
  { name: 'Diana Prince', nickname: 'Wonder Woman', universe: 'DC', main_power: 'Super Strength & Agility' },
  { name: 'Barry Allen', nickname: 'The Flash', universe: 'DC', main_power: 'Super Speed' },
  { name: 'Hal Jordan', nickname: 'Green Lantern', universe: 'DC', main_power: 'Power Ring' },
  { name: 'Arthur Curry', nickname: 'Aquaman', universe: 'DC', main_power: 'Atlantean Physiology & Telepathy' },
  { name: 'Victor Stone', nickname: 'Cyborg', universe: 'DC', main_power: 'Cybernetic Enhancements' },
  { name: 'J\'onn J\'onzz', nickname: 'Martian Manhunter', universe: 'DC', main_power: 'Shapeshifting & Telepathy' },
  { name: 'Oliver Queen', nickname: 'Green Arrow', universe: 'DC', main_power: 'Archery & Martial Arts' },
  { name: 'Dinah Lance', nickname: 'Black Canary', universe: 'DC', main_power: 'Canary Cry' },
  { name: 'Ray Palmer', nickname: 'The Atom', universe: 'DC', main_power: 'Size Manipulation' },
  { name: 'Carter Hall', nickname: 'Hawkman', universe: 'DC', main_power: 'Nth Metal Harness' },
  { name: 'Kendra Saunders', nickname: 'Hawkgirl', universe: 'DC', main_power: 'Nth Metal Wings' },
  { name: 'John Constantine', nickname: 'Constantine', universe: 'DC', main_power: 'Dark Magic' },
  { name: 'Zatanna Zatara', nickname: 'Zatanna', universe: 'DC', main_power: 'Magic' },
  { name: 'Dick Grayson', nickname: 'Nightwing', universe: 'DC', main_power: 'Acrobatics & Martial Arts' },
  { name: 'Barbara Gordon', nickname: 'Batgirl', universe: 'DC', main_power: 'Genius Intellect' },
  { name: 'Jason Todd', nickname: 'Red Hood', universe: 'DC', main_power: 'Marksmanship' },
  { name: 'Tim Drake', nickname: 'Red Robin', universe: 'DC', main_power: 'Detective Skills' },
  { name: 'Damian Wayne', nickname: 'Robin', universe: 'DC', main_power: 'Martial Arts' },
  { name: 'Peter Parker', nickname: 'Spider-Man', universe: 'Marvel', main_power: 'Wall-Crawling & Spider-Sense' },
  { name: 'Tony Stark', nickname: 'Iron Man', universe: 'Marvel', main_power: 'Powered Armor' },
  { name: 'Steve Rogers', nickname: 'Captain America', universe: 'Marvel', main_power: 'Super Soldier Serum' },
  { name: 'Thor Odinson', nickname: 'Thor', universe: 'Marvel', main_power: 'God of Thunder' },
  { name: 'Bruce Banner', nickname: 'Hulk', universe: 'Marvel', main_power: 'Unlimited Strength' },
  { name: 'Natasha Romanoff', nickname: 'Black Widow', universe: 'Marvel', main_power: 'Expert Spy & Assassin' },
  { name: 'Clint Barton', nickname: 'Hawkeye', universe: 'Marvel', main_power: 'Master Archer' },
  { name: 'Wanda Maximoff', nickname: 'Scarlet Witch', universe: 'Marvel', main_power: 'Chaos Magic' },
  { name: 'Vision', nickname: 'Vision', universe: 'Marvel', main_power: 'Density Manipulation & Energy Blasts' },
  { name: 'Sam Wilson', nickname: 'Falcon', universe: 'Marvel', main_power: 'Flight Suit' },
  { name: 'Bucky Barnes', nickname: 'Winter Soldier', universe: 'Marvel', main_power: 'Cybernetic Arm & Marksmanship' },
  { name: 'T\'Challa', nickname: 'Black Panther', universe: 'Marvel', main_power: 'Enhanced Senses & Vibranium Suit' },
  { name: 'Stephen Strange', nickname: 'Doctor Strange', universe: 'Marvel', main_power: 'Mystic Arts' },
  { name: 'Scott Lang', nickname: 'Ant-Man', universe: 'Marvel', main_power: 'Size Manipulation' },
  { name: 'Hope van Dyne', nickname: 'The Wasp', universe: 'Marvel', main_power: 'Flight & Energy Blasts' },
  { name: 'Carol Danvers', nickname: 'Captain Marvel', universe: 'Marvel', main_power: 'Energy Projection & Flight' },
  { name: 'Peter Quill', nickname: 'Star-Lord', universe: 'Marvel', main_power: 'Expert Tactician & Marksmanship' },
  { name: 'Gamora', nickname: 'Gamora', universe: 'Marvel', main_power: 'Superhuman Strength & Agility' },
  { name: 'Drax', nickname: 'Drax the Destroyer', universe: 'Marvel', main_power: 'Superhuman Strength' },
  { name: 'Rocket', nickname: 'Rocket Raccoon', universe: 'Marvel', main_power: 'Weaponry & Tactics' },
  { name: 'Groot', nickname: 'Groot', universe: 'Marvel', main_power: 'Flora Colossus Physiology' },
  { name: 'Mantis', nickname: 'Mantis', universe: 'Marvel', main_power: 'Empathy' },
  { name: 'Nebula', nickname: 'Nebula', universe: 'Marvel', main_power: 'Cybernetic Enhancements' },
  { name: 'Matthew Murdock', nickname: 'Daredevil', universe: 'Marvel', main_power: 'Radar Sense' },
  { name: 'Jessica Jones', nickname: 'Jessica Jones', universe: 'Marvel', main_power: 'Superhuman Strength' },
  { name: 'Luke Cage', nickname: 'Luke Cage', universe: 'Marvel', main_power: 'Unbreakable Skin' },
  { name: 'Danny Rand', nickname: 'Iron Fist', universe: 'Marvel', main_power: 'Chi Manipulation' },
  { name: 'Frank Castle', nickname: 'The Punisher', universe: 'Marvel', main_power: 'Expert Tactician & Marksmanship' },
  { name: 'Marc Spector', nickname: 'Moon Knight', universe: 'Marvel', main_power: 'Lunar Strength' },
  { name: 'Shang-Chi', nickname: 'Shang-Chi', universe: 'Marvel', main_power: 'Master of Kung Fu' },
  { name: 'Kamala Khan', nickname: 'Ms. Marvel', universe: 'Marvel', main_power: 'Shapeshifting' },
  { name: 'Logan', nickname: 'Wolverine', universe: 'Marvel', main_power: 'Healing Factor & Adamantium Claws' },
  { name: 'Charles Xavier', nickname: 'Professor X', universe: 'Marvel', main_power: 'Telepathy' },
  { name: 'Jean Grey', nickname: 'Phoenix', universe: 'Marvel', main_power: 'Telekinesis & Telepathy' },
  { name: 'Scott Summers', nickname: 'Cyclops', universe: 'Marvel', main_power: 'Optic Blasts' },
  { name: 'Ororo Munroe', nickname: 'Storm', universe: 'Marvel', main_power: 'Weather Manipulation' },
  { name: 'Hank McCoy', nickname: 'Beast', universe: 'Marvel', main_power: 'Genius Intellect & Animal Physiology' },
  { name: 'Anna Marie', nickname: 'Rogue', universe: 'Marvel', main_power: 'Power Absorption' },
  { name: 'Remy LeBeau', nickname: 'Gambit', universe: 'Marvel', main_power: 'Kinetic Energy Manipulation' },
  { name: 'Kurt Wagner', nickname: 'Nightcrawler', universe: 'Marvel', main_power: 'Teleportation' },
  { name: 'Piotr Rasputin', nickname: 'Colossus', universe: 'Marvel', main_power: 'Organic Steel Form' },
  { name: 'Kitty Pryde', nickname: 'Shadowcat', universe: 'Marvel', main_power: 'Phasing' },
  { name: 'Bobby Drake', nickname: 'Iceman', universe: 'Marvel', main_power: 'Cryokinesis' },
  { name: 'Warren Worthington III', nickname: 'Angel', universe: 'Marvel', main_power: 'Flight' },
  { name: 'Emma Frost', nickname: 'White Queen', universe: 'Marvel', main_power: 'Telepathy & Diamond Form' },
  { name: 'Lorna Dane', nickname: 'Polaris', universe: 'Marvel', main_power: 'Magnetism' },
  { name: 'Alex Summers', nickname: 'Havok', universe: 'Marvel', main_power: 'Cosmic Energy Absorption' },
  { name: 'Illyana Rasputina', nickname: 'Magik', universe: 'Marvel', main_power: 'Teleportation & Magic' },
  { name: 'Jubilation Lee', nickname: 'Jubilee', universe: 'Marvel', main_power: 'Pyrotechnic Energy Plasmoids' },
  { name: 'Lucas Bishop', nickname: 'Bishop', universe: 'Marvel', main_power: 'Energy Absorption' },
  { name: 'Nathan Summers', nickname: 'Cable', universe: 'Marvel', main_power: 'Telekinesis & Telepathy' },
  { name: 'Wade Wilson', nickname: 'Deadpool', universe: 'Marvel', main_power: 'Regeneration' },
  { name: 'Reed Richards', nickname: 'Mister Fantastic', universe: 'Marvel', main_power: 'Elasticity & Genius Intellect' },
  { name: 'Sue Storm', nickname: 'Invisible Woman', universe: 'Marvel', main_power: 'Invisibility & Force Fields' },
  { name: 'Johnny Storm', nickname: 'Human Torch', universe: 'Marvel', main_power: 'Pyrokinesis & Flight' },
  { name: 'Ben Grimm', nickname: 'The Thing', universe: 'Marvel', main_power: 'Superhuman Strength & Rock-like Skin' },
  { name: 'Billy Batson', nickname: 'Shazam', universe: 'DC', main_power: 'Wisdom, Strength, Stamina, Power, Courage, Speed' },
  { name: 'Kara Zor-El', nickname: 'Supergirl', universe: 'DC', main_power: 'Super Strength & Flight' },
  { name: 'Arthur Light', nickname: 'Doctor Light', universe: 'DC', main_power: 'Photokinesis' },
  { name: 'Garfield Logan', nickname: 'Beast Boy', universe: 'DC', main_power: 'Shapeshifting into Animals' },
  { name: 'Rachel Roth', nickname: 'Raven', universe: 'DC', main_power: 'Empathy, Magic, Telekinesis' },
  { name: 'Koriand\'r', nickname: 'Starfire', universe: 'DC', main_power: 'Energy Absorption & Projection' },
  { name: 'Wally West', nickname: 'Kid Flash', universe: 'DC', main_power: 'Super Speed' },
  { name: 'Donna Troy', nickname: 'Wonder Girl', universe: 'DC', main_power: 'Super Strength & Agility' },
  { name: 'Roy Harper', nickname: 'Arsenal', universe: 'DC', main_power: 'Marksmanship' },
  { name: 'Garth', nickname: 'Aqualad', universe: 'DC', main_power: 'Atlantean Physiology & Magic' },
  { name: 'Jaime Reyes', nickname: 'Blue Beetle', universe: 'DC', main_power: 'Alien Armor' },
  { name: 'Michael Jon Carter', nickname: 'Booster Gold', universe: 'DC', main_power: 'Time Travel Technology' },
  { name: 'Ted Kord', nickname: 'Blue Beetle (II)', universe: 'DC', main_power: 'Genius Intellect & Gadgets' },
  { name: 'Nathaniel Adam', nickname: 'Captain Atom', universe: 'DC', main_power: 'Energy Manipulation' },
  { name: 'Ronnie Raymond', nickname: 'Firestorm', universe: 'DC', main_power: 'Nuclear Manipulation' },
  { name: 'Kent Nelson', nickname: 'Doctor Fate', universe: 'DC', main_power: 'Magic' },
  { name: 'Jim Corrigan', nickname: 'The Spectre', universe: 'DC', main_power: 'Nigh-Omnipotence' },
  { name: 'Alec Holland', nickname: 'Swamp Thing', universe: 'DC', main_power: 'Chlorokinesis' },
  { name: 'Buddy Baker', nickname: 'Animal Man', universe: 'DC', main_power: 'Animal Powers Borrowing' },
  { name: 'Mister Miracle', nickname: 'Scott Free', universe: 'DC', main_power: 'Escape Artistry' },
  { name: 'Big Barda', nickname: 'Barda Free', universe: 'DC', main_power: 'Super Strength & Apokoliptian Tech' },
  { name: 'Orion', nickname: 'Orion', universe: 'DC', main_power: 'Super Strength & Astro Harness' },
  { name: 'Kyle Rayner', nickname: 'Green Lantern (V)', universe: 'DC', main_power: 'Power Ring' },
  { name: 'Guy Gardner', nickname: 'Green Lantern (III)', universe: 'DC', main_power: 'Power Ring' },
  { name: 'John Stewart', nickname: 'Green Lantern (IV)', universe: 'DC', main_power: 'Power Ring' },
  { name: 'Jessica Cruz', nickname: 'Green Lantern (VI)', universe: 'DC', main_power: 'Power Ring' },
  { name: 'Simon Baz', nickname: 'Green Lantern (VII)', universe: 'DC', main_power: 'Power Ring' },
  { name: 'Miles Morales', nickname: 'Spider-Man (Miles)', universe: 'Marvel', main_power: 'Wall-Crawling, Spider-Sense, Venom Blast' },
  { name: 'Gwen Stacy', nickname: 'Spider-Gwen', universe: 'Marvel', main_power: 'Wall-Crawling & Spider-Sense' },
  { name: 'Miguel O\'Hara', nickname: 'Spider-Man 2099', universe: 'Marvel', main_power: 'Wall-Crawling & Talons' },
  { name: 'Jessica Drew', nickname: 'Spider-Woman', universe: 'Marvel', main_power: 'Wall-Crawling & Venom Blasts' },
  { name: 'Cindy Moon', nickname: 'Silk', universe: 'Marvel', main_power: 'Wall-Crawling & Organic Webbing' },
  { name: 'Kaine Parker', nickname: 'Scarlet Spider', universe: 'Marvel', main_power: 'Wall-Crawling & Mark of Kaine' },
  { name: 'Ben Reilly', nickname: 'Scarlet Spider (II)', universe: 'Marvel', main_power: 'Wall-Crawling & Spider-Sense' }
]

async function main() {
  console.log('Clearing existing heroes...')
  await prisma.hero.deleteMany({})

  console.log('Seeding heroes...')
  
  // create dynamically from realHeroes adding extra duplicates safely to reach beyond 110 if needed
  const heroesData = realHeroes.map((hero, index) => {
    return {
      ...hero,
      date_of_birth: new Date(1970, 0, (index % 28) + 1),
      is_active: index % 5 !== 0,
    }
  })

  // let's just use the length of realHeroes, which is around 110
  await prisma.hero.createMany({
    data: heroesData,
  })

  console.log('Seeding completed. Inserted', heroesData.length, 'heroes.')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
