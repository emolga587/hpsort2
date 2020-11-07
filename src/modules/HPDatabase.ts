import parse from "csv-parse/lib/sync";
import HP_DB_MEMBERS from "../HP_DB/member.csv";
import HP_DB_GROUPS from "../HP_DB/group.csv";
import HP_DB_JOINS from "../HP_DB/join.csv";

// インターフェイス
interface Member {
    memberID: string;
    memberName: string;
    HPjoinDate: string;
    debutDate: string;
    HPgradDate: string;
}

interface Group {
    groupID: string;
    groupName: string;
    formDate: string;
    dissolveDate: string;
}

interface Join {
    memberID: string;
    groupID: string;
    joinDate: string;
    gradDate: string;
}

export default class HPDatabase {
    private _members: Member[] = [];
    private _groups: Group[] = [];
    private _joins: Join[] = [];

    constructor() {
        this._members = this.fetchCSV(HP_DB_MEMBERS);
        this._groups = this.fetchCSV(HP_DB_GROUPS);
        this._joins = this.fetchCSV(HP_DB_JOINS);
    }
    get currentHPMembers(): string[] {
        let result: string[] = [];
        for (let i of this._members) {
            if (i.debutDate && !i.HPgradDate) {
                result.push(i.memberName);
            }
        }
        return result;
    }

    private groupName2ID = (groupname: string): number => {
        let result = 0;
        // TODO: つくる

        return result;
    }

    private member = (id: number): string => {
        let result = "";
        for (let i of this._members) {
            if (i.memberID === id.toString()) {
                result = i.memberName;
            }
        }
        return result;
    }

    // CSVを取得する
    private fetchCSV = (url: string): any[] => {
        const request = new XMLHttpRequest();
        request.open("GET", url, false);
        request.send(null);
        const csv = request.responseText;
        return parse(csv, { columns: true });
    }
}