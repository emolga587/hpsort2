// インターフェイス
interface Member {
    less: string[];
    equal: string[];
    greater: string[];
}

interface MemberDictionary {
    [id: string]: Member;
}

// ソートのクラス
export default class Sorter {
    items: MemberDictionary = {};
    prev_items: MemberDictionary = {};
    backable: boolean = false;
    protected _array: string[];
    protected _lastChallenge: string[] = [];
    protected _currentRound: number = 0;

    constructor(array: string[]) {
        this._array = this.shuffle(array);
        for (let item of this._array) {
            this.items[item] = {
                less: [],
                equal: [],
                greater: []
            }
        }
    }

    get progress() {
        const rounds = this._array.length * (this._array.length - 1);
        let current = 0;
        for (let name of this._array) {
            current += this.items[name].equal.length;
            current += this.items[name].greater.length;
            current += this.items[name].less.length;
        }
        return Math.round(Math.sqrt(current / rounds) * 100 * 10) / 10;
    }

    get array() {
        return this._array;
    }

    get lastChallenge() {
        return this._lastChallenge;
    }

    get currentRound() {
        return this._currentRound;
    }

    // ソートに成功したらtrueを返す
    sort() {
        try {
            // ソート関数の指定。ここを変えれば、他のソートアルゴリズムに変更出来る
            this._array = this.fordJohnson(this._array.concat());
            return true;
        } catch (e) {
            if (e.message === "ソート不成立") {
                this._currentRound++;
                return false;
            } else {
                console.error(e);
                return false;
            }
        }
    }

    back() {
        this.items = JSON.parse(JSON.stringify(this.prev_items));
        this.backable = false;
        this._currentRound = this._currentRound - 2;
    }

    addResult(greater: string, less: string) {
        if (!(this._array.includes(less) && this._array.includes(greater))) {
            console.log(this._array)
            throw new Error("不正な値です" + String(less) + "/" + String(greater));
        }
        if (less === greater) { return }
        // less側
        if (this.notExist(greater, less)) {
            this.items[less].greater.push(greater);
            for (let item of this.items[less].equal) {
                this.addResult(greater, item);
            }
            for (let item of this.items[less].less) {
                this.addResult(greater, item);
            }
        }

        // greater側
        if (this.notExist(less, greater)) {
            this.items[greater].less.push(less);
            for (let item of this.items[greater].equal) {
                this.addResult(item, less);
            }
            for (let item of this.items[greater].greater) {
                this.addResult(item, less);
            }
        }
    }

    addEqual(val1: string, val2: string) {
        // バリデーション
        if (!(this._array.includes(val1) && this._array.includes(val2))) {
            throw new Error("不正な値です");
        }
        if (val1 === val2) { return }
        // equalの追加
        if (this.notExist(val2, val1)) {
            this.items[val1].equal.push(val2);
            for (let item of this.items[val1].equal) {
                this.addEqual(item, val2);
            }
        }
        if (this.notExist(val1, val2)) {
            this.items[val2].equal.push(val1);
            for (let item of this.items[val2].equal) {
                this.addEqual(item, val1);
            }
        }

        // 大小情報の同期
        for (let item of this.items[val1].greater) {
            this.addResult(item, val2);
        }
        for (let item of this.items[val1].less) {
            this.addResult(val2, item);
        }
        for (let item of this.items[val2].greater) {
            this.addResult(item, val1);
        }
        for (let item of this.items[val2].less) {
            this.addResult(val1, item);
        }
    }

    // TODO: つくる
    rank(member: string) {
        let rank = 1;
        let continue_flag = true;
        for (let i = 0; i < this.array.length && continue_flag; i++) {
            continue_flag = this.array[i] !== member
            if (i > 0) {
                if (this.items[this.array[i]].equal.includes(this.array[i - 1])) {
                    continue;
                }
            }
            rank = i + 1;
        }
        return rank;
    }

    private notExist(item: string, dest: string) {
        return (
            !(this.items[dest].equal.includes(item) || this.items[dest].greater.includes(item) || this.items[dest].less.includes(item))
        );
    }

    protected shuffle([...arr]) {
        let m = arr.length;
        while (m) {
            const i = Math.floor(Math.random() * m--);
            [arr[m], arr[i]] = [arr[i], arr[m]];
        }
        return arr;
    };

    // 大小を比較する（情報不足で比較出来なかった場合は例外を吐く）
    protected compare(greater: string, less: string) {
        this._lastChallenge = [greater, less];
        if (greater === less) {
            return false;
        }
        if (this.items[greater].less.includes(less)) {
            return true;
        } else if (this.items[greater].equal.includes(less) || this.items[greater].greater.includes(less)) {
            return false;
        } else {
            throw new Error("ソート不成立");
        }
    }

    protected fordJohnson = (arr: string[]): string[] => {
        // Jacobsthal配列
        const JACOBSTHAL = [1, 3, 5, 11, 21, 43, 85, 171, 341, 683, 1365, 2731, 5461, 10923, 21845, 43691, 87381, 174763, 349525];

        // 二分挿入
        const binaryInsertion = (collection: string[], item: string): string[] => {
            if (collection.length === 1) {
                if (this.compare(item, collection[0])) {
                    return [item, collection[0]].concat();
                } else {
                    return [collection[0], item].concat();
                }
            } else if (collection.length === 2) {
                if (this.compare(item, collection[0])) {
                    return [item].concat(collection);
                } else if (this.compare(item, collection[1])) {
                    return [collection[0], item, collection[1]].concat();
                } else {
                    return collection.concat([item]);
                }
            }

            let result: string[] = [];
            let pivot = 0;
            let left = 0;
            let right = collection.length - 1;

            while (left < right - 1) {
                pivot = Math.floor((left + right) / 2);
                if (this.compare(item, collection[pivot])) {
                    right = pivot;
                } else {
                    left = pivot;
                }
            }
            result = collection;

            if (left === 0) {
                if (this.compare(item, collection[left])) {
                    return [item].concat(result);
                }
            }

            if (right === collection.length - 1) {
                if (this.compare(collection[right], item)) {
                    return result.concat([item]);
                }
            }

            result.splice(right, 0, item);
            return result;
        }

        // 長さが2未満ならそのまま返却、2なら入れ替えて返却
        if (arr.length < 2) {
            return arr.concat();
        } else if (arr.length === 2) {
            if (this.compare(arr[0], arr[1])) {
                return [arr[0], arr[1]].concat();
            } else {
                return [arr[1], arr[0]].concat();
            }
        }

        let pairs: string[][] = [];
        let pairKeys: string[] = [];
        let surplus: string[] = [];

        // ペアをつくる
        for (let i = 0; i < arr.length; i = i + 2) {
            if (i === arr.length - 1) {
                surplus.push(arr[i]);
            } else if (this.compare(arr[i], arr[i + 1])) {
                pairs.push([arr[i + 1], arr[i]]);
                pairKeys.push(arr[i + 1]);
            } else {
                pairs.push([arr[i], arr[i + 1]]);
                pairKeys.push(arr[i]);
            }
        }

        // ペアをソートする
        let sorted_pairs: string[][] = [];
        pairKeys = this.fordJohnson(pairKeys);
        for (let key of pairKeys) {
            for (let pair of pairs) {
                if (pair[0] === key) {
                    sorted_pairs.push(pair);
                    break;
                }
            }
        }
        let result = pairKeys;

        // 最適な順序で挿入していく
        let insert_order: number[] = [];
        for (let i of JACOBSTHAL) {
            i = i - 1;
            if (i >= sorted_pairs.length) {
                for (let j = sorted_pairs.length - 1; j >= 0; j--) {
                    if (!insert_order.some(num => num === j)) {
                        insert_order.push(j);
                    }
                }
                break;
            }
            insert_order.push(i);
            for (let j = i; j >= 0; j--) {
                if (!insert_order.some(num => num === j)) {
                    insert_order.push(j);
                }
            }
        }

        for (let i of insert_order) {
            let pair = sorted_pairs[i];
            let pivot: number;
            for (pivot = 0; pivot < result.length; pivot++) {
                if (result[pivot] === pair[0]) {
                    break;
                }
            }

            if (pivot === 0) {
                result = [pair[1]].concat(result);
            } else {
                result = binaryInsertion(result.slice(0, pivot), pair[1]).concat(result.slice(pivot));
            }
        }

        if (surplus.length > 0) {
            result = binaryInsertion(result, surplus[0]);
        }

        return result;
    }
}