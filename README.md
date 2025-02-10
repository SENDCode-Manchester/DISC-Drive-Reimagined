## Running the project
If you're using Docker, see [Running the project with Docker](#with-docker) for instructions. Otherwise, make sure you have Node.js installed on your system, open a terminal and run:

```sh
# Install dependencies
npm install

# Build and start the server
npm run start
```

> [!IMPORTANT]
> Before you start the server, if you haven't already, you should copy the `.env.example` file to `.env` and fill out the values with your own.

### with Docker
Make sure Docker is running on your system, open a terminal and run:

```sh
# Build the image
docker build -t inversity-hackathon .

# Start the container
docker run -e GEMINI_API_KEY=YOUR_API_KEY -p 3000:3000 -p 5174:5174 -d inversity-hackathon
```
