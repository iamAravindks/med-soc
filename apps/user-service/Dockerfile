FROM 

# create & set working directory
RUN mkdir -p /home/node/med-soc
WORKDIR /home/node/med-soc

# copy global package.json files
COPY --chown=node package*.json ./

# create & copy dist and package.json file of user-service
RUN mkdir -p apps/user-service/dist
COPY --chown=node ./apps/user-service/package.json ./apps/user-service/
COPY --chown=node ./apps/user-service/dist ./apps/user-service/dist

# install dependencies
RUN npm install -w user-service --include-workspace-root --ignore-scripts --omit=dev 

ENV HOST=0.0.0.0 PORT=80

EXPOSE ${PORT}
CMD [ "npm", "run", "-w", "user-service", "start" ]
