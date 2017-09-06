module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        connect: {
            site: {
                options: {
                    hostname: 'localhost',
                    port: 9000,
                    keepalive: true
                }
            }
        }


    });

    // run a local server
    grunt.loadNpmTasks('grunt-contrib-connect');

    // Default task(s).
    grunt.registerTask('default', ['connect']);
};