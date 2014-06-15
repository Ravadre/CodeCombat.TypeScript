///<reference path="Brawlwood.d.ts" />

class HumanBarracks extends Base implements IBase {

    chooseAction(): void {
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
    }

    hear(speaker: Entity, message: string, data: any): void {
        // When the base hears a say() message, this hear() method will be called.
        if (speaker.team !== this.team) return;

        // You can add code to respond to the message here.
    }

}

class MySoldier extends Soldier implements IMob {
    chooseAction(): void {
        // This code is shared across all your Soldiers.
        // You can use this.buildIndex to have Soldiers do different things.
        // Soldiers are low damage, high health melee units.

        var enemy = this.getNearestEnemy();
        if (enemy && enemy.type !== 'burl') {
            this.attack(enemy);
        }
        else {
            this.move({ x: 70, y: 70 });
        }
    }

    hear(speaker: Entity, message: string, data: any): void {
        // When the soldier hears a say() message, this hear() method will be called.
        if (speaker.team !== this.team) return;

        // You can add code to respond to the message here.
    }
}


class MyArtillery extends Artillery implements IMob {
    chooseAction(): void {
        // This code is shared across all your Artillery.
        // Artillery are expensive, slow, and deadly, with high
        // area-of-effect damage that hurts foes and friends alike.

        var enemy = this.getNearestEnemy();
        if (enemy) {
            this.attackXY(enemy.pos.x, enemy.pos.y);
        }
        else {
            this.move({ x: 70, y: 70 });
        }
    }

    hear(speaker: Entity, message: string, data: any): void {
        // When the artillery hears a say() message, this hear() method will be called.
        if (speaker.team !== this.team) return;

        // You can add code to respond to the message here.
    }
}


class MyArcher extends Archer implements IMob {
    chooseAction(): void {
        // This code is shared across all your Archers.
        // You can use this.buildIndex to have Archers do different things.
        // Archers are vulnerable but deadly ranged units.

        var enemy = this.getNearestEnemy();
        if (enemy) {
            this.attack(enemy);
        }
        else {
            this.move({ x: 70, y: 70 });
        }
    }

    hear(speaker: Entity, message: string, data: any): void {
        // When the archer hears a say() message, this hear() method will be called.
        if (speaker.team !== this.team) return;

        // You can add code to respond to the message here.
    }
}

class MyArrowTower extends ArrowTower implements ITower {
    chooseAction(): void {
        // This code is shared by both your Arrow Towers.
        // Don't let your towers die lest the ogres claim 250 gold!
        // You probably don't need to change this basic strategy.

        var enemy = this.getNearestEnemy();
        if (enemy && this.distance(enemy) < this.attackRange) {
            this.say("Die, " + enemy.id + "!");
            this.attack(enemy);
        }
    }
}