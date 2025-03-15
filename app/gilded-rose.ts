
abstract class Item {
  constructor(protected _name: string, protected _sellIn: number,  protected _quality: number) {
    _quality = this.normalizeQuality(_quality);
  }
  
  protected normalizeQuality(quality: number) {
    return Math.min(50, Math.max(0, quality));
  }
  private nextDay(): void {
    this._sellIn--;
  }

  public get quality(): number {
    return this._quality;
  }
  protected set quality(q: number) {
    this._quality = this.normalizeQuality(q);
  }

  public get sellIn(): number {
    return this._sellIn;
  }

  public get name(): string {
    return this._name;
  }

  public performDay(): Item {
    this.updateQuality();
    this.nextDay()
    return this;
  }

  public abstract updateQuality(): void;
}
export class GeneralItem extends Item {
  constructor(protected _name: string, protected _sellIn: number,  protected _quality: number) {
    super( _name, _sellIn, _quality)
  }

  public updateQuality(): void {
    this.quality = this.quality - (this.sellIn < 0 ? 2 : 1);
  };
}

export class ConjuredItem<T extends Item> extends Item {
  private readonly CONJURED_MULTIPLIER: number = 2;

  constructor(private _item: T) {
    super(`Conjured ${_item.name}`, _item.sellIn, _item.quality)

    _item.performDay = _item.performDay.bind(this);
    _item.updateQuality = _item.updateQuality.bind(this);
  }

  public static from<T extends Item>(item: T): ConjuredItem<T> {
    return new ConjuredItem(item);
  }

  public get item() {
    return this._item;
  }

  public updateQuality(): void {
    for(let i = 0; i < this.CONJURED_MULTIPLIER; i++) {
      this.item.updateQuality();
    }
  }

  public performDay(): Item {
    return this.item.performDay()
  }
}

export class SulfurasItem extends Item {
  constructor() {
    super('Sulfuras, Hand of Ragnaros', Infinity, 80)
  }
  public updateQuality(): this {
    return this;
  }
}

export class AgedBrieItem extends Item {
  constructor(protected _sellIn: number, protected _quality: number) {
    super('Aged Brie', _sellIn, _quality)
  }
  public updateQuality(): this {
    this.quality = this.quality + (this.sellIn < 0 ? 2 : 1);
    return this;
  }
}

export class BackstagePassesItem extends Item {
  constructor(protected _sellIn: number, protected _quality: number) {
    super('Backstage passes to a TAFKAL80ETC concert', _sellIn, _quality)
  }
  public updateQuality(): this {
    this.quality =
      this.sellIn <= 10 ?
        this.sellIn <= 5 ?
          this.sellIn < 0 ?
            0 :
          this.quality + 3 :
        this.quality + 2 :
      this.quality;
    return this;
  }
}

export class GildedRose {
  constructor(public items: Array<Item> = []) {}

  static from(items: Array<Item>): GildedRose {
    return new GildedRose(items);
  }

  updateQuality(): Array<Item> {
    return this.items.map(x => x.performDay());
  }
}
