FROM node:20-alpine
WORKDIR /app
COPY backend/package*.json ./
RUN npm install --production
COPY backend/. .
ENV PORT=8080
ENV ORIGIN=*
# Optional envs to set in Render dashboard:
# FIREBASE_PROJECT_ID, FIREBASE_STORAGE_BUCKET, SERVICE_ACCOUNT_JSON
CMD node -e "const fs=require('fs'); if(process.env.SERVICE_ACCOUNT_JSON){fs.writeFileSync('./serviceAccountKey.json', process.env.SERVICE_ACCOUNT_JSON)}; require('child_process').spawn('node',['src/server.js'],{stdio:'inherit'})"
EXPOSE 8080
