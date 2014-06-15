///<reference path="Brawlwood.d.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var HumanBarracks = (function (_super) {
    __extends(HumanBarracks, _super);
    function HumanBarracks() {
        _super.apply(this, arguments);
    }
    HumanBarracks.prototype.chooseAction = function () {
        // This is the code for your base. Decide which unit to build each frame.
        // Units you build will go into the this.built array.
        // If you don't have enough gold, this.build() won't build anything.
        // You start with 100 gold and receive 2 gold per second.
        // Kill enemies, especially towers and brawlers, to earn more gold.
        // Destroy the enemy base within 90 seconds!
        // Check out the Guide just up and to the left for more info.
        var type = 'soldier';
        if (this.built.length % 6 === 5)
            type = 'artillery';
        else if (this.built.length % 3 === 1)
            type = 'archer';

        //this.say('Unit #' + this.built.length + ' will be a ' + type);
        this.build(type);
    };

    HumanBarracks.prototype.hear = function (speaker, message, data) {
        // When the base hears a say() message, this hear() method will be called.
        if (speaker.team !== this.team)
            return;
        // You can add code to respond to the message here.
    };
    return HumanBarracks;
})(Base);

var MySoldier = (function (_super) {
    __extends(MySoldier, _super);
    function MySoldier() {
        _super.apply(this, arguments);
    }
    MySoldier.prototype.chooseAction = function () {
        // This code is shared across all your Soldiers.
        // You can use this.buildIndex to have Soldiers do different things.
        // Soldiers are low damage, high health melee units.
        var enemy = this.getNearestEnemy();
        if (enemy && enemy.type !== 'burl') {
            this.attack(enemy);
        } else {
            this.move({ x: 70, y: 70 });
        }
    };

    MySoldier.prototype.hear = function (speaker, message, data) {
        // When the soldier hears a say() message, this hear() method will be called.
        if (speaker.team !== this.team)
            return;
        // You can add code to respond to the message here.
    };
    return MySoldier;
})(Soldier);

var MyArtillery = (function (_super) {
    __extends(MyArtillery, _super);
    function MyArtillery() {
        _super.apply(this, arguments);
    }
    MyArtillery.prototype.chooseAction = function () {
        // This code is shared across all your Artillery.
        // Artillery are expensive, slow, and deadly, with high
        // area-of-effect damage that hurts foes and friends alike.
        var enemy = this.getNearestEnemy();
        if (enemy) {
            this.attackXY(enemy.pos.x, enemy.pos.y);
        } else {
            this.move({ x: 70, y: 70 });
        }
    };

    MyArtillery.prototype.hear = function (speaker, message, data) {
        // When the artillery hears a say() message, this hear() method will be called.
        if (speaker.team !== this.team)
            return;
        // You can add code to respond to the message here.
    };
    return MyArtillery;
})(Artillery);

var MyArcher = (function (_super) {
    __extends(MyArcher, _super);
    function MyArcher() {
        _super.apply(this, arguments);
    }
    MyArcher.prototype.chooseAction = function () {
        // This code is shared across all your Archers.
        // You can use this.buildIndex to have Archers do different things.
        // Archers are vulnerable but deadly ranged units.
        var enemy = this.getNearestEnemy();
        if (enemy) {
            this.attack(enemy);
        } else {
            this.move({ x: 70, y: 70 });
        }
    };

    MyArcher.prototype.hear = function (speaker, message, data) {
        // When the archer hears a say() message, this hear() method will be called.
        if (speaker.team !== this.team)
            return;
        // You can add code to respond to the message here.
    };
    return MyArcher;
})(Archer);

var MyArrowTower = (function (_super) {
    __extends(MyArrowTower, _super);
    function MyArrowTower() {
        _super.apply(this, arguments);
    }
    MyArrowTower.prototype.chooseAction = function () {
        // This code is shared by both your Arrow Towers.
        // Don't let your towers die lest the ogres claim 250 gold!
        // You probably don't need to change this basic strategy.
        var enemy = this.getNearestEnemy();
        if (enemy && this.distance(enemy) < this.attackRange) {
            this.say("Die, " + enemy.id + "!");
            this.attack(enemy);
        }
    };
    return MyArrowTower;
})(ArrowTower);
