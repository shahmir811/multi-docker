# BUILD PHASE
# "as" is used for tagging.
# before next FROM, all code belongs to builder phase
FROM node:alpine
WORKDIR '/app'
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# RUN PHASE
FROM nginx
EXPOSE 3000
# Copy NGINX configration file
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
# --from mean "from some phase". In our case, its builder
COPY --from=0 /app/build /usr/share/nginx/html