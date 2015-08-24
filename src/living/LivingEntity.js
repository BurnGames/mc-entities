var Entity = require('../Entity');
var util = require('util');

function LivingEntity(id, world) {
    this.super_.call(this, id, world);

    this.airTicks = 0;
    this.health = 0.0;
    this.maxHealth = 0.0;
}
util.inherits(LivingEntity, Entity);

LivingEntity.prototype.eyeHeight = 0.0;

LivingEntity.prototype.maximumAir = 0;

LivingEntity.prototype.maxHealth = 0;
LivingEntity.prototype.health = 0;

LivingEntity.prototype.fireProof = false;

LivingEntity.prototype.launchProjectile = function (projectileFunc) {
    var projectile = this.world.launchProjectile(projectileFunc, this.x, this.y + this.eyeHeight, this.z, this.yaw, this.pitch);
    projectile.shooter = this;
};

LivingEntity.prototype.damage = function (damage, type, entity) {
    this.health -= damage;
    // todo damage event
};

LivingEntity.prototype.tick = function () {
    this.super_.tick.call(this);

    if (this.health <= 0) {
        this.valid = false;
        // todo death event
    } else {
        // todo drowning
    }
};

module.exports = LivingEntity;
