import React, { useEffect, useRef } from "react";
import style from "./App.module.css";
import {
    Scene,
    BoxBufferGeometry,
    MeshBasicMaterial,
    Mesh,
    PerspectiveCamera,
    WebGLRenderer,
    AxesHelper,
    Clock,
} from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import dat from "dat.gui";

function App() {
    const canvas = useRef<HTMLCanvasElement>(null);
    const gui = useRef<dat.GUI>();

    let renderer: WebGLRenderer;
    let controls: OrbitControls;

    let sizes = {
        width: window.innerWidth,
        height: window.innerHeight,
    };
    const parameters = {
        color: 0x990000,
    };

    const clock = new Clock();
    const scene = new Scene();
    const geometry = new BoxBufferGeometry(1, 1, 1);
    const material = new MeshBasicMaterial({ color: parameters.color });
    const mesh = new Mesh(geometry, material);
    const axesHelper = new AxesHelper();
    const camera = new PerspectiveCamera(50, sizes.width / sizes.height, 0.1, 100);

    camera.position.z = 7;

    scene.add(mesh);
    scene.add(axesHelper);
    scene.add(camera);

    useEffect(() => {
        if (canvas.current) {
            renderer = new WebGLRenderer({ canvas: canvas.current });
            renderer.setSize(sizes.width, sizes.height);
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
            controls = new OrbitControls(camera, canvas.current);
            controls.enableDamping = true;

            window.addEventListener("resize", () => {
                sizes = {
                    width: window.innerWidth,
                    height: window.innerHeight,
                };
                renderer.setSize(sizes.width, sizes.height);
                renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
                camera.aspect = sizes.width / sizes.height;
                camera.updateProjectionMatrix();
            });
        }

        gui.current = new dat.GUI();
        gui.current.add(mesh.position, "y", -3, 3, 0.01).name("elevation");
        gui.current.add(material, "wireframe");
        gui.current.addColor(parameters, "color").onChange((color) => {
            material.color.set(color);
        });

        return function cleanup() {
            gui.current?.destroy();
        };
    }, []);

    useRequestAnimationFrame((_deltaTime) => {
        mesh.scale.set(2, 0.5, 0.5);
        mesh.rotation.reorder("XYZ");
        mesh.rotation.x = Math.sin(clock.getElapsedTime());
        mesh.rotation.y = Math.cos(clock.getElapsedTime());

        camera.lookAt(mesh.position);

        controls.update();
        renderer.render(scene, camera);
    });

    return <canvas ref={canvas} className={style.webgl}></canvas>;
}

export { App };

function useRequestAnimationFrame(callback: (deltaTime: number) => void) {
    const requestRef = useRef<number>(0);
    const previousTimeRef = useRef<number>();

    const animate = (time: number) => {
        if (previousTimeRef.current != undefined) {
            const deltaTime = time - previousTimeRef.current;

            callback(deltaTime);
        }
        previousTimeRef.current = time;
        requestRef.current = requestAnimationFrame(animate);
    };

    useEffect(() => {
        requestRef.current = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(requestRef.current);
    }, []); // Make sure the effect runs only once
}
