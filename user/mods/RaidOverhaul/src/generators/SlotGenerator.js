"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SlotGenerator = void 0;
const tsyringe_1 = require("C:/snapshot/project/node_modules/tsyringe");
//Spt Classes
const DatabaseService_1 = require("C:/snapshot/project/obj/services/DatabaseService");
//Custom Classes
const Enums_1 = require("../models/Enums");
let SlotGenerator = class SlotGenerator {
    databaseService;
    constructor(databaseService) {
        this.databaseService = databaseService;
    }
    /**
     * Pushes my items to the specified slots. Saves a lot of time, space, and my sanity doing it all in json
     *
     */
    buildSlots() {
        const tables = this.databaseService.getTables();
        const items = tables.templates.items;
        items[Enums_1.CustomMap.Aug762]._props.Slots[0]._props.filters[0].Filter = [Enums_1.CustomMap.Aug30Rd, Enums_1.CustomMap.Aug42Rd];
        items[Enums_1.CustomMap.Stm46]._props.Slots[1]._props.filters[0].Filter = [Enums_1.CustomMap.Stm33Rd, Enums_1.CustomMap.Stm50Rd];
        items[Enums_1.CustomMap.Stm46]._props.Slots[2]._props.filters[0].Filter = [Enums_1.CustomMap.StmRec];
        items[Enums_1.CustomMap.Mcm4]._props.Slots[1]._props.filters[0].Filter.push(Enums_1.CustomMap.Mag300);
        items[Enums_1.CustomMap.Mcm4]._props.Slots[1]._props.filters[0].Filter.push(Enums_1.CustomMap.Mag545);
        items[Enums_1.CustomMap.Mcm4]._props.Slots[1]._props.filters[0].Filter.push(Enums_1.CustomMap.Mag57);
        items[Enums_1.CustomMap.Mcm4]._props.Slots[1]._props.filters[0].Filter.push(Enums_1.CustomMap.Mag762);
        items[Enums_1.CustomMap.Mcm4]._props.Slots[1]._props.filters[0].Filter.push(Enums_1.CustomMap.Mag939);
        items[Enums_1.CustomMap.Mcm4]._props.Slots[2]._props.filters[0].Filter.push(Enums_1.CustomMap.Rec300);
        items[Enums_1.CustomMap.Mcm4]._props.Slots[2]._props.filters[0].Filter.push(Enums_1.CustomMap.Rec545);
        items[Enums_1.CustomMap.Mcm4]._props.Slots[2]._props.filters[0].Filter.push(Enums_1.CustomMap.Rec57);
        items[Enums_1.CustomMap.Mcm4]._props.Slots[2]._props.filters[0].Filter.push(Enums_1.CustomMap.Rec762);
        items[Enums_1.CustomMap.Mcm4]._props.Slots[2]._props.filters[0].Filter.push(Enums_1.CustomMap.Rec939);
        items[Enums_1.CustomMap.Judge]._props.Slots[3]._props.filters[0].Filter = [
            Enums_1.CustomMap.Judge17Rd,
            Enums_1.CustomMap.Judge33Rd,
            Enums_1.CustomMap.Judge50Rd,
        ];
        items[Enums_1.CustomMap.Judge]._props.Slots[2]._props.filters[0].Filter = [Enums_1.CustomMap.JudgeSlide];
        items[Enums_1.CustomMap.Jury]._props.Slots[1]._props.filters[0].Filter = [
            Enums_1.CustomMap.Jury20Rd,
            Enums_1.CustomMap.Jury25Rd,
            Enums_1.CustomMap.Jury50Rd,
        ];
        items[Enums_1.CustomMap.Jury]._props.Slots[2]._props.filters[0].Filter = [Enums_1.CustomMap.JuryRec];
        items[Enums_1.CustomMap.Exec]._props.Slots[0]._props.filters[0].Filter = [
            Enums_1.CustomMap.ExecAics,
            Enums_1.CustomMap.ExecPmag,
            Enums_1.CustomMap.ExecWyatt,
        ];
    }
};
exports.SlotGenerator = SlotGenerator;
exports.SlotGenerator = SlotGenerator = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)("DatabaseService")),
    __metadata("design:paramtypes", [typeof (_a = typeof DatabaseService_1.DatabaseService !== "undefined" && DatabaseService_1.DatabaseService) === "function" ? _a : Object])
], SlotGenerator);
//# sourceMappingURL=SlotGenerator.js.map