interface TaskConfig {
    workerId?: string;
    path: string;
    message: string;
    transfer: Transferable[];
    callback: Function;
    priority: number;
}

interface WorkerConfig {
    url: string;
    worker: Worker;
    inUse: boolean;
}

/**
 * @todo add a function to terminate and remove all tasks
 */

// const maxTasks = navigator.hardwareConcurrency || 4;
const maxTasks = 4;
const delay = 250;

let tasksList: TaskConfig[] = [];
let workerList: WorkerConfig[] = [];
let runningId: number | undefined;

/**
 * Create a new Worker to receive task
 * @param {string} path Path of the worker
 */
export default function newWorker(path: string) {
    return task;

    /**
     * Register a new task
     * @param {Function} callback
     * @param {*} message
     * @param {Transferable[]} [transfer=[]]
     * @param {number} [priority=5]
     * @todo Check parameters
     * @todo return an UID/function so that one can kill the task - in the callback: kill()?
     */
    function task(callback: Function, message: any, transfer: Transferable[] = [], priority = 5) {
        tasksList.push({
            path,
            message,
            transfer,
            callback,
            priority,
        });

        if (!runningId) {
            runningId = setInterval(checkForTasks, delay);
        }
    }
}

/**
 * Reuse an available Worker or create a new one
 * @param {string} path Path of the Worker
 * @return {WorkerConfig}
 */
function getWorker(path: string): WorkerConfig {
    const availableWorkers = workerList.filter(w => w.url === path && !w.inUse);

    /** @type {WorkerConfig} */
    let worker: WorkerConfig;

    if (availableWorkers.length > 0) {
        // reuse an available Worker
        worker = availableWorkers[0];
    } else {
        // create a new Worker
        worker = {
            url: path,
            worker: new Worker(path),
            inUse: false,
        };

        workerList.push(worker);
    }

    return worker;
}

/**
 * Terminate all inactive Workers
 * @todo Prevent workers to be removed too early (delay of 3sec after inUse = false?)
 */
function cleanupWorkers() {
    for (const [idx, worker] of workerList.entries()) {
        if (!worker.inUse) {
            worker.worker.terminate();
            // @ts-ignore
            workerList[idx] = null;
        }
    }

    workerList = workerList.filter(w => w != null);
}

/**
 * Check if a task can run on an available Worker
 */
function checkForTasks() {
    // no more tasks
    if (tasksList.length === 0) {
        cleanupWorkers();

        // and no more active Worker
        // -> stop the interval
        if (workerList.length === 0) {
            clearInterval(runningId);
            runningId = undefined;
        }

        return;
    }

    // check the quantity of currently active workers
    const activeWorkers = workerList.filter(w => w.inUse).length;

    // all workers are still running, check later
    if (activeWorkers >= maxTasks) {
        return;
    }

    const quantityOfTasks = tasksList.length;

    // sort tasks by priority
    tasksList.sort((a, b) => a.priority - b.priority);

    // assign the tasks
    for (let i = 0; i < Math.min(maxTasks - activeWorkers, quantityOfTasks); i += 1) {
        const task = tasksList.shift()!;
        const worker = getWorker(task.path);

        worker.inUse = true;

        worker.worker.onmessage = function(/** @type MessageEvent */event) {
            task.callback(event, () => worker.inUse = false);
        };

        worker.worker.postMessage(task.message, task.transfer);
    }

    cleanupWorkers();
}
