#!/bin/bash
cd /data/.openclaw/workspace/gumtree-mvp-lockdown
node server.js > /tmp/gumtree-board.log 2>&1 &
echo $! > /tmp/gumtree-board.pid
echo "Board server started (PID: $(cat /tmp/gumtree-board.pid))"
