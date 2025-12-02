module.exports = {
  requires: {
    bundle: "ai",
  },
  daemon: true,
  run: [
    {
      method: "shell.run",
      params: {
        venv: "../env",
        env: { },
        path: "app/tools",
        message: [
          "python run_webui.py --device {{(platform === 'darwin' ? 'mps' : (gpu === 'nvidia' ? 'cuda' : 'cpu'))}}",
        ],
        on: [{
          "event": "/http:\/\/\\S+/",
          "done": true
        }, {
          "event": "/error:/i",
          "break": false
        }]
      }
    },
    {
      method: "local.set",
      params: {
        url: "{{input.event[0]}}"
      }
    }
  ]
}
