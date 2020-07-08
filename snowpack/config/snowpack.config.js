module.exports = {
  extends: '@snowpack/app-script-react',
  script: {
    "build:ts,tsx": "babel --filename $FILE",
  },
  plugins: []
}
