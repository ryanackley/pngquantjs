module.exports = function(grunt) {

  grunt.initConfig({
    shell: {
      pngencoder:{
        command: './node_modules/ant/ant/bin/ant -buildfile lib/CanvasTool.PngEncoder'
      },
      libimagequant: {
        command: './build_pngquant'
      }
    },
    mkdir: {
      build:{
        options: {
          create: ['build']
        }
      }
    },
    concat: {
      dist: {
        src: ['build/*.js', 'pngquant.js'],
        dest: 'dist/pngquant.js'
      }
    },
    copy : {
      pngencoder: {
        files: [{expand: true, flatten: true,src: ['lib/CanvasTool.PngEncoder/bin/*.js'], dest: 'build/'}]
      }
    },
    clean: ['build']
  });

  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-mkdir');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-concat');

  grunt.registerTask('default', ['clean','mkdir:build', 'shell:pngencoder', 'shell:libimagequant', 'copy:pngencoder', 'concat:dist']);

};