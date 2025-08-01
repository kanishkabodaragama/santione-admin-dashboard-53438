#!/bin/bash
cd /home/kavia/workspace/code-generation/santione-admin-dashboard-53438/santione_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

