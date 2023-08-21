
# syntax=docker/dockerfile:1.4
ARG NODE_VERSION=18.14.2
FROM node:${NODE_VERSION}-alpine as development

ENV CI=true
ENV PORT=3000

WORKDIR /usr/src/app
RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci
    
COPY . .

CMD [ "npm", "start" ]

FROM development AS builder
RUN npm run build

FROM development as dev-envs
RUN <<EOF
apk add git
useradd -s /bin/bash -m vscode
groupadd docker
usermod -aG docker vscode
EOF
# install Docker tools (cli, buildx, compose)
COPY --from=gloursdocker/docker / /
CMD [ "npm", "start" ]
