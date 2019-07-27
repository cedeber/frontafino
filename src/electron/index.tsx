import { app, BrowserWindow } from "electron";

let win: null | BrowserWindow = null;

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
    win.loadURL(`http://localhost:8888`);

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
