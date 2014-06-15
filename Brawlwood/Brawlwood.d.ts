///<reference path="Vector.d.ts" />
///<reference path="Common.d.ts" />
declare class Entity {
    type: string;
    team: string;
}

declare class Friendly extends Entity {
    now(): number;
    say(message: string, data?: any): void;
}

declare class Buildable {
    thangTemplate: string;
    buildCooldown: number;
    goldCost: number;
}

declare class Base extends Friendly {
    build(unit: string): void;
    buildables: { [s: string]: Buildable };
    type: string;
    built: string[];
    gold: number;
    unitNames: string[];
    wait(time: number): void;
}


declare class FriendlyUnit extends Friendly {
    id: string;

    attack(enemy: OtherEntity): void;
    distance(entity: Entity): number;
    distance(pos: IPos): number;
    getEnemies(): OtherEntity[];
    getNearestEnemy(): OtherEntity;
    getFriends(): Friendly[];
}

declare class FriendlyMobile extends FriendlyUnit {
    pos: IPos;
    buildIndex: number;

    getItems(): void;
    move(pos: IPos): void;
}

/* Ogre units */

declare class Munchkin extends FriendlyMobile {

}

declare class Thrower extends FriendlyMobile {
    attackRange: number;
}

declare class Shaman extends FriendlyMobile {
    attackRange: number;
    spellNames: string[];

    canCast(spell: string, target: OtherEntity);
    castShrink(target: OtherEntity);
    castSlow(target: OtherEntity);
}

declare class BeamTower extends FriendlyUnit {
    bountyGold: number;
    attackRange: number;

    hasEffect(effect: string): boolean;
}

/* Human units */

declare class Soldier extends FriendlyMobile {

}

declare class Archer extends FriendlyMobile {
    attackRange: number;
}

declare class Artillery extends FriendlyMobile {
    attackRange: number;
    attackXY(x: number, y: number): void;
}

declare class ArrowTower extends FriendlyUnit {
    bountyGold: number;
    attackRange: number;
}

/* Enemies */

declare class OtherEntity extends Entity {
    id: string;
    pos: IPos;
    health: number;
}

declare class Burl extends OtherEntity {
    bountyGold: number;
    maxHealth: number;
    target: Entity;
}

declare class EnemyTower extends OtherEntity {
    attackRange: number;
    bountyGold: number;
    maxHealth: number;
    spriteName: string;
    target: Entity;
}

declare class EnemyMob extends OtherEntity {
    action: string;
    attackRange: number;
    bountyGold: number;
    buildIndex: number;
    maxHealth: number;
    spriteName: string;
    target: Entity;
    targetPos: IPos;
}

declare class EnemyBase extends OtherEntity {
    buildables: { [s: string]: Buildable };
    built: string[];
    gold: number;
    spriteName: string;
    unitNames: string[];
}


/* Interfaces to implement */

interface IMob {
    chooseAction(): void;
    hear? (speaker: Entity, message: string, data: any): void;
}



interface IBase {
    chooseAction(): void;
    hear? (speaker: Entity, message: string, data: any): void;
}

interface ITower {
    chooseAction(): void;
}