module.exports = function(grunt) { "use strict";

  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),
    uglify: {
      dist: {
        options: {
          banner: "/*!\t<%= pkg.name %>:<%= pkg.version %>\n *\t<%= pkg.description %>\n *\t<%= pkg.author %>\n*/\n",
          sourceMap: true
        },
        files: [{
          expand: true,
          cwd: "./",
          src: ["<%= pkg.main %>"],
          dest: "./",
          ext: ".min.js"
        }]
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask("default", ["uglify:dist"]);

};
