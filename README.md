# react-with-gulp
A react starter template to run with gulp

## Build steps:
1. Run 'npm install' in the root directory to install all npm packages
2. Run commands 'gulp bootstrap-css', 'gulp bootstrap-js' and 'gulp jquery' to compile packages into the dist folder. These commands will only need to be run once after 'npm install' or again if you update Bootstrap or Jquery in npm.
3. Run 'gulp'. This will bundle the components and minify the site css.
4. Run 'gulp watch' to watch for changes in the files.
5. Finally run 'gulp webserver' to serve the site to local host.

Changes should now be updated with gulp watch and then served to localhost:8000 with the webserver
