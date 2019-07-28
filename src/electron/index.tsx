import { app, BrowserWindow } from "electron";
import { fork, ChildProcess } from "child_process";

let serverProcess: null | ChildProcess = null;;
let win: null | BrowserWindow = null;
let serverRunning = false;

function createWindow() {
    // Cree la fenetre du navigateur.
    win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
        },
    });

    // and load the index.html of the app.
    // win.loadFile("index.html");
    if (process.env.NODE_ENV === "development") {
        win.loadURL("http://localhost:8888");
    }
    else if (serverRunning) {
        win.loadURL(`http://localhost:${process.env.PORT || 5677}`);
    } else {
        serverProcess = fork("./server.js");
        serverProcess.on("message", m => {
            if (m === "started" && win) {
                serverRunning = true;
                win.loadURL(`http://localhost:${process.env.PORT || 5677}`);
            }
        });
    }

    // const openExternalLinksInOSBrowser = (event: any, url: string) => {
    //     if (url.match(/.*localhost.*/gi) === null && (url.startsWith("http:") || url.startsWith("https:"))) {
    //         event.preventDefault();
    //         shell.openExternal(url);
    //     }
    // };
    //
    // mainWindow.webContents.on("new-window", openExternalLinksInOSBrowser);
    // mainWindow.webContents.on("will-navigate", openExternalLinksInOSBrowser);

    // Émit lorsque la fenêtre est fermée.
    win.on("closed", () => {
        // Dé-référence l'objet window , normalement, vous stockeriez les fenêtres
        // dans un tableau si votre application supporte le multi-fenêtre. C'est le moment
        // où vous devez supprimer l'élément correspondant.
        win = null;
    });
}

// Cette méthode sera appelée quant Electron aura fini
// de s'initialiser et sera prêt à créer des fenêtres de navigation.
// Certaines APIs peuvent être utilisées uniquement quand cet événement est émit.
app.on("ready", createWindow);

// Quitte l'application quand toutes les fenêtres sont fermées.
app.on("window-all-closed", () => {
    // Sur macOS, il est commun pour une application et leur barre de menu
    // de rester active tant que l'utilisateur ne quitte pas explicitement avec Cmd + Q
    if (process.platform !== "darwin") {
        app.quit();
    }
});

app.on("activate", () => {
    // Sur macOS, il est commun de re-créer une fenêtre de l'application quand
    // l'icône du dock est cliquée et qu'il n'y a pas d'autres fenêtres d'ouvertes.
    if (win === null) {
        createWindow();
    }
});

app.on("will-quit", () => {
    if (process.env.NODE_ENV === "production" && serverProcess) {
        serverProcess.kill();
    }
});
