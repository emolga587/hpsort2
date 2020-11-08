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

class HPDatabase {
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

    get currentHPMembersIncludeTrainee(): string[] {
        let result: string[] = [];
        for (let i of this._members) {
            if (!i.HPgradDate) {
                result.push(i.memberName);
            }
        }
        return result;
    }

    groupNameByMemberName = (memberName: string): string => {
        let result = "Hello! Project"
        const memberID = this.memberName2ID(memberName);
        for(let i of this._joins){
            if(i.memberID === memberID && !i.gradDate){
                result = this.groupName(i.groupID);
            }
        }
        return result;
    }

    membersByGroup = (groupname: string): string[] => {
        const groupID = this.groupName2ID(groupname);
        let result: string[] = [];
        for(let i of this._joins){
            if(i.groupID === groupID && !i.gradDate && !result.includes(this.memberName(i.memberID))){
                result.push(this.memberName(i.memberID));
            }
        }
        console.debug(groupname);
        console.log(result);
        return result;
    }

    private groupName2ID = (groupname: string): string => {
        let result = 0;
        for (let i of this._groups){
            if(i.groupName === groupname){
                result = Number(i.groupID);
            }
        }
        return result.toString();
    }

    private memberName2ID = (membername: string): string => {
        let result = 0;
        for (let i of this._members){
            if(i.memberName === membername){
                result = Number(i.memberID);
            }
        }
        return result.toString();
    }

    private memberName = (id: string): string => {
        let result = "";
        for (let i of this._members) {
            if (i.memberID === id) {
                result = i.memberName;
            }
        }
        return result;
    }

    private groupName = (id: string): string => {
        let result = "";
        for (let i of this._groups) {
            if (i.groupID === id) {
                result = i.groupName;
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

const hpDB = new HPDatabase();
export default hpDB;