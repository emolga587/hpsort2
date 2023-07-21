import Sorter from "./Sorter";

/**
 * ボゴソートを行うクラス
 */
export default class BogoSorter extends Sorter {
    sort() {
        this._array = this.shuffle(this._array);
        return true;
    }
}