import React, { useEffect, useRef } from "react";
import {
    Scene,
    BoxGeometry,
    MeshBasicMaterial,
    Mesh,
    PerspectiveCamera,
    WebGLRenderer,
    AxesHelper,
    Clock,
} from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

function App() {
    const canvas = useRef<HTMLCanvasElement>(null);
    const renderer = useRef<WebGLRenderer>();
    const controls = useRef<OrbitControls>();

    const sizes = { width: 800, height: 600 };

    const clock = new Clock();
    const scene = new Scene();
    const geometry = new BoxGeometry(1, 1, 1);
    const material = new MeshBasicMaterial({ color: 0x990000 });
    const mesh = new Mesh(geometry, material);
    const axesHelper = new AxesHelper();
    const camera = new PerspectiveCamera(50, sizes.width / sizes.height, 0.1, 100);

    camera.position.z = 7;

    scene.add(mesh);
    scene.add(axesHelper);
    scene.add(camera);

    useEffect(() => {
        if (canvas.current) {
            renderer.current = new WebGLRenderer({ canvas: canvas.current });
            controls.current = new OrbitControls(camera, canvas.current);

            renderer.current.setSize(sizes.width, sizes.height);
            controls.current.enableDamping = true;
        }
    }, [canvas]);

    useRequestAnimationFrame((_deltaTime) => {
        if (renderer.current && controls.current) {
            mesh.position.set(0.7, -0.6, 1);
            mesh.scale.set(2, 0.5, 0.5);
            mesh.rotation.reorder("XYZ");
            mesh.rotation.x = Math.sin(clock.getElapsedTime());
            mesh.rotation.y = Math.cos(clock.getElapsedTime());

            camera.lookAt(mesh.position);

            controls.current.update();
            renderer.current.render(scene, camera);
        }
    });

    return <canvas ref={canvas}></canvas>;
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
