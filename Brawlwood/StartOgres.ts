///<reference path="Brawlwood.d.ts" />

class OgreBarracks extends Base implements IBase {

    chooseAction(): void {
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
    }

    hear(speaker: Entity, message: string, data: any): void {
        // When the base hears a say() message, this hear() method will be called.
        if (speaker.team !== this.team) return;

        // You can add code to respond to the message here.
    }
    
}

class MyMunchkin extends Munchkin implements IMob {
    chooseAction(): void {
        // This code is shared across all your Munchkins.
        // You can use this.buildIndex to have Munchkins do different things.
        // Munchkins are weak but cheap, fast melee units.

        var enemy = this.getNearestEnemy();
        if (enemy && enemy.type !== 'burl') {
            this.attack(enemy);
        }
        else {
            this.move({ x: 10, y: 10 });
        }
    }

    hear(speaker: Entity, message: string, data: any): void {
        // When the munchkin hears a say() message, this hear() method will be called.
        if (speaker.team !== this.team) return;

        // You can add code to respond to the message here.
    }
}


class MyShaman extends Shaman implements IMob {
    chooseAction(): void {
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
        }
        else {
            this.attack(enemy);
        }
    }

    hear(speaker: Entity, message: string, data: any): void {
        // When the shaman hears a say() message, this hear() method will be called.
        if (speaker.team !== this.team) return;

        // You can add code to respond to the message here.
    }
}


class MyThrower extends Thrower implements IMob {
    chooseAction(): void {
        // This code is shared across all your Throwers.
        // You can use this.buildIndex to have Throwers do different things.
        // Throwers are vulnerable but deadly ranged units.

        var enemy = this.getNearestEnemy();
        if (enemy) {
            this.attack(enemy);
        }
        else {
            this.move({ x: 10, y: 10 });
        }
    }

    hear(speaker: Entity, message: string, data: any): void {
        // When the thrower hears a say() message, this hear() method will be called.
        if (speaker.team !== this.team) return;

        // You can add code to respond to the message here.
    }
}

class MyBeamTower extends BeamTower implements ITower {
    chooseAction(): void {
        // This code is shared by both your Beam Towers.
        // Don't let your towers die lest the humans claim 250 gold!
        // You probably don't need to change this basic strategy.

        var enemy = this.getNearestEnemy();
        if (enemy && this.distance(enemy) < this.attackRange) {
            this.say("Die, " + enemy.id + "!");
            this.attack(enemy);
        }
    }
}