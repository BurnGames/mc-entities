function Entity(id, world) {
    this.id = id;
    this.world = world;

    this.x = 0;
    this.y = 0;
    this.z = 0;
    this.yaw = 0.0;
    this.pitch = 0.0;

    this.velocityX = 0.0;
    this.velocityY = 0.0;
    this.velocityZ = 0.0;

    this.fallDistance = 0.0;
    this.fireTicks = 0;
    this.ageTicks = 0;

    this.valid = true;

    this.passenger = null;
    this.mount = null;
}

Entity.prototype.maxFireTicks = 0;
Entity.prototype.fireProof = true;

Entity.prototype.teleport = function (x, y, z, yaw, pitch) {
    if (x instanceof Entity) {
        this.x = x.x;
        this.y = x.y;
        this.z = x.z;
        this.yaw = x.yaw;
        this.pitch = x.pitch;
        return;
    }

    this.x = isNaN(x) ? this.x : x;
    this.y = isNaN(y) ? this.y : y;
    this.y = isNaN(z) ? this.z : z;
    this.yaw = isNaN(yaw) ? this.yaw : yaw;
    this.pitch = isNaN(pitch) ? this.pitch : pitch;
};

Entity.prototype.getNearbyEntities = function (xDistance, yDistance, zDistance) {
    return this.world.getNearbyEntities(this.x, this.y, this.z, xDistance, yDistance, zDistance);
};

Entity.prototype.remove = function() {
    this.valid = false;
};

Entity.prototype.setPassenger = function (passenger) {
    passenger.mount = this;
    this.ride = passenger;
};

Entity.prototype.eject = function() {
    if (this.passenger) {
        this.passenger.mount = null;
        this.ride = null;
    }
};

Entity.prototype.tick = function() {
    if (this.mount && !this.mount.valid) {
        this.mount.eject();
    }

    if (this.fireTicks > 0) {
        if (this.fireProof) {
            this.fireTicks = Math.max(0, this.fireTicks - 4);
        } else {
            if (this.fireTicks % 20 == 0 && this.damage) {
                this.damage(1, Entity.DamageType.FIRE_TICK);
            }
            this.fireTicks--;
        }
    }
    if (this.y < -64) {
        if (this.damage) {
            this.damage(2, Entity.DamageType.VOID);
        } else {
            this.remove();
        }
    }
};

Entity.DamageType = {
    FIRE_TICK: Entity.DamageType.FIRE_TICK,
    VOID: Entity.DamageType.VOID
};

Entity.LivingEntity = require('./living/LivingEntity');

module.exports = Entity;
