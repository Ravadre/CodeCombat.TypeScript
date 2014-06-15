///<reference path="Brawlwood.d.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var OgreBarracks = (function (_super) {
    __extends(OgreBarracks, _super);
    function OgreBarracks() {
        _super.apply(this, arguments);
    }
    OgreBarracks.prototype.chooseAction = function () {
        // This is the code for your base. Decide which unit to build each frame.
        // Units you build will go into the this.built array.
        // If you don't have enough gold, this.build() won't build anything.
        // You start with 100 gold and receive 2 gold per second.
        // Kill enemies, especially towers and brawlers, to earn more gold.
        // Destroy the enemy base within 90 seconds!
        // Check out the Guide just up and to the left for more info.
        var type = 'munchkin';
        if (this.built.length % 10 === 6)
            type = 'shaman';
        else if (this.built.length % 5 === 2)
            type = 'thrower';

        //this.say('Unit #' + this.built.length + ' will be a ' + type);
        this.build(type);
    };

    OgreBarracks.prototype.hear = function (speaker, message, data) {
        // When the base hears a say() message, this hear() method will be called.
        if (speaker.team !== this.team)
            return;
        // You can add code to respond to the message here.
    };
    return OgreBarracks;
})(Base);

var MyMunchkin = (function (_super) {
    __extends(MyMunchkin, _super);
    function MyMunchkin() {
        _super.apply(this, arguments);
    }
    MyMunchkin.prototype.chooseAction = function () {
        // This code is shared across all your Munchkins.
        // You can use this.buildIndex to have Munchkins do different things.
        // Munchkins are weak but cheap, fast melee units.
        var enemy = this.getNearestEnemy();
        if (enemy && enemy.type !== 'burl') {
            this.attack(enemy);
        } else {
            this.move({ x: 10, y: 10 });
        }
    };

    MyMunchkin.prototype.hear = function (speaker, message, data) {
        // When the munchkin hears a say() message, this hear() method will be called.
        if (speaker.team !== this.team)
            return;
        // You can add code to respond to the message here.
    };
    return MyMunchkin;
})(Munchkin);

var MyShaman = (function (_super) {
    __extends(MyShaman, _super);
    function MyShaman() {
        _super.apply(this, arguments);
    }
    MyShaman.prototype.chooseAction = function () {
        // This code is shared across all your Shamans.
        // Shamans are expensive spellcasters with a weak magic attack
        // plus two crippling spells: 'slow' and 'shrink'.
        var enemy = this.getNearestEnemy();
        if (!enemy)
            this.move({ x: 10, y: 10 });
        else if (this.canCast('shrink', enemy)) {
            this.castShrink(enemy);
            if (this.distance(enemy) <= 30)
                this.say("Shrink, vile " + enemy.type + " " + enemy.id);
        } else {
            this.attack(enemy);
        }
    };

    MyShaman.prototype.hear = function (speaker, message, data) {
        // When the shaman hears a say() message, this hear() method will be called.
        if (speaker.team !== this.team)
            return;
        // You can add code to respond to the message here.
    };
    return MyShaman;
})(Shaman);

var MyThrower = (function (_super) {
    __extends(MyThrower, _super);
    function MyThrower() {
        _super.apply(this, arguments);
    }
    MyThrower.prototype.chooseAction = function () {
        // This code is shared across all your Throwers.
        // You can use this.buildIndex to have Throwers do different things.
        // Throwers are vulnerable but deadly ranged units.
        var enemy = this.getNearestEnemy();
        if (enemy) {
            this.attack(enemy);
        } else {
            this.move({ x: 10, y: 10 });
        }
    };

    MyThrower.prototype.hear = function (speaker, message, data) {
        // When the thrower hears a say() message, this hear() method will be called.
        if (speaker.team !== this.team)
            return;
        // You can add code to respond to the message here.
    };
    return MyThrower;
})(Thrower);

var MyBeamTower = (function (_super) {
    __extends(MyBeamTower, _super);
    function MyBeamTower() {
        _super.apply(this, arguments);
    }
    MyBeamTower.prototype.chooseAction = function () {
        // This code is shared by both your Beam Towers.
        // Don't let your towers die lest the humans claim 250 gold!
        // You probably don't need to change this basic strategy.
        var enemy = this.getNearestEnemy();
        if (enemy && this.distance(enemy) < this.attackRange) {
            this.say("Die, " + enemy.id + "!");
            this.attack(enemy);
        }
    };
    return MyBeamTower;
})(BeamTower);
