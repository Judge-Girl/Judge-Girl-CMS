FROM node
RUN npm install -g serve
COPY build/ /build
CMD serve -s build
