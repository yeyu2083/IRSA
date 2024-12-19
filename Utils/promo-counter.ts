export class PromoCounter {
    private static counter = 0;

    static getNextName(): string {
        this.counter++;
        return `Promo_Test_${this.counter}`;
    }
}