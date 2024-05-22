FROM node:19

WORKDIR /app

# Copy app files
COPY . .

RUN npm install
# Expose port
EXPOSE 3000
# Start the app
CMD [ "npm", "start" ]
