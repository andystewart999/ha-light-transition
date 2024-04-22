{
  "name": "node-red-contrib-ha-light-transition",
  "version": "0.2.6",
  "description": "Light transition node for Home Assistant",
  "keywords": [
    "node-red",
    "home-assistant",
    "ha",
    "transition",
    "light"
  ],
  "author": "Andy Stewart <andy.stewart@live.com>",
  "repository": {
    "type": "git",
    "url": "https://github.com/andystewart999/ha-light-transition"
  },
  "dependencies": {
    "node-red-contrib-home-assistant-websocket": ">=0.55.1"
  },
  "license": "Apache-2.0",
  "engines": {
    "node": ">=12.0.0"
  },
  "node-red": {
    "version": ">=2.0.0",
    "nodes": {
      "ha-light-transition": "index.js"
    }
  }
}
