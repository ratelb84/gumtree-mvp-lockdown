const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const LOG_FILE = '/tmp/gumtree-board.log';
const PID_FILE = '/tmp/gumtree-board-supervisor.pid';

let serverProcess = null;

function log(msg) {
  const timestamp = new Date().toISOString();
  const logMsg = `[${timestamp}] ${msg}\n`;
  console.log(logMsg);
  fs.appendFileSync(LOG_FILE, logMsg);
}

function startServer() {
  if (serverProcess && !serverProcess.killed) {
    log('Server already running');
    return;
  }

  log('Starting Gumtree MVP Board server...');
  
  serverProcess = spawn('node', ['server.js'], {
    cwd: '/data/.openclaw/workspace/gumtree-mvp-lockdown',
    stdio: 'pipe',
  });

  serverProcess.stdout.on('data', (data) => {
    log(`[SERVER] ${data}`);
  });

  serverProcess.stderr.on('data', (data) => {
    log(`[ERROR] ${data}`);
  });

  serverProcess.on('exit', (code) => {
    log(`Server exited with code ${code}. Restarting in 5 seconds...`);
    setTimeout(startServer, 5000);
  });

  log(`Server started (PID: ${serverProcess.pid})`);
  fs.writeFileSync(PID_FILE, serverProcess.pid.toString());
}

function healthCheck() {
  if (!serverProcess || serverProcess.killed) {
    log('Health check: Server not running. Restarting...');
    startServer();
  } else {
    log('Health check: Server running (PID: ' + serverProcess.pid + ')');
  }
}

// Save supervisor PID
fs.writeFileSync(PID_FILE, process.pid.toString());

log('🌳 Gumtree MVP Board Supervisor started');
log(`Logs: ${LOG_FILE}`);

// Start server
startServer();

// Health check every 30 seconds
setInterval(healthCheck, 30000);

// Graceful shutdown
process.on('SIGTERM', () => {
  log('Supervisor shutting down gracefully');
  if (serverProcess) {
    serverProcess.kill();
  }
  process.exit(0);
});

process.on('SIGINT', () => {
  log('Supervisor interrupted');
  if (serverProcess) {
    serverProcess.kill();
  }
  process.exit(0);
});
