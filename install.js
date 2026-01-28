module.exports = {
  requires: {
    bundle: "ai"
  },
  run: [
    {
      method: "shell.run",
      params: {
        message: [
          "git clone https://github.com/fishaudio/fish-speech app",
        ]
      }
    },
    {
      method: "shell.run",
      params: {
        message: [
          "conda update -y -c conda-forge huggingface_hub",
          "conda install -y -c conda-forge portaudio"
        ]
      }
    },
    {
      method: "script.start",
      params: {
        uri: "torch.js",
        params: {
          venv: "env",
          path: "app",
          // xformers: true
        }
      }
    },
    {
      method: "shell.run",
      params: {
        venv: "env",
        path: "app",
        message: [
          "uv pip install -e . --no-cache",
          "uv pip install cachetools livekit==0.18.1 livekit-agents==0.12.1"
        ]
      }
    },
    {
      method: "hf.download",
      params: {
        path: "app/tools",
        "_": [ "cocktailpeanut/oa" ],
        "local-dir": "checkpoints/openaudio-s1-mini"
      }
    }
  ]
}
