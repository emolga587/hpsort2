import Sorter from "./Sorter";

export default class BogoSorter extends Sorter {
    sort() {
        this._array = this.shuffle(this._array);
        return true;
    }
}