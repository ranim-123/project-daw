const { spawn } = require('child_process');
const path = require('path');

// Start backend server
const backend = spawn('npm', ['run', 'dev'], {
  cwd: path.join(__dirname, 'backend'),
  stdio: 'inherit',
  shell: true
});

// Start frontend server (using live-server or similar)
const frontend = spawn('npx', ['live-server', '--port=5500'], {
  cwd: __dirname,
  stdio: 'inherit',
  shell: true
});

// Handle process termination
process.on('SIGINT', () => {
  backend.kill();
  frontend.kill();
  process.exit();
});

console.log('Development servers started:');
console.log('- Backend: http://localhost:3000');
console.log('- Frontend: http://localhost:5500');