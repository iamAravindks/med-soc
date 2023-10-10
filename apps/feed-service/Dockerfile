FROM 

# create & set working directory
RUN mkdir -p /home/node/med-soc
WORKDIR /home/node/med-soc

# copy global package.json files
COPY --chown=node package*.json ./

# create & copy dist and package.json file of feed-service
RUN mkdir -p apps/feed-service/dist
COPY --chown=node ./apps/feed-service/package.json ./apps/feed-service/
COPY --chown=node ./apps/feed-service/dist ./apps/feed-service/dist

# install dependencies
RUN npm install -w feed-service --include-workspace-root --ignore-scripts --omit=dev 

ENV HOST=0.0.0.0 PORT=80

EXPOSE ${PORT}
CMD [ "npm", "run", "-w", "feed-service", "start" ]
