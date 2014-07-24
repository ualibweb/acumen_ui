module.exports = function(grunt){

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        env_path: '/dev',
        dist: {
            dir: 'dist',
            jsdir: 'dist/assets/js',
            cssdir: 'dist/assets/css',
            imgdir: 'dist/assets/images',
            xsldir: 'dist/assets/xsl',
            vendordir: 'dist/vendor'
        },
        clean: {
            release: ['dist']
        },
        src: {
            js: {
                app: ['src/app/**/*.js'],
                vendor: ['src/vendor/**/*.js']
            },
            css: {
                app: ['src/app/**/*.css'],
                vendor: ['src/vendor/**/*.css']
            },
            tpl: {
                app: ['src/app/**/*.tpl.html'],
                vendor: ['src/vendor/**/*.tpl.html']
            }
        },
        html2js: {
            app: {
                options:{
                    base: 'src/app',
                    process: true
                },
                src: '<%= src.tpl.app %>',
                dest: '<%= dist.jsdir %>/acumen-templates.js',
                module: 'templates.acumen'
            },
            vendor: {
                options:{
                    base: 'src/vendor'
                },
                src: '<%= src.tpl.vendor %>',
                dest: '<%= dist.jsdir %>/vendor-templates.js',
                module: 'templates.vendor'
            }
        },
        concat: {
            app_js: {
                src: '<%= src.js.app %>',
                dest: '<%= dist.jsdir %>/acumen.js',
                options: {
                    process: true
                }
            },
            app_css: {
                src: '<%= src.css.app %>',
                dest: '<%= dist.cssdir %>/acumen.css'
            },
            vendor_js: {
                src: '<%= src.js.vendor %>',
                dest: '<%= dist.jsdir %>/vendor.js'
            },
            vendor_css: {
                src: '<%= src.css.vendor %>',
                dest: '<%= dist.cssdir %>/vendor.css'
            },
            index:{
                src: '<%= src.index %>',
                dest: '<%= dist.dir %>/index.html',
                options: {
                    process: true
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-html2js');

    grunt.registerTask('default', ['html2js', 'concat']);
};