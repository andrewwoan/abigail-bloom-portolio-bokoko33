import * as THREE from "three";
import Experience from "../Experience.js";

import Room from "./Room.js";
import Floor from "./Floor.js";
import Controls from "./Controls.js";
import Environment from "./Environment.js";
import { EventEmitter } from "events";

export default class World extends EventEmitter {
    constructor() {
        super();
        this.experience = new Experience();
        this.sizes = this.experience.sizes;
        this.scene = this.experience.scene;
        this.canvas = this.experience.canvas;
        this.camera = this.experience.camera;
        this.resources = this.experience.resources;
        this.theme = this.experience.theme;

        this.resources.on("ready", () => {
            this.environment = new Environment();
            this.floor = new Floor();
            this.room = new Room();
            // this.controls = new Controls();
            this.emit("worldready");
        });

        this.theme.on("switch", (theme) => {
            this.switchTheme(theme);
        });

        // this.sizes.on("switchdevice", (device) => {
        //     this.switchDevice(device);
        // });
    }

    switchTheme(theme) {
        if (this.environment) {
            this.environment.switchTheme(theme);
        }
    }

    // switchDevice(device) {
    //     if (this.controls) {
    //         this.controls.switchDevice(device);
    //     }
    // }

    resize() {}

    update() {
        if (this.room) {
            this.room.update();
        }
        if (this.controls) {
            this.controls.update();
        }
    }
}
