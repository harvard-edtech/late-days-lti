FROM node:16.15-alpine3.14

# setting this here prevents dev dependencies from installing
ENV NODE_ENV production

# copy the app code into the /app path
COPY ./ /app
WORKDIR /app

# add git as a virtual package during the npm install
# this is necessary in case any npm deps reference git repos
RUN apk --update-cache add --virtual build-dependencies git \
  && npm install -g npm \
  && npm install --unsafe-perm \
  && npm run build \
  && apk del build-dependencies \
  && rm -rf /var/cache/apk/*

EXPOSE 8080
ENV PORT 8080
CMD ["npm", "start"]
