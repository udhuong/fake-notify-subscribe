module.exports = function (grunt) {
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        log: {
            foo: [1, 2, 3],
            bar: 'hello world',
            baz: false
        },
        notify: {
            options: {
                enabled: true,
                max_jshint_notifications: 5, // maximum number of notifications from jshint output
                success: true, // whether successful grunt executions should be notified automatically
                duration: 3 // the duration of notification in seconds, for `notify-send only
            },
            css: {
                options: {
                    message: 'Css run done!'
                }
            }
        },
        jshint: {
            files: ['Gruntfile.js', 'src/**/*.js'],
            options: {
                // options here to override JSHint defaults
                globals: {
                    jQuery: true,
                    console: true,
                    module: true,
                    document: true
                }
            }
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
                    '<%= grunt.template.today("yyyy-mm-dd") %> */'
            },
            my_target: {
                files: [{
                    expand: true,
                    cwd: 'src',
                    src: '**/*.js',
                    dest: 'dist/js',
                    ext: '.min.js'
                }]
            }
        },
        watch: {
            css: {
                files: 'src/*.scss',
                tasks: ['sass', 'cssmin']
            },
            scripts: {
                files: ['src/*.js'],
                tasks: ['uglify'],
            },
        },
        sass: {
            dist: {
                options: {
                    style: 'expanded', //expanded => không làm min | compressed làm min
                },
                files: [
                    {
                        expand: true,
                        cwd: 'src',
                        src: ['*.scss'],
                        dest: 'dist/css',
                        ext: '.css'
                    }
                ]
            }
        },
        cssmin: {
            target: {
                files: [{
                    expand: true,
                    cwd: 'dist',
                    src: ['*.css', '!*.min.css'],
                    dest: 'dist/css',
                    ext: '.min.css'
                }]
            }
        },
        imagemin: {
            dynamic: {
                files: [{
                    expand: true,
                    cwd: 'images/',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: 'dist/images'
                }]
            }
        }
    });

    // Load the plugin
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-notify');
    grunt.loadNpmTasks('grunt-contrib-imagemin');

    // Task(s).
    grunt.registerTask('css', ['sass', 'cssmin', 'notify:css']);
    grunt.registerTask('js', ['jshint','uglify']);
    grunt.registerTask('image', ['imagemin']);
    grunt.registerTask('default', ['watch']);

    grunt.registerTask('dev', 'Run for dev', function () {
        var done = this.async();
        grunt.log.writeln('Processing task...');
        grunt.task.run(['sass', 'cssmin', 'notify:css']);
        done();
        grunt.log.writeln('Done task...');
    });

    grunt.registerTask('dev', 'Run for dev', function (arg1, arg2) {
        grunt.log.writeln('Processing task...');
        if (arguments.length > 0) {
            grunt.log.writeln('Log: ' + arg1 + ' - ' + arg2);
        } else {
            grunt.log.error('Has error!');
        }
        grunt.log.writeln('Done task...');
    });

    grunt.registerMultiTask('log', 'Log stuff.', function() {
        grunt.log.writeln(this.target + ': ' + this.data);
    });
};
