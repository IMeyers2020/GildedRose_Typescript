import { GildedRose, AgedBrieItem, SulfurasItem, BackstagePassesItem, GeneralItem, ConjuredItem } from '../app/gilded-rose';

const items = [
  new GeneralItem("+5 Dexterity Vest", 10, 20),
  new AgedBrieItem(2, 0),
  new GeneralItem("Elixir of the Mongoose", 5, 7),
  new SulfurasItem(),
  new SulfurasItem(),
  new BackstagePassesItem(15, 20),
  new BackstagePassesItem(10, 49),
  new BackstagePassesItem(5, 49),
  ConjuredItem.from(new GeneralItem("Mana Cake", 3, 6))
];


const gildedRose = GildedRose.from(items);

let days: number = 2;
if (process.argv.length > 2) {
    days = +process.argv[2];
  }

for (let i = 0; i < days + 1; i++) {
  console.log("-------- day " + i + " --------");
  console.log("name, sellIn, quality");
  items.forEach(element => {
    console.log(element.name + ', ' + element.sellIn + ', ' + element.quality);

  });
  console.log();
  gildedRose.updateQuality();
}
