"use strict";

module.exports = function(grunt) {
  grunt.loadNpmTasks("grunt-bower-task");
  grunt.loadNpmTasks("grunt-contrib-connect");
  grunt.loadNpmTasks("grunt-contrib-copy");
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-exec");

  grunt.initConfig({
    copy: {
      jquery: {
        files: [
          {
            expand: true,
            cwd: "bower_components/jquery/dist/",
            src: "jquery.js",
            dest: "vendor/js/"
          }
        ]
      },
      bootstrap: {
        files: [
          {
            expand: true,
            cwd: "bower_components/bootstrap/dist/css/",
            src: "bootstrap.css",
            dest: "vendor/css/"
          },
          {
            expand: true,
            cwd: "bower_components/bootstrap/dist/js/",
            src: "bootstrap.js",
            dest: "vendor/js/"
          }
        ]
      },
      AdminLTE: {
        files: [
          {
            expand: true,
            cwd: "bower_components/AdminLTE/dist/css",
            src: [
              "AdminLTE.css",
              "skins/skin-purple-light.css",
              "skins/skin-blue.css"
            ],
            dest: "vendor/css"
          }
        ]
      },
      "font-awesome": {
        files: [
          {
            expand: true,
            cwd: "bower_components/font-awesome/css",
            src: "font-awesome.css",
            dest: "vendor/css"
          },
          {
            expand: true,
            cwd: "bower_components/font-awesome/fonts",
            src: "*",
            dest: "vendor/fonts"
          }
        ]
      }
    },
    exec: {
      jekyll: {
        cmd: "jekyll build --trace"
      }
    },
    watch: {
      options: {
        livereload: true
      },
      source: {
        files: [
          "_drafts/**/*",
          "_includes/**/*",
          "_layouts/**/*",
          "_posts/**/*",
          "css/**/*",
          "js/**/*",
          "_config.yml",
          "*.html",
          "*.md"
        ],
        tasks: ["exec:jekyll"]
      }
    },
    connect: {
      server: {
        options: {
          port: 4000,
          base: '_site',
          livereload: true
        }
      }
    }
  });
  grunt.registerTask("build", ["copy", "exec:jekyll"]);
  grunt.registerTask("serve", ["build", "connect:server", "watch"]);
  return grunt.registerTask("default", ["serve"]);
};
