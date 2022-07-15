FROM node:16-alpine3.15 as build
RUN mkdir -p /schala /schala/core /schala/schala-gui
RUN npm i --location=global @quasar/cli

WORKDIR /schala/core
COPY core/ .
RUN yarn

WORKDIR /schala/schala-gui
COPY schala-gui/ .
RUN yarn

RUN quasar build

FROM nginx:1.17.5-alpine as production
COPY --from=build /schala/schala-gui/dist/spa /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]